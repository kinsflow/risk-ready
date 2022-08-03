import Property from "../../database/models/property";
import { IPropertyRepo, PropertyAttribute, PropertyInstance } from "../interfaces/property.interface";

class PropertyRepo implements IPropertyRepo {
    private model: any;

    public constructor() {
        this.model = Property
    }

    async createProperty(property: PropertyAttribute | any): Promise<PropertyInstance> {

        const createPropery = await this.model.create({
            userId: property.userId,
            title: property.title,
            description: property.description,
            type: property.type,
            category: property.category
        })

        return createPropery
    }

    async fetchAllProperty(userId: number, per_page: number, page_no: number): Promise<PropertyInstance> {
        return await this.model.paginate({
            where: { userId },
            page: page_no,
            paginate: per_page,
            order: [['updatedAt', 'DESC']]
        })
    }

    async findAProperty(propertyId: string): Promise<PropertyInstance> {
        return await this.model.findOne({
            where: {
                id: propertyId
            }
        })
    }

    async updateProperty(propertyId: string, property: PropertyAttribute): Promise<PropertyInstance> {
        return await this.model.update({
            title: property.title,
            description: property.description,
            type: property.type,
            category: property.category
        }, {
            where: {
                id: propertyId
            }
        })
    }

    async deleteProperty(propertyId: string): Promise<PropertyInstance> {
        return this.model.destroy({
            where: {
                id: propertyId
            }
        })
    }

    exists(t: string | PropertyInstance): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: PropertyInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<PropertyInstance> {
        throw new Error("Method not implemented.");
    }
    save(t: PropertyInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

export default PropertyRepo