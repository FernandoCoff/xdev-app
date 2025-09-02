import * as S from './style'

type status = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  text: string
}

export const FormButton = ({ status, text }: status) => {
  return (
    <S.Button disabled={status === 'loading'} type="submit">
      {status === 'loading' ? 'Processando' : text}
    </S.Button>
  )
}
