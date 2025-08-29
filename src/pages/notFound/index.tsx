function NotFound() {
  return (
    <div className="flex h-dvh flex-col justify-center px-6 py-12 text-center lg:px-8">
      <h1 className="block pb-10 text-8xl/9 font-semibold text-gray-400">
        404
      </h1>
      <h2 className="block text-center text-2xl/9 font-normal text-gray-400">
        Página não econtrada, verifique a url e tente novamente.
      </h2>
    </div>
  )
}

export default NotFound
