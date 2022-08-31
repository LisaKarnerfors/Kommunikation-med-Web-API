import express from 'express'
import fetch from 'node-fetch'
import { nanoid } from 'nanoid'

const app = express()
const port = 3000

app.use(express.json()) 
app.use("/", express.static("client"))


app.get("/api/makeup", async (req, res) => {
  try {
    const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
    const data = await response.json() 
    console.log(data)
    
    res.json(data) 

  }catch(err) {
    /* console.error(err)
    res.json(err) */
    res.status(400).json(err.message)
  }
})


let productList = [
  {
    id: nanoid(),
    brandName: "Natasha Denona",
    productName: "Sunset Eyeshadow Palette",
    image: "411761_swatch.png"
  },
  {
    id: nanoid(),
    brandName: "Dior",
    productName: "BACKSTAGE EyeShadow Palette",
    image: "584040_swatch.png"
  },
  {
    id: nanoid(),
    brandName: "Sephora Collection",
    productName: "Merry & Bright Eyeshadow Palette",
    image: "532112_swatch.png"
  }
]

app.get("/api/products", (req, res) => {
  try {
    res.json(productList)
  } catch(err) {
      // res.status(500).json(err.message)
      console.error(err)
  }
})


app.post("/api/products", (req, res) => { 
  try { 
    productList.push({...req.body, ...{id: nanoid()}})
    res.json("Söker efter produkten!")  
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