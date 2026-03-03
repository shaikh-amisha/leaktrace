import crypto from "crypto";

const breachDomains = ["example.com","leakedemail.com","testcorp.com"];

export const isExposed = (email) =>{
const domain = email.split("@")[1];
  if (breachDomains.includes(domain)) return true;

  const hash = crypto.createHash("sha256").update(email).digest("hex");
  return parseInt(hash.slice(0, 2), 16) % 5 === 0; 

};