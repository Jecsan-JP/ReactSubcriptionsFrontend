import type { UseCase } from "../../../../common/domain/interfaces/UseCase";
import type { GetUserByEmailResultDto } from "../models/GetUserByEmailResultDto";
import type { SessionRepository } from "../repositories/SessionRepository";

export class GetUserByEmailUseCase
  implements UseCase<string, GetUserByEmailResultDto>
{
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(email: string): Promise<GetUserByEmailResultDto> {
    return this.sessionRepository.getUserByEmail(email);
  }
}
