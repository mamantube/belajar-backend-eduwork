import express from "express";
import cors from "cors";
// import userRoutes from "./src/routes/users.js"
import productRoutes from "./src/routes/products.js"
import connectsqliz from "./src/config/connectsqliz.js"
import sequelize from "./src/config/connectsqliz.js";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false, limit: "5mb" }))
app.use(express.json({ limit: "5mb"}));

try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); //untuk sinkronasi
    console.log("Connections has been established successfully");
} catch (error) {
    console.error("Unable to connect to the database", error);
}

// app.get("/", (req, res) => {
//     res.send("hello home")
// });
// app.use("/api/v1", userRoutes);

app.use("/api/v2", productRoutes);

app.listen(3000, () => console.log("app running on port http://localhost:3000"));