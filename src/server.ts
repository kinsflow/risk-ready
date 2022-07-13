import app from "./app";
import 'dotenv/config';

const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})