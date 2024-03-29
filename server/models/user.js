import mongoose, {Schema} from "mongoose";

const User = mongoose.model(
    "User",
    new Schema(
        {
            username: {
                type: String,
                required: true,
              },
              password: {
                type: String,
                required: true,
              },
              email: {
                type: String,
                required: true,
              },
        },
        {
            timestamps:true
        }
    )
);

export default User;