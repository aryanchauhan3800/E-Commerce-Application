import mongoose from "mongoose";

const offerSchema= new mongoose.Schema({
    photo: {
      data: Buffer,
      contentType: String,
    }
},
    { timestamps: true }
)

export default mongoose.model("Offer",offerSchema);