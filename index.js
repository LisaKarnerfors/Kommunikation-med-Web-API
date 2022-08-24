import express from 'express'
import axios from 'axios'
import { nanoid } from 'nanoid'
/* import { router as adminRouter } from "./routers/admin.js" // Ger router ett namn (as) */

const app = express()
const port = 3000

app.use(express.json())
app.use("/", express.static("client"))

/* app.use("/admin", adminRouter) 
app.use("/admin", adminRouter) // Två routers i inlämningsuppgiften. En för vår resurs och en för externa api:t
*/

// Hämtar externt API
app.get("/api/makeup", async (req, res) => {

  try {

  const options = {
    method: 'GET',
    url: 'https://sephora.p.rapidapi.com/auto-complete',
    params: { q: 'eyeshadows' },
    headers: {
      'X-RapidAPI-Key': 'cb855dcb7amsh4c1c5fe2e1b4328p1eb738jsnc16abd41bfac',
      'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }  
  }

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });

  } catch(err) {
    res.status(400).json(err.message)
  }
})


// Lista 
let products = [
  {
    id: nanoid(),
    productName: "Natasha Denona",
    brandName: "Sunset Eyeshadow Palette"
  },
  {
    id: nanoid(),
    productName: "Dior",
    brandName: "BACKSTAGE EyeShadow Palette"
  },
  {
    id: nanoid(),
    productName: "Sephora Collection",
    brandName: "Merry & Bright Eyeshadow Palette"
  }
]

// Endpoint GET
app.get("/products", (req, res) => {
  
  try {
    res.json(products)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// Endpoint POST
app.post("/products", (req, res) => {
  
  try {
    if (!req.body || (!req.body.productName || !req.body.brandName)) {
      throw new Error("Data was not provided correctly!")
    }

    const productExist = products.find(product => product.productName == req.body.productName)

    if (productExist) {
      throw new Error("Product already exist")
    }

/*  let newProduct = req.body
    newProduct.id = nanoid()
    products.push(newProduct)
    res.json("New Product added!") */

    products.push({...req.body, ...{id: nanoid()}})
    res.json({status: "New product added!"}) 

  } catch (err) {
    res.status(400).json(err.message)
  }

})


app.use((err, req, res, next) => {
  console.log(err.status)
  console.log(err.message)
  res.status(500).json(err)
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})