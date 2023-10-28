import { Entity } from '@loopback/repository';
export declare class UserSession extends Entity {
    userSessionId?: string;
    token: string;
    isTokenExpired?: boolean;
    createdAt?: Date;
    [prop: string]: any;
    constructor(data?: Partial<UserSession>);
}
export interface UserSessionRelations {
}
export type UserSessionWithRelations = UserSession & UserSessionRelations;
