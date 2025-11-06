// import { NextFunction, Request, Response } from "express";
// import { IRoleService } from "@/services/role.service";
// import { Role } from "@/domain/enums/role.enum";
// import { ResponseHelper } from "@/shared/utils/response.helper";

// export class RoleMiddleware {
//   constructor(private roleService: IRoleService) { }

//   requireRole(role: string) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       const user = (req as any).user;

//       if (!this.roleService.hasRole(user, role)) {
//         return ResponseHelper.forbidden(res);
//       }

//       next();
//     };
//   }

//   requireAdmin() {
//     return this.requireRole(Role.ADMIN);
//   }

//   requireUser() {
//     return this.requireRole(Role.USER);
//   }
// }
