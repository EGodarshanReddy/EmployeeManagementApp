import { CalculateResponseSize } from "./CalculateResponseSize.ts";

export default function ErrorResponse(statusCode: number, error: string){
    const time = new Date();

    const size=CalculateResponseSize(error);
    return new Response(JSON.stringify({statusCode,error,time,size}), {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
    });
}

//common success response
export function SuccessResponse(message: string, statusCode: number ,data?: any, ){
    
    const body = data ? {statusCode, message, data } : { statusCode,message };

    const size=CalculateResponseSize(body);

    return new Response(
        JSON.stringify({body,size}),
        {
            status: statusCode,
            headers: { 'content-type':'application/json'},
        }
    );
}
