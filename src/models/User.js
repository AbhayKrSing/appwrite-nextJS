import mongoose from "mongoose";

const userSchema = new mongoose({
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
        unique: true
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

const User = mongoose.model.users || mongoose.model('users', userSchema);        //In mongo db everything stored in pural and lowercase form.
export default User;