// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/gamepasses/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const url = `https://catalog.roblox.com/v2/search/items/details?CreatorName=${username}&Limit=30&AssetTypes=34`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gamepasses" });
  }
});

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
});
