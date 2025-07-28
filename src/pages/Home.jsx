function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">¡Bienvenido al Home! 🏠</h1>
        <p className="text-gray-600 text-lg">
          Has iniciado sesión correctamente. Desde aquí puedes navegar al resto del sitio.
        </p>

        <div className="mt-6">
          <button
            onClick={() => alert('Aquí podrías poner navegación o cerrar sesión')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300"
          >
            Explorar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
