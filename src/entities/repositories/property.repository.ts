import Media from "../../database/models/media";
import Property from "../../database/models/property";
import { IPropertyRepo, PropertyAttribute, PropertyInstance } from "../interfaces/property.interface";

class PropertyRepo implements IPropertyRepo {
    private model: any;

    public constructor() {
        this.model = Property
    }

    async createProperty(property: PropertyAttribute | any): Promise<PropertyInstance> {

        try {
            const createPropery = await this.model.create({
                userId: property.userId,
                title: property.title,
                description: property.description,
                type: property.type,
                category: property.category,
                item_name: property.item_name,
                date_of_purchase: property.date_of_purchase,
                model: property.model,
                purchase_price: property.purchase_price,
                serial_number: property.serial_number,
                made_by: property.made_by
            })

            property.files.forEach(async file => {
                await createPropery.createMedia({
                    file_path: file.filename,
                    type: file.mimetype,
                    folder: file.destination
                })
            });
            return createPropery
        } catch (error) {
            throw error
        }
    }

    async fetchAllProperty(userId: number, per_page: number, page_no: number): Promise<PropertyInstance> {
        return await this.model.paginate({
            where: { userId },
            page: page_no,
            paginate: per_page,
            order: [['updatedAt', 'DESC']],
            include: ['medias']
        })
    }

    async findAProperty(propertyId: string): Promise<PropertyInstance> {
        return await this.model.findOne({
            where: {
                id: propertyId
            },
            include: ['medias']
        })
    }

    async updateProperty(propertyId: string, property: PropertyAttribute | any): Promise<PropertyInstance> {
        try {
            const updateProperty = await this.model.update({
                title: property.title,
                description: property.description,
                type: property.type,
                category: property.category,
                item_name: property.item_name,
                date_of_purchase: property.date_of_purchase,
                model: property.model,
                purchase_price: property.purchase_price,
                serial_number: property.serial_number,
                made_by: property.made_by
            }, {
                where: {
                    id: propertyId
                }
            })

            await Media.destroy({
                where: {
                    mediaable_type: 'Property',
                    mediaable_id: propertyId,
                }
            })

            await Media.bulkCreate(property.files.map((file: any) => {
                return {
                    mediaable_type: 'Property',
                    mediaable_id: propertyId,
                    file_path: file.filename,
                    type: file.mimetype,
                    folder: file.destination
                }
            }))

            return updateProperty
        } catch (error) {
            throw error
        }
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