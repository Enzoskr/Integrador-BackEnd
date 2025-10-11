import { Schema, model } from "mongoose";
const IssueSchema = new Schema({
    title: {
        type: String,
        required: [true, "el titulo es obligatorio"],
    },
    description: {
        type: String,
        required: [true, "la descripcion es obligatoria"],
    },
    priority: {
        type: Number,
        required: [true, "la prioridad es obligatoria"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Issue = model("Issue", IssueSchema);
export default Issue;
