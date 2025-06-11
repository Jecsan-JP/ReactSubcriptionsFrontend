import { useSubscriptionDashboard } from "../hooks/useSubscriptionDashboard";

const getStatusClass = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600 font-bold";
    case "no_subscription":
      return "text-red-600 font-bold";
    case "trialing":
      return "text-yellow-600 font-bold";
    default:
      return "text-gray-600 font-bold";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Activo";
    case "no_subscription":
      return "No suscrito";
    case "trialing":
      return "En prueba";
    default:
      return "Desconocido";
  }
};

const DashboardPage = () => {
  const { subscription, loading, handleLogout } = useSubscriptionDashboard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Cargando datos de la suscripción...</div>
      </div>
    );
  }

  if (!subscription) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <span className="font-bold text-xl">Mi Suscripción</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{subscription.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Tarjeta de suscripción */}
      <div className="flex justify-center items-center mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Detalles de la suscripción
          </h2>
          <div className="mb-2">
            <span className="font-semibold">Nombre:</span> {subscription.name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Correo:</span> {subscription.email}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Estado:</span>{" "}
            <span className={getStatusClass(subscription.status)}>
              {getStatusText(subscription.status)}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Vigencia hasta:</span>{" "}
            {new Date(
              (subscription.currentPeriodEnd ?? 0) * 1000
            ).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
