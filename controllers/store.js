const Store = require("../models/Store");

// Get
exports.getStore = async (req, res, next) => {
  try {
    const stores = await Store.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server",
    });
  }
};

// Add
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    return res.status(200).json({
      success: true,
      data: store,
    });
  } catch (error) {
    if (error.status === 1100) {
      return res.status(400).json({
        error: "User with this credentials already exist",
      });
    }
    console.error(error);
    res.status(400).json({ error: "Server error" });
  }
};
