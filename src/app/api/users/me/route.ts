import connectdb from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"
connectdb()
export const GET= async (req:NextRequest) => {
    try {
        const userData:any=  await getDataFromToken(req)
         const user= await User.findById(userData.id).select('-password')
         return NextResponse.json(user)
     
    } catch (error:any) {
      return  NextResponse.json({
            message:error.message
        })
    }
}