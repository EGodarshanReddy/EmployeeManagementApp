import { HTTP_STATUS_CODE } from "../_constants/HttpStatesCode.ts";

import { checkUser } from "../_repository/EmployeeRepo.ts";
import { generateToken } from "../_utils/CreateAndVerifyJWT.ts";
import { comparePasswords } from "../_utils/EmployeeDataValidations.ts";
import ErrorResponse, { SuccessResponse } from "../_utils/Response.ts";





export async function loginEmployee(req: Request, params: Record<string, string>) {

    try {
        const EmployeeData = await req.json();
        const email = EmployeeData.email;
        const pswd = EmployeeData.password;


        const user = await checkUser(email);
        console.log("user", user);
        
        if (user.password) {
            // const comparePassword = await comparePasswords(pswd, user.password);
            // if (!comparePassword) {
            //     return ErrorResponse(400, "Incorrect Password");
            // }

            console.log("user", user);

            const payload = {
                email: user.mail_Id,
                role: user.pasword,
                id: user.id
            };
            const token = await generateToken(payload);
            console.log("Generated JWT Token:", token);


            return SuccessResponse("Employee LoggedIn Successfully", HTTP_STATUS_CODE.OK, token);
        }

    }
    catch (error) {
        return ErrorResponse(400, "Internal server error")
    }
}

