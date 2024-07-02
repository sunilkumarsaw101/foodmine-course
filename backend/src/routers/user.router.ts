import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
const router = Router();

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done!");
  })
);

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    let user = await UserModel.findOne({ email, password });
    console.log(user);
    if (user) {
      let userWithToken = generateTokenResponse(user);
      // console.log(userWithToken);
      res.send(userWithToken);
    } else {
      res.status(HTTP_BAD_REQUEST).send("Invalid credentials");
    }
  })
);

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("User already registered with this email, please login!");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      name,
      email: email.toLowerCase(),
      password: password,
      address,
      isAdmin: false,
    };

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );
  return {
    ...user.toObject(), // Convert the Mongoose document to a plain object
    token,
  };
};

export default router;
