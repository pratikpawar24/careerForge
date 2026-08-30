import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VerifyEmailPage } from "./features/auth/pages/VerifyEmailPage";
import { LandingPage } from "./features/landing/LandingPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { RegisterPage } from "./features/auth/pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />

        <Route
          path="/login"
          element={<div>Login</div>}
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