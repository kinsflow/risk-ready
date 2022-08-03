import { IPropertyRepo, PropertyDTO } from "../../entities/interfaces/property.interface";
import PropertyRepo from "../../entities/repositories/property.repository";
import { BaseController } from "../base.controller";

class DeleteProperty extends BaseController {
    protected PropertyRepo: IPropertyRepo
    public constructor() {
        super();

        this.PropertyRepo = new PropertyRepo
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { params: { propertyId } } = this.req;

            await this.PropertyRepo.deleteProperty(propertyId);

            return this.deleted(this.res);
        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default DeleteProperty;