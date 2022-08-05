import { IPropertyRepo, PropertyDTO } from "../../entities/interfaces/property.interface";
import PropertyRepo from "../../entities/repositories/property.repository";
import { BaseController } from "../base.controller";

class FetchProperty extends BaseController {
    protected PropertyRepo: IPropertyRepo
    public constructor() {
        super();

        this.PropertyRepo = new PropertyRepo
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { params: { propertyId } } = this.req;

            const property = await this.PropertyRepo.findAProperty(propertyId);

            // const propertym :any = this.res.sendFile(__dirname+'/uploads');
            // console.log(propertym);
            
            return this.ok<PropertyDTO>(this.res, property, 'Property Returned Successfully');
        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default FetchProperty