import { Route, Routes } from "react-router-dom";

import AssistantPage from "@/pages/assistant";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/signup";

function App() {
  return (
    <Routes>
      <Route element={<AssistantPage />} path="/assistant" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignUpPage />} path="/sign-up" />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
