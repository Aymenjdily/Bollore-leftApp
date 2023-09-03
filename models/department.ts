import { Schema, model, models } from "mongoose";

const DepartmentSchema = new Schema({
    title: {
        type: String,
        required: [true, "Le titre du département est requis ! "]
    },
    company: {
        type: String,
        required: [true, "L'entreprise du département est requis !"]
    }
}, {
    timestamps: true
})

const Department = models.Department || model('Department', DepartmentSchema)

export default Department