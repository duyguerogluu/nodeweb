const express = require('express');
const router = express.Router();
const db = require("../data/db");


router.use("/product/:id", async function (req, res) {
    try{
     const [product] = await db.execute("select * from products where id=?" + [req.params.id]);
     res.render("product-details", {
         urun: product[0],
       });
    }catch(err){
     console.log(err);
    }
 
 });
 
 router.use("/product", async function (req, res) {
     try {
         const [products] = await db.execute("select * from products where isActive=1");
         res.render("product", {
           urunler: products,
         });
       } catch (err) {
         console.log(err);
       }
 });
 
 router.use("/", async function (req, res) {
   try {
     const [products] = await db.execute("select * from products where isHome=1 and isActive=1");
     res.render("index", {
       urunler: products,
     });
   } catch (err) {
     console.log(err);
   }
 });
 

 module.exports = router;