const express = require('express')
const app = express()
express.static('.')
const port = process.env.PORT || 4200;
app.use(express.static('dist'))
app.listen(port , () => console.log(`Example app listening on port ${port}!`))