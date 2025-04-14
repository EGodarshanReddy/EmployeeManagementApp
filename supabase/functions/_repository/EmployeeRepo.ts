import supabase from "../_config/SupabaseDBClient.ts";
import { HTTP_STATUS_CODE } from "../_constants/HttpStatesCode.ts";
import { EMPLOYEE_TABLE_FIELD_NAMES } from "../_shared/_constants/TableFieldNames.ts";
import { TABLE_NAMES } from "../_shared/_constants/TableNames.ts";
import ErrorResponse from "../_utils/Response.ts";



export async function checkUser(email:string):Promise<any>{

  console.log("Checking User...");
    const {data,error} = await supabase
    .from(TABLE_NAMES.EMPLOYEES)
    .select("id, mail_Id, password")
    
    // .select("{EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_EMAIL,EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_PASSWORD}"),
    // .select(`${EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_EMAIL},${EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_PASSWORD}`) //select("EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_EMAIL,EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_PASSWORD")
    .eq(EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_EMAIL, email)
    .maybeSingle();

    
    console.log(data,error);
    if(error){
        console.log(error.message+"---");
        throw new Error(error.message);
    }
    if(!data){
        return ErrorResponse(HTTP_STATUS_CODE.NOT_FOUND,"No Employee Found");
    }
    return data;
}

export async function createEmployee(email: string, password: string, mobileNumber: string) {

  console.log("Creating Employee...");
  console.log("email:"+email+"---- Password :"+password+"---- Mobile Number :"+mobileNumber);
  const { data, error } = await supabase
    .from(TABLE_NAMES.EMPLOYEES)
    .insert([
      { 
        [EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_EMAIL]: email,
        [EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_PASSWORD]: password, 
        [EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_PHONE]: mobileNumber,
        [EMPLOYEE_TABLE_FIELD_NAMES.EMPLOYEE_ROLE]: "E"
      }
    ])
    .maybeSingle(); 

    console.log(data,error?.message);
  if (error) {
    console.error("Signup Error:", error.message);
    throw new Error("Signup failed: " + error.message);
  }

  return data;
}


export async function getEmployee(id:string){

  const {data,error} = await supabase
  .from(TABLE_NAMES.EMPLOYEES)
  .select("*")
  .eq("id", id)
  .maybeSingle();
  

  if(error){
      console.log(error.message+"---");
      throw new Error(error.message);
  }
  if(!data){    
      return ErrorResponse(HTTP_STATUS_CODE.NOT_FOUND,"No Employee Found");
  }
  return data;  
}