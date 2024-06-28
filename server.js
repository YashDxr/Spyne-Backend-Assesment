const express = require("express");
const connectDB = require("./config/db.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
require("dotenv").config();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users.js"));
app.use("/api/discussions", require("./routes/discussions.js"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
