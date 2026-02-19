function Login() {
  const login = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 via-white to-sky-100">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-extrabold text-sky-700 mb-4">Smart Bookmark</h1>
        <p className="text-sm text-slate-600 mb-6">Save and access your favourite links — fast.</p>

        <button
          onClick={login}
          className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-[1.01] transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.9 0 7.4 1.4 10.1 3.7l7.6-7.6C36.1 1.6 30.4 0 24 0 14.8 0 6.9 4.9 2.9 12.1l8.9 6.9C13.6 13 18.4 9.5 24 9.5z"/>
          </svg>
          Login with Google
        </button>

        <p className="mt-4 text-xs text-slate-500">By continuing you agree to our terms.</p>
      </div>
    </div>
  );
}

export default Login;