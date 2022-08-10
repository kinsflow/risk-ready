import { IPropertyRepo, PropertyDTO } from "../../entities/interfaces/property.interface";
import PropertyRepo from "../../entities/repositories/property.repository";
import { setEmptyFieldToNull } from "../../helper/helper";
import { BaseController } from "../base.controller";

class UpdateProperty extends BaseController {
    protected PropertyRepo: IPropertyRepo
    public constructor() {
        super();

        this.PropertyRepo = new PropertyRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const { body, files, params: {propertyId}, user }: any = this.req;

            body.userId = user.id;
            body.files = files;
            
            setEmptyFieldToNull(body);
            
            await this.PropertyRepo.updateProperty(propertyId, body);

            const createdProperty = await this.PropertyRepo.findAProperty(propertyId);
            
            return this.ok<PropertyDTO>(this.res, createdProperty, 'Property Updated successfully');
        } catch (error: any) {            
            return this.clientError(error);
        }
    }

}

export default UpdateProperty