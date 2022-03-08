import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 aboutContainer">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Created by Abdulrahman Sadek
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px"></div>

          <div>
            <Link to={"/"}>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-error hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back Homepage
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default About;
