import express from "express"
import { nanoid } from 'nanoid'
// Skapa router

/* Kolla igenom Router igen.. */

export const router = express.Router()

// Produktlista till inlämningsuppgiften 

const products = [
  {
    id: nanoid(),
    title: "Hej",
    price: 50,
  },
  {
    id: nanoid(),
    title: "Hejdå",
    price: 509,
  },
  {
    id: nanoid(),
    title: "Hejsan",
    price: 5021,
  },
  {
    id: nanoid(),
    title: "Hejååhå",
    price: 50345,
  }
]

// 22/8

// Callback-funktion och middlewear

const loggedIn = true

const authenticatior = (req,res, next) => {
  if(loggedIn) {
    next()
    return
  }

  throw new Error("You are not logged in...")

}


// router är samma som app fast för en begränsad del av ditt api...

router.get("/", [authenticatior], (req, res) => {
  res.json(products)
})

router.post("/", (req, res) => {
  if(!req.body || req.body.name || req.body.price) {
    throw new Error("Body is not set correcly!")
  }

    products.push({...req.body, ...{id: nanoid()}})
    res.json({status: "New product added"}) 

})


// Specificerar fel i vår router 
router.use((err, req, res, next) => {
  console.log(err.status)
  console.log(err.message)
  res.status(500).json(err)
})


/* const authenticatior = (req,res, next) => {
  try {
    throw new Error("You are not logged in")

  } catch(err){
    throw err
  } */
 /*  res.status(401).json("Du är inte inloggad") }*/
