const app = require("./src/app");
const config = require("./config.json");

app.listen(config.port, () =>
  console.log(`API Running on PORT: ${config.port}`)
);
