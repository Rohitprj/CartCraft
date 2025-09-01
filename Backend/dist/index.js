"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const category_1 = __importDefault(require("./routes/category"));
const product_1 = __importDefault(require("./routes/product"));
const order_1 = __importDefault(require("./routes/order"));
const connect_1 = __importDefault(require("./config/connect"));
const config_1 = require("./config/config");
// import { buildAdminJs } from "./config/adminPannel";
dotenv_1.default.config();
const app = (0, express_1.default)();
// const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
(0, connect_1.default)(process.env.MONGODB_URL);
// Admin Pannel
// buildAdminJs(app);
// Routes
app.use("/user", user_1.default);
app.use("/category", category_1.default);
app.use("/product", product_1.default);
app.use("/order", order_1.default);
app.get("/", (req, res) => {
  res.send("Hello from Express + JavaScript Server");
});
app.listen(config_1.PORT, () => {
  console.log(`Server running at http://localhost:${config_1.PORT}`);
  console.log(
    `Admin Pannel running at http://localhost:${config_1.PORT}/admin`
  );
});
