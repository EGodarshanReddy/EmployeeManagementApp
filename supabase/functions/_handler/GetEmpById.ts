import { HTTP_STATUS_CODE } from "../_constants/HttpStatesCode.ts";
import { getEmp, getEmployee } from "../_repository/EmployeeRepo.ts";
import ErrorResponse, { SuccessResponse } from "../_utils/Response.ts";



export async function getEmployeeById(_req:Request,params:Record<string, string>):Promise<Response>{

    try{
        const id = params.id;
        const data = await getEmp(id);        
        return SuccessResponse("Employee Fetched Successfully",200,data);
    }
    catch(error){
        return ErrorResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,"InternalServerError");
    }
    
}