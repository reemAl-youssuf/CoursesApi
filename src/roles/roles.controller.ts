import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreatRoleDto } from './dtos/role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() role: CreatRoleDto){
    return this.rolesService.createRole(role)
  }
}
