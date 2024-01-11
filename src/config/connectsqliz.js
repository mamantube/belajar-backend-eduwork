import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "",
    database: "sewamobil",
    dialect: "mysql",
});

export default sequelize;