import { Role } from "./role";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: Role;
      email: string;
    }
  }
}
