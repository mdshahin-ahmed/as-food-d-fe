import { Route, Routes } from "react-router-dom";
import SignIn from "../../pages/unauthenticated/SignIn";

function UnAuthenticatedApp() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

export default UnAuthenticatedApp;
