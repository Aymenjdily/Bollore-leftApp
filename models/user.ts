import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required : [true, "Email is Required ! "],
    },
    fullName: {
        type: String,
        required: [true, "Full Name is Required ! "],
        minLength: [4, "Full Name should be atleast more than 4 characters long"],
        maxLength: [30, "Full Name should be less than 30 characters"]
    },
    password: {
        type: String,
        required : [true, "Password is Required ! "],
        select: false
    },
    role: {
        type: String,
        required: [true, "Role is Required ! "],
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    }
}, {
    timestamps: true
})

const User = models.User || model('User', UserSchema)

export default User