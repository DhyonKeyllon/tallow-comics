import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import { MdMoneyOff } from "react-icons/md";

import cardPicture from "../../public/images/comic.webp";
import { CardComponent } from "../components/Card";
import { InputComponent } from "../components/Input";
import useComics from "../hooks/useComics";
import { createComic } from "../services/api";
import { prismaClient } from "../services/database/prismaClient";
import styles from "./home.module.scss";

export default function Home({ yearsList }: { yearsList: number[] }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("asc");
  const [year, setYear] = useState("");
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [inputComicId, setInputComicId] = useState("");
  const { count, comics, fetchComics } = useComics(1, search, category, order, year);

  useEffect(() => {
    loadComics();
  }, [page]);

  useEffect(() => {
    setPage(1);
    loadComics();
  }, [search]);

  useEffect(() => {
    setPage(1);
    setSelected(false);
    setYear("");
    loadComics();
  }, [category]);

  useEffect(() => {
    setPage(1);
    loadComics();
  }, [selected]);

  useEffect(() => {
    setPage(1);
    loadComics();
  }, [order]);

  useEffect(() => {
    setPage(1);
    setSelected(false);
    setCategory("");
    loadComics();
  }, [year]);

  async function loadComics() {
    selected ? setOrder("desc") : setOrder("asc");
    setLoading(true);
    await fetchComics(page);
    setLoading(false);
  }

  function handleChangePage(event: React.ChangeEvent<unknown>, value: number)  {
    event.preventDefault();
    setPage(value);
  };

  function inputChangeEvent(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    event.preventDefault();
    setDiscount(parseInt(event.target.value));
  }

  async function handleApplyDiscount(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    event.preventDefault();
    if (discount <= 0) {
      return;
    }
    const data = await fetch(`http://localhost:3000/api/comics/discount?comicId=${id}&discount=${discount}`).then(res => res.json());
    if (data.success) {
      setOpen(false);
      setInputComicId("");
      setDiscount(0);
      loadComics();
    } else
    if (data.error) {
      alert(data.error);
    }
  }

  return (
    <Stack spacing={2} alignContent={'space-between'} className={styles.stackContainer}>
        <form className={styles.formContainer} onSubmit={() => fetchComics(page)}>
          <div className={styles.homePageContainer}>
            <div className={styles.searchArea}>
              <InputComponent
                name={"search"}
                type={"search"}
                onChange={event => setSearch(event.target.value)}
                placeholder={"Pesquisar"}
                value={search}
              />
              <Select className={styles.selectContainer} labelId="category" value={category} displayEmpty onChange={event => setCategory(event.target.value)} >
                <MenuItem value=""><span>Categoria</span></MenuItem>
                <MenuItem value="mauricio">Mauricio</MenuItem>
                <MenuItem value="marvel">Marvel</MenuItem>
                <MenuItem value="dc">DC</MenuItem>
              </Select>
              <Select className={styles.selectContainer} labelId="year" value={year} displayEmpty onChange={event => setYear(event.target.value)} >
                <MenuItem value=""><span>Ano</span></MenuItem>
                {yearsList.map((year, index) => (
                  <MenuItem key={index} value={year}>{year}</MenuItem>
                ))}
              </Select>
              <ToggleButton className={styles.toggleButtonContainer}
                value="check"
                selected={selected}
                onChange={() => {
                  setSelected(!selected);
                }}
              >
                {selected ? <ImSortAlphaDesc /> : <ImSortAlphaAsc /> }
              </ToggleButton>
            </div>
            <div className={styles.content}>
            {loading ?
              (
                <AiOutlineLoading className={styles.loadingIcon} />
              ) : (
              comics.length > 0 ? (
                <>
                  {comics.map((comic) => (
                    <div className={styles.cardContainer} key={comic.id}>
                      <CardComponent
                        name={comic.name}
                        description={comic.description ? comic.description : "Sem descrição"}
                        formatedPrice={Number(comic.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        image={cardPicture}
                        year={comic.year}
                        edition={comic.edition}
                      />
                      <Button className={styles.buttonContainer} onClick={ () => {
                          setOpen(true)
                          setInputComicId(comic.id)
                      }}><h6>Desconto</h6> <MdMoneyOff /></Button>
                    </div>
                  ))}
                  <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Aplicar desconto</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Aplique o desconto em subtração de porcentagem:
                      </DialogContentText>
                      <InputLabel htmlFor={`outlined-adornment-amount`}>Desconto</InputLabel>
                      <OutlinedInput
                        id={`outlined-adornment-amount`}
                        value={discount}
                        onChange={(event) => inputChangeEvent(event)}
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                        label="Desconto"
                        type="number"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)}>Cancelar</Button>
                      <Button onClick={(event) => handleApplyDiscount(event, inputComicId)} type={"submit"}>Aplicar Desconto</Button>
                    </DialogActions>
                  </Dialog>
                </>
                ) : (
                <h4>
                  Nenhum resultado encontrado
                </h4>
              ))}
            </div>
          </div>
        </form>
        {loading ? "" : (
          (comics.length > 0) ? <Pagination className={styles.pagination} count={count} page={page} onChange={handleChangePage} /> : ''
        )}
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  await prismaClient.comic.count() ? "" : createComic();

  const years = await prismaClient.comic.findMany({
    select: {
      year: true,
    },
    orderBy: {
      year: "asc",
    },
  });

  const yearsList = years.map(year => year.year);

  return {
    props: {
      yearsList
    },
  };
}
