import User from "../models/UserModel.js";

// update user cartData : /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
