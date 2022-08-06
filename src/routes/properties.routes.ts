import { Router } from "express";
import CreateProperty from "../controllers/property/create-property.controller";
import DeleteProperty from "../controllers/property/delete-property.controller";
import FetchProperties from "../controllers/property/fetch-properties.controller";
import FetchProperty from "../controllers/property/fetch-property.controller";
import UpdateProperty from "../controllers/property/update-property.controller";
import upload from "../multer";

const propertyRouter = Router();

propertyRouter.post('/', upload.array('images', 4), (req, res) => new CreateProperty().execute(req, res));
propertyRouter.get('/', (req, res) => new FetchProperties().execute(req, res));
propertyRouter.get('/:propertyId', (req, res) => new FetchProperty().execute(req, res));
propertyRouter.put('/:propertyId', upload.array('images', 4), (req, res) => new UpdateProperty().execute(req, res));
propertyRouter.delete('/:propertyId', (req, res) => new DeleteProperty().execute(req, res));

export default propertyRouter