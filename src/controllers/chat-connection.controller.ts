import { BaseController } from "./base.controller";

class ChatConnectionController extends BaseController {
    public constructor() {
        super()
    }
    protected executeImpl(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default ChatConnectionController