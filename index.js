const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { authenticate } = require("./auth/authenticate");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect(process.env.DB_CONECTION_STRING);
    console.log("Conectado a la base de datos de MongoDB");
}

main().catch(console.error);

app.use("/api/login", require("./routes/login"));
app.use("/api/refresh-token", require("./routes/refreshtoken"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/signup", require("./routes/signup"));
app.use("/api/todos", authenticate, require("./routes/todos"));
app.use("/api/user", authenticate, require("./routes/user"));

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto: ${port}`);
});
