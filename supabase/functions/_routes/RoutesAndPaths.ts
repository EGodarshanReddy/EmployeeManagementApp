import { HTTP_METHODS } from "../_constants/HttpMethods.ts";
import { getEmployeeById } from "../_handler/GetEmpById.ts";
import { loginEmployee } from "../_handler/LoginEmp.ts";
import { signupEmpleyee } from "../_handler/SignUpEmployee.ts";
import { checkUserAuthentication } from "../_middleware/MiddleWare.ts";
import { EMPLOYEE_PROFILE_PATH } from "./RoutPaths.ts";



export const EMPLOYEE_ROUTS={
    [HTTP_METHODS.POST]:{[EMPLOYEE_PROFILE_PATH.CREATE_EMPLOYEE_PROFILE]:signupEmpleyee,

        [EMPLOYEE_PROFILE_PATH.EMPLOYE_LOGIN]:loginEmployee
        
    },
    [HTTP_METHODS.GET]:{
        
            [EMPLOYEE_PROFILE_PATH.GET_EMPLOYEE_ID]:checkUserAuthentication
            (
                getEmployeeById,
                []
            )
              
    }   
   
}