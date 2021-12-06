namespace Requester {

    export interface Params {
        method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
        url: string
        responseType?: 'json' 
    }

} 

export { Requester }