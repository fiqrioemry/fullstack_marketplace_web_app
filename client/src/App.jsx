import { Route, Routes } from "react-router-dom";
import SignUpCustomer from "./pages/SignUpCustomer";
import SignUpSeller from "./pages/SignUpSeller";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUpCustomer />} />
        <Route path="/signup" element={<SignUpSeller />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpCustomer />}>
          <Route path="/signup" element={<SignUpSeller />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
