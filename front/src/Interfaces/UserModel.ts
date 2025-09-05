import { Role } from "./Role";
export interface UserModel {
  id: string | null | undefined;
  lastName: string | null;
  personalID: string | null;
  personalEmail: string | null;
  role: Role;
}  