import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/landing/LandingPage";
import { PublicLayout } from "./layouts/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route
          path="/login"
          element={<div>Login</div>}
        />

        <Route
          path="/register"
          element={<div>Register</div>}
        />

        <Route
          path="/dashboard"
          element={<div>Dashboard</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;