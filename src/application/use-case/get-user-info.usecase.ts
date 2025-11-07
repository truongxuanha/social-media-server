import { NotFoundException } from "@/domain/exceptions";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserSerialized } from "@/domain/interfaces/user.interface";
import MESSAGE from "@/shared/contants/message";

export class GetUserInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IUserSerialized> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(MESSAGE.USER.NOT_FOUND);
    }

    return user.toJSON();
  }
}
