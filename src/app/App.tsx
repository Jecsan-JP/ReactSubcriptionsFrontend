import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubscriptionFormPage from "../features/subcriptions/presentation/components/SubscriptionFormPage";
import PrivateRoute from "../common/presentation/components/PrivateRoute";
import DashboardPage from "../features/subcriptions/presentation/pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionFormPage />} />
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
