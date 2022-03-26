import styles from "./styles.module.scss";

type InputProps = {
  type: string,
  label?: string,
  placeholder?: string,
  icon?: React.ReactNode,
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputComponent({ label, type, placeholder, icon, ...props }: InputProps) {
  return (
    <div className={styles.inputContainer}>
      {label && <label>{label}</label>}
      <div>
        <input type={type} placeholder={placeholder} {...props} />
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
