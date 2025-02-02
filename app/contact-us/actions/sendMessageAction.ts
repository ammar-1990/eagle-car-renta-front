'use server'

import { z } from "zod"
import { contactUsSchema } from "../ContactUsSchema"
 
import { throwCustomError } from "@/lib/utils"
import CustomError from "@/lib/CustomError"
import sendEmail from "@/SendGrid"

export const sendMessage = async (values:z.infer<typeof contactUsSchema>):Promise<{success:boolean,message:string}>=>{

    const validData = contactUsSchema.safeParse(values)

    try {
        if(!validData.success)  return  throwCustomError('Invalid Inputs')
          const res =  await sendEmail({subject:values.subject??"Contact Message" ,to:'ammar.ali.haidar.1990@gmail.com',text:'contact message',html:`
               Sender Email: <strong>${values.email}</strong> 
               <br/>
               Sender Name: <strong> ${values.firstName} ${values.lastName}</strong> 
                <br/>  
                ${values.message}
                `,template:false})

                if(res.success){
                    return {success:true,message:"Message Sent"}
                }else{
                    return {
                        success:false,
                        message:"Something went wrong"
                    }
                }
        
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