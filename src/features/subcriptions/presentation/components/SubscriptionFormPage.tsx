import { createCheckoutSessionUseCase } from "../di/container";
import {
  useSubscriptionForm,
  type SubscriptionFormData,
} from "../hooks/useSubscriptionForm";

const SubscriptionFormPage = () => {
  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const result = await createCheckoutSessionUseCase.execute({
        ...data,
        priceId: "price_1RYJ7c2QypCxhenCgpYTvnag", // tu priceId real
        successUrl: window.location.origin + "/dashboard",
        cancelUrl: window.location.origin + "/",
      });

      // Guarda el customerId en localStorage para proteger rutas después
      localStorage.setItem("customerId", result.customerId);

      // Redirige a Stripe Checkout
      window.location.href = result.url;
    } catch (error) {
      // Aquí puedes mostrar un mensaje de error al usuario
      console.error("Error al crear la sesión de Stripe:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSubscriptionForm(onSubmit);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Suscríbete</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Suscribirse por $50.00
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionFormPage;
