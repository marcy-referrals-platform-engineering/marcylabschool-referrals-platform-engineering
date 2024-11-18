export function ReferralPending({
    isLoading,
    isSuccess,
    onRetry,
  }: {
    isLoading: boolean;
    isSuccess: boolean | null;
    onRetry: () => void;
  }) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-200px)] bg-slate-50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
            <p className="mt-4 text-2xl text-blue-500">Submitting...</p>
          </div>
        ) : (
          isSuccess !== null && (
            <div className="flex flex-col items-center justify-center">
              <p
                className={`text-2xl ${
                  isSuccess ? "text-green-500" : "text-red-600"
                } flex items-center`}
              >
                {isSuccess ? (
                  <span className="mr-2 text-[2rem]">Referral Submitted ✓</span>
                ) : (
                  <span className="mr-2 text-[2rem]">Submission Failed ✗</span>
                )}
              </p>
              <button
                onClick={onRetry}
                className={`mt-10 px-4 py-2 border rounded ${
                  isSuccess ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {isSuccess ? "Submit Another Referral" : "Try Again"}
              </button>
            </div>
          )
        )}
      </div>
    );
  }