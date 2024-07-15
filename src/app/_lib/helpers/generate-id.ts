// Function to convert ArrayBuffer to Hex String
function bufferToHex(buffer: any) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
    .join('')
}

// Function to hash a string using SHA-256
async function hashString(message: string) {
  const msgBuffer = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer) // hash the message
  return bufferToHex(hashBuffer) // convert buffer to hex string
}

// Function to generate a UUID
export function generateUUID() {
  return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Main function to generate and hash the UUID
export async function generateHashedID() {
  const uuid = generateUUID()
  const hashedID = await hashString(uuid)
  return hashedID
}
