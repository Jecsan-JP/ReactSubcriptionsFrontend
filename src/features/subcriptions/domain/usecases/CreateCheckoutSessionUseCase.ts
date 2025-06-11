import type { UseCase } from "../../../../common/domain/interfaces/UseCase";
import type { CreateCheckoutSessionRequestDto } from "../models/CreateCheckoutSessionRequestDto";
import type { CreateCheckoutSessionResultDto } from "../models/CreateCheckoutSessionResultDto";
import type { SessionRepository } from "../repositories/SessionRepository";

export class CreateCheckoutSessionUseCase
  implements
    UseCase<CreateCheckoutSessionRequestDto, CreateCheckoutSessionResultDto>
{
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(
    request: CreateCheckoutSessionRequestDto
  ): Promise<CreateCheckoutSessionResultDto> {
    return this.sessionRepository.createCheckoutSession(request);
  }
}
