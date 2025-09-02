import * as S from './style'

type props = {
  children?: React.ReactNode
}

export const CardForm = ({ children }: props) => {
  return <S.CardForm>{children}</S.CardForm>
}
