import type { UseCase } from "../../../../common/domain/interfaces/UseCase";
import type { GetSubscriptionStatusDto } from "../models/GetSubscriptionStatusDto";
import type { SessionRepository } from "../repositories/SessionRepository";

export class GetSubcriptionStatusUseCase
  implements UseCase<string, GetSubscriptionStatusDto>
{
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(customerId: string): Promise<GetSubscriptionStatusDto> {
    return this.sessionRepository.getSubcriptionStatusByCustomerId(customerId);
  }
}
