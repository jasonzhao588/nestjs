import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionInterface } from '../interfaces/permission.interface';
import { User } from '../../modules/user/user.entity';
import { UserService } from '../../modules/user/user.service';
import { Possession } from '../enums/possession.enum';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) { }

  async validatePermissions(
    permissions: PermissionInterface[],
    user: User,
    resourceId: number
  ){
    const results = permissions.map( async permission => {
      
      const { role, resource, possession } = permission;
      let hasRole: boolean = true;
      let hasPossession: boolean = true;

      if (possession === Possession.OWN) {
        hasPossession = await this.userService.possess(user.id, resource, resourceId);
      }

      if (role) {
        hasRole = user.roles.some(userRole => userRole.name === role);
      }

      return hasRole && hasPossession;
    });

    return Promise.all(results);
  }
  // 是否可以激活
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get(
      'permissions',
      context.getHandler()
    );
    const results = await this.validatePermissions(
      permissions,
      request.user,
      parseInt(request.params.id)
    );
    return results.includes(true); 
  }
}
