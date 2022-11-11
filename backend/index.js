const express = require("express");
const app = express();
const PORT = 3000;

const peopleRouter = require("./route/people");

app.use("/api/v1/people", peopleRouter);

// middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
