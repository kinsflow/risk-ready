import { IPropertyRepo, PropertyDTO } from "../../entities/interfaces/property.interface";
import PropertyRepo from "../../entities/repositories/property.repository";
import { setEmptyFieldToNull } from "../../helper/helper";
import { BaseController } from "../base.controller";

class CreateProperty extends BaseController {
    protected PropertyRepo: IPropertyRepo
    public constructor() {
        super();

        this.PropertyRepo = new PropertyRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const { body, files, user }: any = this.req;

            body.userId = user.id;
            body.files = files;

            // setEmptyFieldToNull(body);
            

            const createProperty = await this.PropertyRepo.createProperty(body);

            return this.created<PropertyDTO>(this.res, createProperty, 'Property Added successfully');
        } catch (error: any) {
            return this.clientError(error);
        }
    }

}

export default CreateProperty