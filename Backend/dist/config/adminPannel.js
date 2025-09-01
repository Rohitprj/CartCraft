"use strict";
// import AdminJS from "adminjs";
// import AdminJSExpress from "@adminjs/express";
// import session from "express-session";
// import ConnectMongoDBSession from "connect-mongodb-session";
// import * as AdminJSMongoose from "@adminjs/mongoose";
// import { COOKIE_PASSWORD } from "./config";
// import { dark, light, noSlidebar } from "@adminjs/themes";
// import Product from "../models/productSchema";
// import Category from "../models/categorySchema";
// import Order from "../models/orderSchema";
// import User from "../models/userSchems";
// import Transaction from "../models/transactionSchema";
// AdminJS.registerAdapter(AdminJSMongoose);
// const DEFAULT_ADMIN = {
//   email: "rohit@gmail.com",
//   password: "123456",
// };
// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email || password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };
// export const buildAdminJs = async (app: any) => {
//   const admin = new AdminJS({
//     resources: [
//       { resource: Product },
//       { resource: Category },
//       { resource: Order },
//       { resource: User },
//       { resource: Transaction },
//     ],
//     branding: {
//       companyName: "Cart Craft",
//       withMadeWithLove: false,
//       favicon:
//         "https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg",
//       logo: "https://i.pinimg.com/736x/c3/b3/14/c3b3146e35033a66d563dbce4e53a0b7.jpg",
//     },
//     defaultTheme: dark.id,
//     availableThemes: [dark, light, noSlidebar],
//     rootPath: "/admin",
//   });
//   const MongoDBStore = ConnectMongoDBSession(session);
//   const sessionStore = new MongoDBStore({
//     uri: process.env.MONGODB_URL,
//     collection: "session",
//   });
//   const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//     admin,
//     {
//       authenticate,
//       cookieName: "adminjs",
//       cookiePassword: COOKIE_PASSWORD,
//     },
//     null,
//     {
//       store: sessionStore,
//       resave: true,
//       saveUninitialized: true,
//       secret: COOKIE_PASSWORD,
//       cookie: {
//         httpOnly: process.env.NODE_ENV === "production",
//         secure: process.env.NODE_ENV === "production",
//       },
//       name: "adminjs",
//     }
//   );
//   app.use(admin.options.rootPath, adminRouter);
// };
// import AdminJS from "adminjs";
// import AdminJSExpress from "@adminjs/express";
// import session from "express-session";
// import ConnectMongoDBSession from "connect-mongodb-session";
// import * as AdminJSMongoose from "@adminjs/mongoose/lib";
// import { dark, light, noSidebar } from "@adminjs/themes/types";
// import { COOKIE_PASSWORD } from "./config";
// import Product from "../models/productSchema";
// import Category from "../models/categorySchema";
// import Order from "../models/orderSchema";
// import User from "../models/userSchems";
// import Transaction from "../models/transactionSchema";
// import { Express } from "express";
// // Register Mongoose adapter for AdminJS
// AdminJS.registerAdapter(AdminJSMongoose);
// // Default admin user
// const DEFAULT_ADMIN = {
//   email: "rohit@gmail.com",
//   password: "123456",
// };
// // Simple authentication logic
// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };
// // Main function to build and mount AdminJS
// export const buildAdminJs = async (app: Express) => {
//   const admin = new AdminJS({
//     resources: [
//       { resource: Product },
//       { resource: Category },
//       { resource: Order },
//       { resource: User },
//       { resource: Transaction },
//     ],
//     branding: {
//       companyName: "Cart Craft",
//       withMadeWithLove: false,
//       favicon:
//         "https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg",
//       logo: "https://i.pinimg.com/736x/c3/b3/14/c3b3146e35033a66d563dbce4e53a0b7.jpg",
//     },
//     defaultTheme: dark.id,
//     availableThemes: [dark, light, noSidebar],
//     rootPath: "/admin",
//   });
//   // ✅ Ensure MONGODB_URL is defined
//   const mongoUri = process.env.MONGODB_URL;
//   if (!mongoUri) {
//     throw new Error(
//       "❌ MONGODB_URL is not defined in the environment variables."
//     );
//   }
//   // Set up MongoDB session store
//   const MongoDBStore = ConnectMongoDBSession(session);
//   const sessionStore = new MongoDBStore({
//     uri: mongoUri,
//     collection: "session",
//   });
//   // Build the authenticated admin router
//   const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//     admin,
//     {
//       authenticate,
//       cookieName: "adminjs",
//       cookiePassword: COOKIE_PASSWORD,
//     },
//     null,
//     {
//       store: sessionStore,
//       resave: true,
//       saveUninitialized: true,
//       secret: COOKIE_PASSWORD,
//       cookie: {
//         httpOnly: process.env.NODE_ENV === "production",
//         secure: process.env.NODE_ENV === "production",
//       },
//       name: "adminjs",
//     }
//   );
//   // Mount admin router to Express app
//   app.use(admin.options.rootPath, adminRouter);
// };
// import { Express } from "express";
// import { COOKIE_PASSWORD } from "./config";
// import Product from "../models/productSchema";
// import Category from "../models/categorySchema";
// import Order from "../models/orderSchema";
// import User from "../models/userSchems";
// import Transaction from "../models/transactionSchema";
// // Default admin user
// const DEFAULT_ADMIN = {
//   email: "rohit@gmail.com",
//   password: "123456",
// };
// // Simple authentication logic
// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };
// // Main function to build and mount AdminJS
// export const buildAdminJs = async (app: Express) => {
//   // 🟡 Dynamic imports to avoid ESM export errors
//   const AdminJS = (await import("adminjs")).default;
//   const AdminJSExpress = (await import("@adminjs/express")).default;
//   const session = (await import("express-session")).default;
//   const ConnectMongoDBSession = (await import("connect-mongodb-session"))
//     .default;
//   const AdminJSMongoose = await import("@adminjs/mongoose");
//   const themes = await import("@adminjs/themes");
//   // Register Mongoose adapter for AdminJS
//   AdminJS.registerAdapter({
//     Resource: AdminJSMongoose.Resource,
//     Database: AdminJSMongoose.Database,
//   });
//   const admin = new AdminJS({
//     resources: [
//       { resource: Product },
//       { resource: Category },
//       { resource: Order },
//       { resource: User },
//       { resource: Transaction },
//     ],
//     branding: {
//       companyName: "Cart Craft",
//       withMadeWithLove: false,
//       favicon:
//         "https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg",
//       logo: "https://i.pinimg.com/736x/c3/b3/14/c3b3146e35033a66d563dbce4e53a0b7.jpg",
//     },
//     defaultTheme: themes.dark.id,
//     availableThemes: [themes.dark, themes.light, themes.noSidebar],
//     rootPath: "/admin",
//   });
//   const mongoUri = process.env.MONGODB_URL;
//   if (!mongoUri) {
//     throw new Error(
//       "❌ MONGODB_URL is not defined in the environment variables."
//     );
//   }
//   // Session store
//   const MongoDBStore = ConnectMongoDBSession(session);
//   const sessionStore = new MongoDBStore({
//     uri: mongoUri,
//     collection: "sessions",
//   });
//   const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//     admin,
//     {
//       authenticate,
//       cookieName: "adminjs",
//       cookiePassword: COOKIE_PASSWORD,
//     },
//     null,
//     {
//       store: sessionStore,
//       resave: true,
//       saveUninitialized: true,
//       secret: COOKIE_PASSWORD,
//       cookie: {
//         httpOnly: process.env.NODE_ENV === "production",
//         secure: process.env.NODE_ENV === "production",
//       },
//       name: "adminjs",
//     }
//   );
//   // Mount the AdminJS router
//   app.use(admin.options.rootPath, adminRouter);
// };
