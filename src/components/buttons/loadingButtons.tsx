type status = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  text: string
}

export const ButtonLoading = ({ status, text }: status) => {
  return (
    <button
      disabled={status === 'loading'}
      type="submit"
      className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-medium text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      {status === 'loading' && (
        <svg
          className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {status === 'loading' ? 'Processando...' : text}
    </button>
  )
}
