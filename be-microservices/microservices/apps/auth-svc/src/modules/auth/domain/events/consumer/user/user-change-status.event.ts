import { UserStatus } from "@prisma/client";

export interface IUserChangeStatusEvent {
  userId: string;
  status: UserStatus;
}
