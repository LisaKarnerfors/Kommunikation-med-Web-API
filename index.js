import express from 'express'
import axios from 'axios'
/* import fetch from 'node-fetch'  */


const app = express()
const port = 3000

app.use("/", express.static("client"))

/* const axios = require("axios"); */


app.get("/api/makeup", async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://sephora.p.rapidapi.com/auto-complete',
        params: {q: 'eyeshadows'},
        headers: {
            'X-RapidAPI-Key': 'cb855dcb7amsh4c1c5fe2e1b4328p1eb738jsnc16abd41bfac',
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

})  
 

/* app.get("/api/:makeup", async (req, res) => {
    const response = await fetch('https://sephora.p.rapidapi.com/auto-complete')
    const data = await response.json()
    res.json(data)
}) */


app.get("/api/:greeting", (req, res) => {
    req.params.greeting
    res.send(req.params.greeting)
})

let firstname = ""
let lastname = ""

let number = 0
 

app.get("/api/:greeting", (req, res) => {
    res.send(`${req.params.greeting + " " + name}`) 
}) 


app.get("/api/name/:firstname/:lastname", (req, res) => {
    firstname = req.params.firstname
    lastname = req.params.lastname
    res.send(firstname + " " + lastname) 
    number = number +1
    console.log(number)
})


// GET method route
/* app.get('/', (req, res) => {
    res.send('GET request to the homepage')
  }) */

// POST method route
/* app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  }) */

 /*  app.put('/users', (req, res) => {
    return res.send('PUT HTTP method on user resource');
  }); */

/*   app.delete('/users', (req, res) => {
    return res.send('DELETE HTTP method on user resource');
  }); */



app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})