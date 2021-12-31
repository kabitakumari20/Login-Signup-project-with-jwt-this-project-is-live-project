const express = require("express");
const app = express();
app.use(express.json());
const home = require('./routes/router');
app.use('/', home);
const port = 4000;
// 
app.listen(port, () => {
  console.log(`We have connected with our this port no ${port}. `);
});
