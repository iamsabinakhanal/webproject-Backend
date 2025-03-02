import express from "express";
import sequelize from "./config/db.js";
import accessoriesRoutes from "./routes/accessoriesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS for views
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use("/", accessoriesRoutes);
app.use("/admin", adminRoutes);

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});