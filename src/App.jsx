import React from "react";
import { Loader } from "semantic-ui-react";
import "./App.css";
import { useAuth } from "./context/app/useAuth";

const AuthenticatedApp = React.lazy(() =>
  import("./navigation/public/authenticated-app")
);
const UnAuthenticatedApp = React.lazy(() =>
  import("./navigation/public/unauthenticated-app")
);

function App() {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<Loader>Loading...</Loader>}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
