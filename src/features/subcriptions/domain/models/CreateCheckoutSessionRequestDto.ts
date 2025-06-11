export interface CreateCheckoutSessionRequestDto {
  name: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}
