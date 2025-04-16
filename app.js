const app = require("./index");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Incomming request listening on port ${PORT}`);
});
