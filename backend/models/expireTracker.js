const cron = require("node-cron");
const Product =require("../models/productsModel"  ) 
cron.schedule("*/5 * * * *", async () => {
  console.log("Running expiry check...");

  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() + 7); 
  try {
    const result = await Product.updateMany(
      { expiry_date: { $lte: thresholdDate }, is_discounted : {$ne : true} },
      [
        {
          $set: {
            price: "$discounted_price",
            is_discounted: true
          }
        }
      ]
    );
    
    console.log(`Discounted products updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("Error updating products:", error);
  }
});
