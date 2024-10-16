'use client'

export default function ErrorPage() {
    const handleRequestAuthorization = () => {
      alert("Request for authorization sent!");
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">
            Your email is not authorized to access The Marcy Lab School Referral Program. If you believe this is a mistake, you can request authorization.
          </p>
          <button
            onClick={handleRequestAuthorization}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            Request Authorization
          </button>
          <p className="text-sm text-gray-500 mt-4">
            If you continue having trouble, please contact support.
          </p>
        </div>
      </div>
    );
  }