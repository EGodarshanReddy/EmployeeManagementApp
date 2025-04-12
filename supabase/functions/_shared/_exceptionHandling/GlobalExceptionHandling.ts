import { COMMON_ERROR_MESSAGES } from "../../_constants/ErrorResponseErrorMessage.ts";
import { HTTP_STATUS_CODE } from "../../_constants/HttpStatesCode.ts";
import ErrorResponse from "../../_utils/Response.ts";
import { CustomException } from "./CoustomException.ts";

export default class GlobalExceptionHandler {
    static handle<T extends (...args: any[]) => Promise<Response>>(handler: T): T {
        return (async (...args: Parameters<T>): Promise<Response> => {
            try {
                return await handler(...args);
            } catch (error) {
                if (error instanceof CustomException) {
                    console.log(error.message);
                    return ErrorResponse(error.statusCode, error.message);
                } 
                else {
                    console.log(`Unhandled error: ${error}`);
                    return ErrorResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                }
            }
        }) as T;
    }
}