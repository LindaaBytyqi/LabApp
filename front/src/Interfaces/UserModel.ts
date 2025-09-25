import { Role } from "./Role";
export interface UserModel {
  id: string | null | undefined;
  userName:string | null;
  lastName: string | null;
  email: string | null;
   password:string|null;
  address: string | null;
  role: Role;
}  