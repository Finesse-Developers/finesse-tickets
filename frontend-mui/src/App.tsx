import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthProtectedRoutes from "./guards/Auth.ProtectedRoutes";

// pages
import Home from "./pages/home/Home";
import DashboardServers from "./pages/dashboard/DashboardServers";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import { DiscordServerProvider } from "./context/DiscordServerContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            {/* Protected Routes for logged in users */}
            <Route element={<AuthProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardServers />} />

              {/* Use server provider when id only exists */}

              <Route
                path="/dashboard/:id"
                element={
                  <DiscordServerProvider>
                    <Dashboard />
                  </DiscordServerProvider>
                }
              >
                <Route index element={<Settings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
