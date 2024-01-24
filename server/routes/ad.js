import express from "express";
import Ads from "../models/ad.js";
import { authenticateUser } from "../middlewares/index.js";
const routes = express.Router();

// /ad/create
routes.post("/create", authenticateUser, async (req, res) => {
  try {
    const { title, imgurl, description } = req.body;
    console.log("req.user", req.user);
    if (!title || !description || !imgurl) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    await Ads.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Added you Ad sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
});

routes.get("/getAds", async (req, res) => {
  try {
    const Data = await Ads.find({});
    res.json({ message: "Data Fetched", success: true, data: Data });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

routes.put("/updateAds", async (req, res) => {
  try {
    const {id, updatedTitle, updatedDescription} = req.body;
    await Ads.findOneAndUpdate({_id: id},{title: updatedTitle},{description: updatedDescription})
    res.json({ message: "Succesfully Updated", success: true});
  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});


routes.put("/updateAdsDesc", async (req, res) => {
  try {
    const {id, updatedDescription} = req.body;
    await Ads.findOneAndUpdate({_id: id},{description: updatedDescription})
    res.json({ message: "Succesfully Updated", success: true});
  } catch (error) {
    console.log("Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default routes;
