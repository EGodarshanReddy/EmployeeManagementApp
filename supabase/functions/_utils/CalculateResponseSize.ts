export function CalculateResponseSize(responseBody: any): number {
    const sizeInBytes = new TextEncoder().encode(JSON.stringify(responseBody)).length;
    console.log("Response size in bytes:", sizeInBytes);
   return sizeInBytes;
}