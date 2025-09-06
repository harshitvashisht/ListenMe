import { PrismaClient } from "@/app/generated/prisma";

const prismaClinetSingleton = () =>{
    return new PrismaClient()
}
//@ts-ignore
const prisma = globalThis.prisma ?? prismaClinetSingleton

export default prisma 
//@ts-ignore
if (process.env.NODE_ENV !=="production") globalThis.prisma = prisma