import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import AuthProtectedRoutes from "./guards/Auth.ProtectedRoutes";
import Settings from "./pages/dashboard/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            {/* Protected Routes for logged in users */}
            <Route element={<AuthProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
