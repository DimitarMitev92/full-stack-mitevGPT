import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserChats from "./models/userChar.js";
import Chat from "./models/chat.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// app.get("/api/test", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;
//   console.log(userId);
//   res.send("Success");
// });

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChats.find({ userId });

    // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
            createdAt: Date.now(),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        {
          userId,
        },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating chat!");
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChats = await UserChats.find({ userId });
    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting user chats!");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthorized!");
});

app.listen(PORT, () => {
  connect();
  console.log(`Listening on port ${PORT}`);
});
