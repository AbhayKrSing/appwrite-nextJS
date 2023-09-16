import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please Provide Username"],
        unique: true
    },
    email: {
        type: String,
        require: [true, "Please Provide email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please Provide password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})
// const User = mongoose.model('user', userSchema); //Giving Overwriting error        //In mongo db everything stored in pural and lowercase form.
let User:any
try {
    User = mongoose.model('user');
} catch (error) {
    User = mongoose.model('user', userSchema);
}
export default User;