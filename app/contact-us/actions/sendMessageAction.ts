'use server'

import { z } from "zod"
import { contactUsSchema } from "../ContactUsSchema"
 
import { throwCustomError } from "@/lib/utils"
import CustomError from "@/lib/CustomError"

export const sendMessage = async (values:z.infer<typeof contactUsSchema>):Promise<{success:boolean,message:string}>=>{

    const validData = contactUsSchema.safeParse(values)

    try {
        if(!validData.success)  return  throwCustomError('Invalid Inputs')
            return {success:true,message:JSON.stringify(validData.data)}
    }catch (error) {
        {
            console.error(error)
            if(error instanceof CustomError){
                return {
                    success:false,
                    message:error.message
                }
            }
            return {success:false,message:'Internal Server Error'}
          }
    }

     

}