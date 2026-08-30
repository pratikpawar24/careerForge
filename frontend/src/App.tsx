import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<div>CareerForge</div>}
        />

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