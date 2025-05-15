import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AsToast from "../../components/common/AsToast";
import ErrorPage from "../../components/common/ErrorPage";
import { removeDoubleQuotes } from "../../utils/helper";
import { AuthProvider } from "./auth-context";
import { AiOutlineCheckCircle } from "react-icons/ai";

const mutationCache = new MutationCache({
  onError(error, variables, context, mutation) {
    if (mutation.options.fromAuth) {
      return AsToast.error(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>{removeDoubleQuotes(error.message)}</span>
        </div>
      );
    }
    AsToast.error(
      <div className="errorToast">
        <AiOutlineCheckCircle /> &nbsp;
        <span>{removeDoubleQuotes(error.message)}</span>
      </div>
    );
  },
});

const queryCache = new QueryCache({
  onError(error) {
    AsToast.error(
      <div className="errorToast">
        <AiOutlineCheckCircle /> &nbsp;
        <span>{removeDoubleQuotes(error.message)}</span>
      </div>
    );
  },
});

const queryClient = new QueryClient({
  mutationCache,
  queryCache,
  defaultOptions: {
    queries: {
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.statusCode === 404) return false;
        if (failureCount < 2) return true;
        return false;
      },
    },
    // mutations: {
    //   onError: (error) => {
    //     AsToast.error(
    //       <div className="errorToast">
    //         <AiOutlineCheckCircle /> &nbsp;
    //         <span>{removeDoubleQuotes(error.message)}</span>
    //       </div>
    //     );
    //   },
    //   onSuccess: (data) => {
    //     console.log("Mutation successful", data);
    //   },
    // },
  },
});

// const queryClient = new QueryClient();

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <ErrorPage
                heading="500 -  Internal server error"
                subheader="Opps, something went wrong! The server encountered an internal error and was not able to complete request"
                onClick={resetErrorBoundary}
              />
            )}
          >
            <BrowserRouter>
              <AuthProvider>
                {children}
                <ToastContainer
                  position="bottom-left"
                  autoClose={2000}
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                />
              </AuthProvider>
            </BrowserRouter>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
export { AppProviders };
