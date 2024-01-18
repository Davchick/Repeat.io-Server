import got from "got";
import mongoose from "mongoose";

/* THIS CODE IS NEED TO WAKE UP CHEAP SERVER ON
 RENDER.COM, CUZ IT EVERY TIME JUST TURNINGS OFF  */

const keepAlive = async () => {
  try {
    await got.get(process.env.SERVER_URL);
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {}
};

export default keepAlive;
