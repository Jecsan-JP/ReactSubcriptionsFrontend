import { useEffect, useState } from "react";
import { getSubcriptionStatusUseCase } from "../di/container";
import type { GetSubscriptionStatusDto } from "../../domain/models/GetSubscriptionStatusDto";

export function useSubscriptionDashboard() {
  const [subscription, setSubscription] = useState<GetSubscriptionStatusDto>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) {
        window.location.href = "/";
        return;
      }
      const result = await getSubcriptionStatusUseCase.execute(customerId);
      setSubscription(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    window.location.href = "/";
  };

  return { subscription, loading, handleLogout };
} 