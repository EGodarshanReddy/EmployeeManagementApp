

import { routeHandler } from "../_routes/RouteHndler.ts";
import { EMPLOYEE_ROUTS } from "../_routes/RoutesAndPaths.ts";


console.log("Hello from Functions!")

Deno.serve(async (req: Request) => {  
  return await routeHandler(req, EMPLOYEE_ROUTS);
  
  });
