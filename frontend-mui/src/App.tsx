import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AuthProtectedRoutes from "./guards/Auth.ProtectedRoutes";
import { DiscordServerProvider } from "./context/DiscordServerContext";

// pages
import Home from "./pages/home/Home";
import DashboardServers from "./pages/dashboard/DashboardServers";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import Panels from "./pages/dashboard/panels/Panels";
import CreatePanel from "./pages/dashboard/panels/CreatePanel";
import MultiPanel from "./pages/dashboard/panels/MultiPanel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            {/* Protected Routes for logged in users */}
            <Route
              element={
                <DiscordServerProvider>
                  <AuthProtectedRoutes />
                </DiscordServerProvider>
              }
            >
              <Route path="/dashboard" element={<DashboardServers />} />

              {/* Use server provider when id only exists */}

              <Route path="/dashboard/:id" element={<Dashboard />}>
                <Route index element={<Settings />} />
                <Route path="panel">
                  <Route index element={<Panels />} />
                  <Route path="create" element={<CreatePanel />} />
                  <Route path="multi-create" element={<MultiPanel />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
