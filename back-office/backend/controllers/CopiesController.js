const redis = require("../config/redis");


async function startScan(req, res) {
 try {

  const device_id = req.body.device_id;
  const book_id = parseInt(req.body.book_id);
  await redis.set(`device:${device_id}:book`, book_id);
  await redis.expire(`device:${device_id}:book`, 600);
  res.status(200).json({message:"You can start scanning"});
 }
 catch (error) {
  console.log(error)
  res.status(500).json({message:"Server error", error:error});
 }
}

module.exports ={startScan};