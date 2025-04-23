import  'dotenv/config'
import { server } from "../interfaces/ConfigInterface.js";
export const config={
    server: <server>{
        port: process.env['PORT']
    }
}