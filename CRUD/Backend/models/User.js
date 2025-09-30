import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  city: { type: String },
  state: { type: String },
});

const Studentdata = mongoose.model("Student", studentSchema);
export default Studentdata;
