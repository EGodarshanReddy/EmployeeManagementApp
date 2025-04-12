import { COMMON_ERROR_MESSAGES } from "../_constants/ErrorResponseErrorMessage.ts";

import { HTTP_STATUS_CODE } from "../_constants/HttpStatesCode.ts";
import ErrorResponse from "../_utils/Response.ts";



export async function routeHandler(req: Request, routes: Record<string, any>): Promise<Response> {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;

    const allRoutes = Object.values(routes).flatMap((allPresentRoutes) =>
        Object.keys(allPresentRoutes)
    );
    const allMatchedMethodRoutes = routes[method];
    console.log(allMatchedMethodRoutes);

    if (allMatchedMethodRoutes == undefined) {
        return ErrorResponse(
            HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
            COMMON_ERROR_MESSAGES.METHOD_NOT_ALLOWED,
        )
    }

    console.log("include", allRoutes.includes(path));
    if (allRoutes.includes(path)) {
        if (!allMatchedMethodRoutes || !allMatchedMethodRoutes?.[path]) {
            console.error(`Method '${method}' not allowed for route '${path}'`);
            return ErrorResponse(
                HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
                COMMON_ERROR_MESSAGES.METHOD_NOT_ALLOWED,
            )
        }
    }
    //checking for static routes if present then calling handler
    if (allMatchedMethodRoutes[path]) {
        return await allMatchedMethodRoutes[path](req);
    }

    //checking for dyanamic route matching
    for (const routePattern in allMatchedMethodRoutes) {
        const param = extractParameter(routePattern, path);
        if (param) {
             //calling handler if path is correct
             return await allMatchedMethodRoutes[routePattern](req, param);
        }
     }

     //again checking after dynamic route if route is present but method not supported
     const trimmedPath = path.split('/').slice(0, -1).join('/')+'/:id';
     console.log("trimmed path",trimmedPath);
      if(allRoutes.includes(trimmedPath)){
        return ErrorResponse(
             HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
             COMMON_ERROR_MESSAGES.METHOD_NOT_ALLOWED,
           )
      }  
   
      //returning route not found response
    return ErrorResponse(
         HTTP_STATUS_CODE.NOT_FOUND,
         COMMON_ERROR_MESSAGES.ROUTE_NOT_FOUND,
       
    )

}

export function extractParameter(routePattern: string, path: string) {
 
    const routePath = routePattern.split("/");
    const actualPath = path.split("/");

   // Return null if path lengths do not match
     if (routePath.length !== actualPath.length) {
          return null;
     }

     const params: Record<string, string> = {};

     for (let i = 0; i < routePath.length; i++) {
        if (routePath[i].startsWith(":")) {
           const paramName = routePath[i].slice(1);//removing : from route path
           params[paramName] = actualPath[i];
           console.log(`Extracted parameter: ${paramName} = ${actualPath[i]}`);
         }
         else if (routePath[i] !== actualPath[i]) {
               console.log(`Mismatch at position ${i}: expected ${routePath[i]} but found ${actualPath[i]}`);
               return null;
         }
     }

     console.log("Extracted Parameters:", params);
     return params; 
}