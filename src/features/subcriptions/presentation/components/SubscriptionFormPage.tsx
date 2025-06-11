import { useState } from "react";
import {
  createCheckoutSessionUseCase,
  getSubcriptionStatusUseCase,
  getUserByEmailUseCase,
} from "../di/container";
import {
  useSubscriptionForm,
  type SubscriptionFormData,
} from "../hooks/useSubscriptionForm";

const SubscriptionFormPage = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: SubscriptionFormData) => {
    setLoading(true);
    try {
      let userResult = null;
      try {
        userResult = await getUserByEmailUseCase.execute(data.email);
      } catch (error: any) {
        if (error.statusCode === 404) {
          userResult = null;
        } else {
          alert("Error al consultar el usuario: " + error);
          setLoading(false);
          return;
        }
      }

      if (userResult && userResult.customerId) {
        const statusResult = await getSubcriptionStatusUseCase.execute(
          userResult.customerId
        );
        if (statusResult && statusResult.status === "active") {
          localStorage.setItem("customerId", userResult.customerId);
          window.location.href = "/dashboard";
          return;
        }
      }

      const result = await createCheckoutSessionUseCase.execute({
        ...data,
        priceId: "price_1RYJ7c2QypCxhenCgpYTvnag",
        successUrl: window.location.origin + "/dashboard",
        cancelUrl: window.location.origin + "/",
      });

      localStorage.setItem("customerId", result.customerId);
      window.location.href = result.url;
    } catch (error) {
      alert("Error en la petición: " + error);
    } finally {
      setLoading(false);
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Procesando...
              </>
            ) : (
              "Suscribirse por $50.00"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionFormPage;
