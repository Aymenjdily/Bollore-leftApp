import { Schema, model, models } from "mongoose";

const DepartmentSchema = new Schema({
    title: {
        type: String,
        required: [true, "Department Title is Required ! "]
    }
}, {
    timestamps: true
})

const Department = models.Department || model('Department', DepartmentSchema)

export default Department