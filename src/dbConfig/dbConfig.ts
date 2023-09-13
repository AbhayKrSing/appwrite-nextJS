import mongoose from "mongoose";

const connectdb = async() => {
 try {
  mongoose.connect(process.env.MONGO_URI!);
  const connection=mongoose.connection;
  connection.on('connected',()=>{
    console.log("Mongodb Successfully Connected")
  })
  connection.on('error',(err)=>{
    console.log("MongoDb connection error :" + err)
    process.exit()
  })

 } catch (error) {
  console.log((error as Error).message)
 }
}

export default connectdb
