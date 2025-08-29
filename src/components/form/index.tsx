type props = {
  name: string
  label: string
  type: string
  required?: boolean
  setContent: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormComponent = ({
  name,
  label,
  type,
  required,
  setContent,
}: props) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-normal text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          onChange={setContent}
          id={name}
          name={name}
          type={type}
          required={required}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
        />
      </div>
    </div>
  )
}
