const express = require("express");
const app = express();
const PORT = 3000;

const peopleRouter = require("./routes/people");

app.use("/api/v1/people", peopleRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
