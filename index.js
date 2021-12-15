const express = require("express");
const routerApi = require("./routes");

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler")

const app = express();
const port = 3000;

// middleware nativo, se debe usar cuando queremos empezar a recibir información en formato json

app.use(express.json());

// const whitelist = ["http://localhost:8080", "https://myapp.co"]
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("No permitido"));
//     }
//   }
// }
// app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Server en express");
});
app.get("/new-route", (req, res) => {
  res.send("Nueva ruta");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port " + port)
})
