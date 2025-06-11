import { http } from "../../../../common/singletons/http";
import { SessionDataRepository } from "../../domain/repositories/SessionRepository";
import { CreateCheckoutSessionUseCase } from "../../domain/usecases/CreateCheckoutSessionUseCase";

// Instancia única del manager HTTP

// Instancia única del caso de uso
export const createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
  new SessionDataRepository(http)
);
