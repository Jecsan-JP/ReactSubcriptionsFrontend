import type { HttpManager } from "../../../../common/http/HttpManager";
import type { CreateCheckoutSessionRequestDto } from "../models/CreateCheckoutSessionRequestDto";
import type { CreateCheckoutSessionResultDto } from "../models/CreateCheckoutSessionResultDto";
import type { GetSubscriptionStatusDto } from "../models/GetSubscriptionStatusDto";
import type { GetUserByEmailResultDto } from "../models/GetUserByEmailResultDto";

export interface SessionRepository {
  createCheckoutSession(
    request: CreateCheckoutSessionRequestDto
  ): Promise<CreateCheckoutSessionResultDto>;
  getUserByEmail(email: string): Promise<GetUserByEmailResultDto>;
  getSubcriptionStatusByCustomerId(
    customerId: string
  ): Promise<GetSubscriptionStatusDto>;
}

export class SessionDataRepository implements SessionRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }
  getSubcriptionStatusByCustomerId(
    customerId: string
  ): Promise<GetSubscriptionStatusDto> {
    return this.http.get({
      endpoint: `/subscriptions/status/${customerId}`,
    });
  }
  getUserByEmail(email: string): Promise<GetUserByEmailResultDto> {
    return this.http.get({
      endpoint: `/subscriptions/user/${email}`,
    });
  }

  createCheckoutSession(
    request: CreateCheckoutSessionRequestDto
  ): Promise<CreateCheckoutSessionResultDto> {
    return this.http.post({
      endpoint: "/subscriptions/checkout-session",
      body: {
        name: request.name,
        email: request.email,
        priceId: request.priceId,
        successUrl: request.successUrl,
        cancelUrl: request.cancelUrl,
      } as CreateCheckoutSessionRequestDto,
    });
  }
}
