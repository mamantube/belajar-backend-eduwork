import ModelProducts from "../models/products.js";
import message from "../utils/message.js";
import { Op } from "sequelize";

/**
 * @typedef {import("express").Request} ExpressRequest
 * @typedef {import("express").Response} ExpressResponse
 */

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export async function createProduct(req, res) {
    try {
        const data = req.body;
        const result = await ModelProducts.create(data);
    
        message(res, 201, "New product has been created", result)
    } catch (error) {
        message(res, 500, error.message || "Server internal error")
    }
}

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export async function listData(req, res){
    try {
        const q = req.query.q;
        const sort_by = req.query.sort_by ? req.query.sort_by : "ASC";
        const page = req.query.page ? Number(req.query.page) : 1;
        const per_page = req.query.per_page ? Number(req.query.per_page) : 10;
        const offset = page === 1 ? 0 : (page -1) * per_page;
        const total = await ModelProducts.count(
        //jika hanya ingin menampilkan jumlah data hanya data yang dicari
        // {
        //     where: {
        //      name: {
        //          [Op.substring]: q,
        //      }
        //     },
        //     order: [["name", sort_by]]
        //  }
         );
        
        const pagination = {
            page,
            per_page,
            total_page: Math.ceil(total / per_page),
            total_data: total,
        } 

        const result = await ModelProducts.findAll(
        {
           where: {
            name: {
                [Op.substring]: q,
            }
           },
           order: [["name", sort_by]],
           offset: offset,
           limit: per_page
        });
        message(res, 200, "All data", result, pagination )
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
}

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export async function detailData (req, res) {
    try {
        const id = req.params.id;

        const detail = await ModelProducts.findOne({
            where: {
                id,
            }
        })

        if (!detail) return message(res, 404, "Data tidak ditemukan")

        message(res, 200, "Detail Data", detail)
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
};

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export async function updateData (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        await ModelProducts.update(data, {
            where: {
                id,
            }
        });

        message(res, 200, "Update data success")
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
};

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export async function restoreData (req, res) {
    try {
        const id = req.params.id;

        const result = await ModelProducts.restore({
            where: {
                id,
            }
        });

        message(res, 200, "Restore data success", result)
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
};

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export async function softDelete (req, res) {
    try {
        const id = req.params.id;

        await ModelProducts.destroy({
            where: {
                id,
            }
        });

        message(res, 200, "Remove data success");
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
};

export async function hardDelete (req, res) {
    try {
        const id = req.params.id;

        await ModelProducts.destroy({
            where: {
                id,
            },
            force: true
        })

        message(res, 200, "Delete data success");
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
}