export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to RMS
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Tailwind CSS v4 is working! 🎉
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
            Get Started
          </button>
          
          <div className="flex gap-3">
            <div className="flex-1 bg-green-100 text-green-800 p-4 rounded-lg text-center font-medium">
              Formik ✓
            </div>
            <div className="flex-1 bg-blue-100 text-blue-800 p-4 rounded-lg text-center font-medium">
              Yup ✓
            </div>
            <div className="flex-1 bg-purple-100 text-purple-800 p-4 rounded-lg text-center font-medium">
              Icons ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}