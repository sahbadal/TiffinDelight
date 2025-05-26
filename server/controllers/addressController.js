import Address from "../models/AddressModel.js";
//add address: /api/address/add

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.userId;
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }
    await Address.create({ ...address, userId });
    res.status(201).json({
      success: true,
      message: "Address Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get address: /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await Address.find({ userId });
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
