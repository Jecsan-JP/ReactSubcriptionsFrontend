import type { HttpManager } from "../../../../common/http/HttpManager";
import type { CreateCheckoutSessionRequestDto } from "../models/CreateCheckoutSessionRequestDto";
import type { CreateCheckoutSessionResultDto } from "../models/CreateCheckoutSessionResultDto";

export interface SessionRepository {
  createCheckoutSession(
    request: CreateCheckoutSessionRequestDto
  ): Promise<CreateCheckoutSessionResultDto>;
}

export class SessionDataRepository implements SessionRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
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
