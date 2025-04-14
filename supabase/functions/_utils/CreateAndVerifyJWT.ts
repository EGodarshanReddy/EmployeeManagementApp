// For loading .env variables
import { create, getNumericDate, Header, Payload, verify } from "https://deno.land/x/djwt/mod.ts";  // Latest version

// Load environment variables from .env file


// Function to generate JWT
export async function generateToken(payload: object): Promise<string> {
  // JWT Header
  const header: Header = {
    alg: "HS512", // Using SHA-512 algorithm
    typ: "JWT"
  };

  // JWT Payload
  const payloadData: Payload = {
    ...payload, 
    exp: getNumericDate(60 * 60), // Set expiry to 1 hour
  };
  const jwtSecrete = "Godarshan*reddy^Enamala@Authentication&4system123456!@";
  const jwtKey = await createCryptoKey(jwtSecrete);

  // Create and sign the JWT token
  const token = await create(header, payloadData, jwtKey);
  return token;
}


// Convert a secret string to a CryptoKey
export async function createCryptoKey(secret: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
  
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign", "verify"],
    );  
    return cryptoKey;
  }


  export async function veryJWT(jwt: string,key: CryptoKey | null,) {

    try {
      const verifiedToken = await verify(jwt, key);
      return verifiedToken;
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return null;
    }

    
  }
  


