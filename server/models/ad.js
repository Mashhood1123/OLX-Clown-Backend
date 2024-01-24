import mongoose, { Schema } from "mongoose";

const Ads = mongoose.model(
  "Ad",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      imgurl: {
        type: String,
        required: true,
      },
      UserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Ads;
