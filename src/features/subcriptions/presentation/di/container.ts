import { http } from "../../../../common/singletons/http";
import { SessionDataRepository } from "../../domain/repositories/SessionRepository";
import { CreateCheckoutSessionUseCase } from "../../domain/usecases/CreateCheckoutSessionUseCase";
import { GetSubcriptionStatusUseCase } from "../../domain/usecases/GetSubcriptionStatusUseCase";
import { GetUserByEmailUseCase } from "../../domain/usecases/GetUserByEmailUseCase";

// Instancia única del manager HTTP

// Instancia única del caso de uso
export const createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
  new SessionDataRepository(http)
);

export const getUserByEmailUseCase = new GetUserByEmailUseCase(
  new SessionDataRepository(http)
);

export const getSubcriptionStatusUseCase = new GetSubcriptionStatusUseCase(
  new SessionDataRepository(http)
);
