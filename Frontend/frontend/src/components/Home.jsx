import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Blog App
      </h1>

      <p className="text-gray-700 text-lg text-center max-w-2xl mb-6">
        This is a simple blog application where users can register,
        login, create articles, read blogs, and share their thoughts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl">
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-500">
            Create Blogs
          </h2>
          <p className="text-gray-600">
            Write and publish articles easily using our platform.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-green-500">
            Read Articles
          </h2>
          <p className="text-gray-600">
            Explore blogs from different categories and authors.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-purple-500">
            User Authentication
          </h2>
          <p className="text-gray-600">
            Secure login and registration functionality for users.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;
