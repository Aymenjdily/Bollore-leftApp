import { Schema, model, models } from "mongoose";

const DemandeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, "Department Title is Required ! "]
    },
    reason: {
        type: String,
        required: [true, "Reason is Required ! "]
    },
    type: {
        type: String,
        required: [true, "Type is Required ! "]
    },
    dateDepart: {
        type: String,  
        required: [true, "Date Départ is Required ! "]
    },
    dateRetour: {
        type: String,
        required: [true, "Date Retour is Required ! "]
    },
    state: {
        type: String
    },
    department: {
        type: String,
        required: [true, "Department Demande is Required ! "]
    }
}, {
    timestamps: true
})

const Demande = models.Demande || model('Demande', DemandeSchema)

export default Demande