import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import connectDB from "./config/connect";
import { PORT } from "./config/config";
// import { buildAdminJs } from "./config/adminPannel";

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 8000;

app.use(express.json());
connectDB(process.env.MONGODB_URL);

// Admin Pannel
// buildAdminJs(app);

// Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin Pannel running at http://localhost:${PORT}/admin`);
});
