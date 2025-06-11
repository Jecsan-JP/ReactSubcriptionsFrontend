// src/features/subcriptions/presentation/hooks/useSubscriptionSubmit.ts
import { useState } from "react";
import {
  createCheckoutSessionUseCase,
  getSubcriptionStatusUseCase,
  getUserByEmailUseCase,
} from "../di/container";
import { type SubscriptionFormData } from "./useSubscriptionForm";

export const useSubscriptionSubmit = () => {
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

  return { onSubmit, loading };
};
