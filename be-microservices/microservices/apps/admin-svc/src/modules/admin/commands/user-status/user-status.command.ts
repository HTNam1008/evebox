import { UserStatus } from "@prisma/client";
import { UserStatusDto } from "./user-status.dto";

export class UserStatusCommand {
    constructor(
        public readonly userId: string,
        public readonly status: UserStatus,
    ) {}
    
    static create(dto: UserStatusDto, userId: string): UserStatusCommand {
        return new UserStatusCommand(
            userId,
            dto.status,
        );
    }
}