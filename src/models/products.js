import sequelize from "../config/connectsqliz.js";
import { DataTypes } from "sequelize";

const ModelProducts = sequelize.define("Products", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
},
{
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at",
});

export default ModelProducts;