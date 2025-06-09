const express = require("express");
const router = express.Router();
const LoginAdmin = require("../models/adminModel");
const Product = require("../models/productsModel");
const RegisterData = require("../models/orgModel");
const DonationScheme = require("../models/donationModel");
const UserData = require("../models/userModel");
const BuyData = require("../models/buyModel")

router.get("/", (req, res) => {
  res.send("Welcome to Api")
})


router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await LoginAdmin.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const newUser = new LoginAdmin({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await LoginAdmin.findOne({ email: email })

    if (user && (user.password === password)) {

      res.json({ message: "1", admin: user })

    }
    else {
      res.json({ message: "Invalid email or password" })
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })

  }
})



router.post('/add-products', async (req, res) => {
  try {
    const { name, category, price, discounted_price, expiry_date } = req.body;
    const product = new Product({ name, category, price, discounted_price, expiry_date });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/view-products', async (req, res) => {
  try {
    const products = await Product.find({
      $expr: {
        $gt: [
          {
            $dateDiff: {
              startDate: new Date(),
              endDate: '$expiry_date',
              unit: 'day'
            }
          },
          7
        ]
      }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/product-sale", async (req, res) => {

  try {
    const products = await Product.find({ is_discounted: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post("/org-register", async (req, res) => {
  try {
    const { name, type, email, password } = req.body;
    const existingEmail = await RegisterData.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new RegisterData({ orgname: name, orgtype: type, email: email, password: password });
    await newUser.save();
    res.status(201).json({ message: "1" });
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})



router.post("/org-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterData.findOne({ email: email })

    if (user && (user.password === password)) {

      res.json({ message: "1", org: user })

    }
    else {
      res.json({ message: "Invalid email or password" })
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })

  }
})

router.post("/fetch-name", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await RegisterData.findOne({ email: email });
    res.json({ user })
  }
  catch(err){
    throw err
  }
  }
  )

  router.post("/donate-product", async (req, res) => {
    try{
      const {name, category, foodProductName, expiryDate} = req.body;
      
      const donation = new DonationScheme({name, category, foodProductName, expiryDate});
      await donation.save();
      res.json({message:"1"})
      
    }catch(error){
      res.status(500).json({message: error.message})
    }
  })

  router.post("/fetch-donate", async (req, res) => {
    try{
      const {name} = req.body;
      const products = await DonationScheme.find({name: name});
      res.json({products:products});
    }
      catch(error){
        res.status(500).json({message: error.message})
      }})


router.get("/fetch-stats", async (req, res) => {
  try{
    const donationcount = await DonationScheme.countDocuments();
    const productcount = await Product.countDocuments();
    const saleproductcount = await Product.countDocuments({is_discounted: true});
    res.json({donationcount, productcount, saleproductcount});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.post("/user-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserData.findOne({ email: email })

    if (user && (user.password === password)) {

      res.json({ message: "1", user: user })

    }
    else {
      res.json({ message: "Invalid email or password" })
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })

  }
})

router.post("/user-register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingEmail = await UserData.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new UserData({ name: name, email: email, password: password });
    await newUser.save();
    res.status(201).json({ message: "1" });
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/saleproduct-fetch", async (req,res)=>{
  try{
    const products = await Product.find({ is_discounted: true });
    res.status(200).json(products);
  }catch(error){
    res.json({error:error})
  }
})


router.post("/buy-product", async(req,res)=>{
  try{
    const {pid, uemail} = req.body;

    const product = await Product.find({_id: pid})
    
    const  newbuy = await BuyData({uemail:uemail, name: product[0].name, category: product[0].category, price: product[0].price, expiry_date: product[0].expiry_date})
    await newbuy.save()
    await Product.deleteOne({_id:pid})
    res.json({message:"1", buy:newbuy})

  }
  catch(error){
    res.json(error)
  }
})

router.post("/buy-fetch", async(req,res)=>{
  try{
    const {useremail} = req.body;
    const buyproduct = await BuyData.find({uemail:useremail})
    res.json({message:"1", buyproduct:buyproduct})
  }
  catch(error){
    res.json(error)
  }
})

module.exports = router;  

