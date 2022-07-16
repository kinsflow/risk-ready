import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5001;
try {
    app.listen(port, () => {
        console.log(`Server Running on port ${port}`)
    })
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}