import { Repo } from "./base.interface";

export interface IPropertyRepo extends Repo<PropertyInstance> {
    createProperty(property: PropertyAttribute): Promise<PropertyInstance>;
    fetchAllProperty(userId: number, per_page: number, page_no: number): Promise<PropertyInstance>;
    findAProperty(propertyId: string): Promise<PropertyInstance>;
    updateProperty(propertyId: string, property: PropertyAttribute): Promise<PropertyInstance>;
    deleteProperty(propertyId: string): Promise<PropertyInstance>;
}

export interface PropertyInstance {
    id: string,
    userId: number,
    title: string,
    description: string,
    type: string,
    category: string,
    createdAt?: Date,
    updatedAt: Date,
}

export interface PropertyAttribute {
    id?: string,
    userId?: number,
    title?: string,
    description?: string,
    type?: string,
    category?: string
}


export interface PropertyDTO {
    id: string,
    userId: number,
    title: string,
    description: string,
    type: string,
    category: string,
}