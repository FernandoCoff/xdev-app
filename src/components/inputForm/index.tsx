import * as S from './style'

type props = {
  name: string
  label: string
  type: string
  required?: boolean
  setContent: (e: React.ChangeEvent<HTMLInputElement>) => void
  $status: string
  error?: string
}

export const InputForm = ({
  name,
  label,
  type,
  required,
  setContent,
  $status,
  error,
}: props) => {
  return (
    <S.InputForm $status={$status}>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={setContent}
        id={name}
        name={name}
        type={type}
        placeholder={label}
        required={required}
      />
      <i className="fa-solid fa-circle-check"></i>
      <i className="fa-solid fa-circle-exclamation"></i>
      <small>{error}</small>
    </S.InputForm>
  )
}
