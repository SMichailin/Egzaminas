const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err)=> console.log(err));




const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});