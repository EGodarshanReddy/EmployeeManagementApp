import supabase from "../_config/SupabaseDBClient.ts";
import { COMMON_ERROR_MESSAGES } from "../_constants/ErrorResponseErrorMessage.ts";
import { HTTP_STATUS_CODE } from "../_constants/HttpStatesCode.ts";
import { getEmployee } from "../_repository/EmployeeRepo.ts";
import { createCryptoKey, verifyJWT } from "../_utils/CreateAndVerifyJWT.ts";
import ErrorResponse from "../_utils/Response.ts";



export const checkUserAuthentication = function checkUserAuthentication(
    handler: (
        request: Request,
        params: Record<string, string>,
    ) => Promise<Response>,
    roles: string[] = [],
) {
    return async function (
        req: Request,
        params: Record<string, string>,
    ): Promise<Response> {
        try {
            // Extract token from Authorization header
            const token = req.headers.get("Authorization");
            console.log("User Token:", token);

            if (!token) {
                return ErrorResponse(
                    HTTP_STATUS_CODE.UNAUTHORIZED,
                    COMMON_ERROR_MESSAGES.MISSING_JWT_TOKEN,
                );
            }

            const jwt = token.replace("Bearer ", "").trim();
            const secret = "Godarshan*reddy^Enamala@Authentication&4system123456!@";
            const key = await createCryptoKey(secret);
            console.log("key", key);
            const payload = await verifyJWT(jwt, key);
            console.log("payload", payload);
            if (!payload || !payload.id) {
                return ErrorResponse(
                    HTTP_STATUS_CODE.UNAUTHORIZED,
                    COMMON_ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
                );
            }

            // Fetch employee data using ID from JWT
            const empData = await getEmployee(String(payload.id));

            if (!empData) {
                return ErrorResponse(
                    HTTP_STATUS_CODE.NOT_FOUND,
                    "User not found.",
                );
            }
            console.log("empData", empData);

            const user = {
                ...params,
                emp_id: String(payload.id),
                email: empData.mail_Id,
            };

            // Authorized → pass control to handler with user info
            return await handler(req, user);

        } catch (error) {
            console.error("Authentication Error:", error);
            return ErrorResponse(
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            );
        }
    };
};
