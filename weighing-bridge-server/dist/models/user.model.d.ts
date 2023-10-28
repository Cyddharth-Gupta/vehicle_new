import { Entity } from '@loopback/repository';
import { Zone } from './zone.model';
export declare class User extends Entity {
    userId?: string;
    employeeId: string;
    fullName: string;
    joiningDate?: string;
    dateOfBirth?: string;
    userType: string;
    status: string;
    username: string;
    password: string;
    createdAt?: Date;
    zone: Zone;
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
