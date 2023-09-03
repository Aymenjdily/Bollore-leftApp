import { Schema, model, models } from "mongoose";

const DemandeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reason: {
        type: String,
    },
    hours: {
        type: String,
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
    dateReprise: {
        type: String,
        required: [true, "Date Retour is Required ! "]
    },
    state: {
        type: String
    },
    validator: {
        type: String
    }
}, {
    timestamps: true
})

const Demande = models.Demande || model('Demande', DemandeSchema)

export default Demande