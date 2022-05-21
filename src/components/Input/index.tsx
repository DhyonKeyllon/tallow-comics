import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import styles from "./styles.module.scss";

type InputProps = {
  type: string,
  label?: string,
  placeholder?: string,
  icon?: React.ReactNode,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputComponent({ label, type, placeholder, icon, value, onChange, ...props }: InputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  const debounceChange = useDebounce(onChange, 3000);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayValue(event.target.value);
    debounceChange(event)
  }

  return (
    <div className={styles.inputContainer}>
      {label && <label>{label}</label>}
      <div>
        <input value={displayValue} type={type} placeholder={placeholder} onChange={handleChange} {...props} />
        {icon && <div>{icon}</div>}
      </div>
    </div>
  );
}

InputComponent.defaultProps = {
  label: "",
  placeholder: "",
  icon: "",
};
