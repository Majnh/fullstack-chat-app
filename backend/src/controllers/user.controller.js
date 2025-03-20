import User from "../models/user.model.js";
import { FileStorage } from "../lib/cloudinary.js";

export const updateProfileImage = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "ProfilePic is required " });
    }

    const uploadResponse = await FileStorage.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    console.log("Error in update controller", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
