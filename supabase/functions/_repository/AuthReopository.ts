import supabase from "../_config/SupabaseDBClient.ts";


// export async function Signup(email:string,password:string) 
// {
//     const { data, error } = await supabase.auth.signUp({ email:email, password: password });

//     if (error) {
//         throw new Error(error.message);
//     }

//     return data;
// }

export async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:4400/verify',
      },
    })
    if (error) {
        console.error("Signup Error:", error.message);
        throw new Error("Signup failed: " + error.message);
      }
    
      return data;
    
  }
// export async function Signup(email: string, password: string) {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });
  
//     if (error) {
//       console.error("Signup Error:", error.message);
//       throw new Error("Signup failed: " + error.message);
//     }
  
//     return data;
//   }
// export async function Login(email:string,password:string) 
// {
//     const { data, error } = await supabase.auth.signInWithPassword({ email:email, password: password });

//     if (error) {    
//         throw new Error(error.message);
//     }

//     return data;
// }



