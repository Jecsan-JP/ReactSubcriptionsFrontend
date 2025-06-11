import { useForm } from "react-hook-form";

export type SubscriptionFormData = {
  name: string;
  email: string;
};

export function useSubscriptionForm(onSubmit: (data: SubscriptionFormData) => void) {
  const form = useForm<SubscriptionFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onTouched",
  });

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
} 