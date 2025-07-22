import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreatRoleDto } from './dtos/role.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { permissions } from 'src/decorators/permissions.decorator';
import { Resource } from './enums/resource.enum';
import { Action } from './enums/action.enums';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@permissions([
  {
    resource :Resource.roles,
    actions:[Action.create, Action.read]
  }
])

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() role: CreatRoleDto){
    return this.rolesService.createRole(role)
  }

  @Get(':id')
  async getRole(@Param('id') id: string){
    return this.rolesService.getRoleById(id)
  }
}
