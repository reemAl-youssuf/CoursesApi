import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/roles.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreatRoleDto } from './dtos/role.dto';


@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private RoleModel:Model<Role>){}

    async createRole(role: CreatRoleDto){
        return this.RoleModel.create(role)
    }

    async getRoleById(roleId: string){
        return this.RoleModel.findById(roleId)
    }
}
