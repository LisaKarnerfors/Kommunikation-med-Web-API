/* Async/Await gör det lättare att skriva löften . Nyckelordet 'async' före en funktion gör att funktionen alltid returnerar ett löfte. Och nyckelordet await används i async-funktioner, vilket gör att programmet väntar tills löftet löser sig. */

/* async function onLoad() {
 
} */

const getProducts = async (event) => {

    try {
        // Fetch-anrop GET
        const response = await fetch("http://localhost:3000/products")
        const data = await response.json()
        console.log(data)

    } catch(err) {
        console.error(err)
    }
}

const addProducts = async (event) => {
    
    try {
        // Skapar objektet som ska sparas
        const newProduct = {
            productName: "Moonlight Glow Eyeshadow",
            brandName: "Chanel"
        }

        // Fetch-anrop POST
        const response = await fetch("http://localhost:3000/products", {
            method: "POST", 
            headers: { "Content-Type": "application/json"}, 
            body: JSON.stringify(newProduct)

        }) // POST måste vi alltid definera att det är Post
        
        const data = await response.json()
            console.log(data)

        } catch(err) {
            console.error(err)
        }
    }

    
document.getElementById("collectBtn").addEventListener("click", getProducts)
document.getElementById("addBtn").addEventListener("click", addProducts)



// Rendera ut på sidan
/* async function renderData() {

    
} */


/* window.addEventListener('load', onLoad) */