import { HTTP_STATUS_CODE } from "../_constants/HttpStatesCode.ts";
import { Employee } from "../_model/Employee.ts";
import { createEmployee } from "../_repository/EmployeeRepo.ts";
import ErrorResponse, { SuccessResponse } from "../_utils/Response.ts";



export async function signupEmpleyee(req:Request,_params:Record<string, string>):Promise<Response>{
   try{
    const EmployeeData:Employee = await req.json();
        const email = EmployeeData.email;
        const password = EmployeeData.password;  
        const mobile_Number = EmployeeData.phone;
        console.log("email:"+email+"---- Password :"+password+"---- Mobile Number :"+mobile_Number);

        const  data = await createEmployee(email,password,mobile_Number);        
        return SuccessResponse("Employee Registered Successfully",200,data);      
   }
   catch(error){
    return ErrorResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,"InternalServerError");
   }
        
}
