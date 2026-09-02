const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    console.log("Get request")
    res.json({message : "Error"})
})

app.listen(4000)

