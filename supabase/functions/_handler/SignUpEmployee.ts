import { Employee } from "../_model/Employee.ts";
import { signUpNewUser } from "../_repository/AuthReopository.ts";
import ErrorResponse, { SuccessResponse } from "../_utils/Response.ts";



export async function signupEmpleyee(req:Request,_params:Record<string, string>){
   
        const EmployeeData:Employee = await req.json();
        const email = EmployeeData.email;
        const password = EmployeeData.password;  

        const  data = await signUpNewUser(email,password); 
        if(data){
            console.log(data);
            return SuccessResponse("Employee Registered Successfully",200,data);
        }    
        else{
            return ErrorResponse(400,"Employee Registration Failed");
        }   
}
