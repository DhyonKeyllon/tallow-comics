# TallowComic - Teste SM

## Sobre o projeto

Você pode pesquisar por gibis na loja TallowComic

### Recursos usados

* [Typescript](https://www.typescriptlang.org/)
* [React.js](https://pt-br.reactjs.org/)
* [Next.js](https://nextjs.org/)
* [Node.js](https://nodejs.org/en/)
* [JSON](https://www.json.org/json-en.html)
* [SASS/SCSS](https://sass-lang.com/documentation/syntax)
* [Prisma](https://www.prisma.io/)
* [Docker](https://www.docker.com/)

## Iniciando o Projeto

### Pré-requisitos

Docker Desktop
* [Docker](https://www.docker.com/)

docker-compose v2 (Vem por padrão com o Docker atualmente)
* [docker-compose](https://docs.docker.com/compose/cli-command/)

Node.js v16.4.12 ou acima
* [Node.js](https://nodejs.org/)

### Instalação

1. Execute ```docker pull mysql:5.7.31``` e aguarde a instalação da Image Container com o docker.
  ```sh
    docker pull mysql:5.7.31
  ```

2. Após a instalação mate o terminal e execute ```docker-compose up -d``` para o banco de dados da aplicação rodar em segundo plano.
  ```sh
    docker-compose up -d
  ```

3. Execute ```sudo yarn migrate``` para criar um migrate, com o prisma, no banco de dados.
  ```sh
    sudo yarn migrate
  ```

4. Execute ```yarn dev``` e acesse no seu browser http://localhost:3000 para visualizar a aplicação.
  ```sh
    yarn dev
  ```
