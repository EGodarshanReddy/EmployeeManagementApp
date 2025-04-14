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
                ["EMPLOYEE"]
            )
              
    },

    
    // [HTTP_METHODS.GET]: {
    //     [EMPLOYEE_PROFILE_PATH.GET_ALL_EMPLOYEES]:"getAllEmployees",
    //     [EMPLOYEE_PROFILE_PATH.GET_ALL_DEPARTMENTS]:"getAllDepartments",
    //     [EMPLOYEE_PROFILE_PATH.GET_ALL_DESIGNATIONS]:"getAllDesignations",
    //     [EMPLOYEE_PROFILE_PATH.GET_EMPLOYEE_BY_ID]:"getEmployeeById",
    //     [EMPLOYEE_PROFILE_PATH.GET_DEPARTMENT_BY_ID]:"getDepartmentById",
    //     [EMPLOYEE_PROFILE_PATH.GET_DESIGNATION_BY_ID]:"getDesignationById"
    // },
   
    // [HTTP_METHODS.PUT]:{
    //     [EMPLOYEE_PROFILE_PATH.UPDATE_EMPLOYEE_PROFILE]:"updateEmployeeProfile"
    // },
   
    // [HTTP_METHODS.DELETE]:{
    //     [EMPLOYEE_PROFILE_PATH.DELETE_EMPLOYEE_PROFILE]:"deleteEmployeeProfile"}
   
}