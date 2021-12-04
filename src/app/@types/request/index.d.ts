namespace Requester {

    export interface Params {
        method: "GET" | "post" | "patch" | "put" | "delete"
        url: string
        responseType?: 'json' 
    }

} 

export { Requester }