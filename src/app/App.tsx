import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubscriptionFormPage from "../features/subcriptions/presentation/components/SubscriptionFormPage";
import PrivateRoute from "../common/presentation/components/PrivateRoute";
import DashboardPage from "../features/subcriptions/presentation/pages/DashboardPage";
import PublicRoute from "../common/presentation/components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <SubscriptionFormPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        {/* Otras rutas como /success, /cancel */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
