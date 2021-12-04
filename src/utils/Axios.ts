import axios from "axios";
import { Requester } from "app/@types/request";

export default class Axios {
    
    static async request(params: Requester.Params) {
        return await axios({...params})
    } 

}
