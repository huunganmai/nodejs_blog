const express = require('express')
const app = express()
const port = 3000

app.get('/tin-tuc', (req, res) => {
    const a=1
    const b=2
    const c= a+b

  res.send('HuuNganOcCho')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})