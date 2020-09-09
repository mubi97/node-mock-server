const express = require('express')
const app = express()
const port = 8000
var cors = require('cors');
app.use(cors());
app.use(express.json());

require('./app/router/router.js')(app);




app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`)
})