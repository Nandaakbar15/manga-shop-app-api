const express = require("express");
const router = require("./routes/route");
const app = express();
const port = 3000;

require("./config/db");
// Serve static files
app.use(express.static("public"));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

app.use(router);

// app.get("/test", (req, res) => {
//   res.status(200).json({
//     message: "Hello World!",
//   });
// });
