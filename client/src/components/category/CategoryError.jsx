import { AlertCircle, RefreshCw } from "lucide-react";

// eslint-disable-next-line react/prop-types
const CategoryError = ({ message, onRetry }) => {
  return (
    <section className="min-h-svh">
      <div className="section-margin">
        {" "}
        <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
          <h2 className="text-xl font-semibold text-red-700">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 text-sm text-center max-w-md mt-2">
            {message ||
              "An unexpected error occurred while fetching data. Please try again."}
          </p>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Retry
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryError;
