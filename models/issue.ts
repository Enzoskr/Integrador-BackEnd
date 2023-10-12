import { Model, Schema, Types, model } from "mongoose";

export interface IIssue {
  title: String;
  description: String;
  priority: Number;
  user: Types.ObjectId;
  createdAt: Date;
}

const IssueSchema = new Schema<IIssue>({
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

const Issue: Model<IIssue> = model<IIssue>("Issue", IssueSchema);

export default Issue;
