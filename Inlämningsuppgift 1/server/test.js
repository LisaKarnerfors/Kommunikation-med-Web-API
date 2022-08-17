import express from "express"

const app = express()
const port = 3000 

app.use("/", express.static("client"))


app.get("/api/:greeting", (req, res) => {
    req.params.greeting
    res.send(req.params.greeting)
})

let firstname = ""
let lastname = ""

let number = 0
 

/* app.get("/api/:greeting", (req, res) => {
    res.send(`${req.params.greeting + " " + name}`) 
})  */


app.get("/api/name/:firstname/:lastname", (req, res) => {
    firstname = req.params.firstname
    lastname = req.params.lastname
    res.send(firstname + " " + lastname) 
    number = number +1
    console.log(number)
})

res.json 


app.listen(port, () => {
    console.log(`App is running on port ${port}`); 
})


