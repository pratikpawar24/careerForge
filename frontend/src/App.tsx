import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VerifyEmailPage } from "./features/auth/pages/VerifyEmailPage";
import { LandingPage } from "./features/landing/LandingPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";

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
          element={<LoginPage />}
        />

        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/resumes"
            element={<div>Resumes</div>}
          />

          <Route
            path="/applications"
            element={<div>Applications</div>}
          />

          <Route
            path="/profile"
            element={<div>Profile</div>}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;