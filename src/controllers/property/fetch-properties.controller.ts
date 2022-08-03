import Property from "../../database/models/property";
import User from "../../database/models/user";
import { IPropertyRepo, PropertyDTO } from "../../entities/interfaces/property.interface";
import PropertyRepo from "../../entities/repositories/property.repository";
import { BaseController } from "../base.controller";

class FetchProperties extends BaseController {
    protected PropertyRepo: IPropertyRepo
    public constructor() {
        super();

        this.PropertyRepo = new PropertyRepo
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { user, query: { per_page, page_no } }: any = this.req;

            const userProperty = await this.PropertyRepo.fetchAllProperty(user.id, per_page, page_no);

            return this.ok<PropertyDTO>(this.res, userProperty, 'Properties Returned Successfully');
        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default FetchProperties;