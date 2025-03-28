import { app } from "./app.js";

import mongoose from "mongoose";

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO DATABASE");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    console.log("DATABASE CONNECTION FAILED");
  }
};

start();
