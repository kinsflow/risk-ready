import { Repo } from "./base.interface";

export interface IConnectionRepo extends Repo<ConnectionInstance> {
    sendConnectionRequest(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance>;
    approveConnectionRequest(connectionId: string): Promise<ConnectionInstance>;
    declineConnectionRequest(connectionId: string): Promise<ConnectionInstance>;
    haveISentAConnectionRequest(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance>;
    haveIReceivedAConnectionRequest(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance>;
    isAConnectionAlready(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance>;
    isConectionBlockedAlready(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance>;
}

export interface ConnectionInstance {
    id: string,
    first_user: string,
    second_user: string,
    acted_user: string,
    status: string
    createdAt?: Date,
    updatedAt: Date,
}

export interface ConnectionAttribute {
    id?: string,
    first_user?: string,
    second_user?: string,
    acted_user?: string,
    status?: string
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ConnectionDTO {
    id?: string,
    first_user?: string,
    second_user?: string,
    acted_user?: string,
    status?: string
    createdAt?: Date,
    updatedAt?: Date,
}