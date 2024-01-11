import { 
    modelAllData, 
    modelDetail, 
    modelCreate,
    updateData } from "../models/users.js";
import message from "../utils/message.js";

/**
 * @typedef {import("express").Request} ExpressRequest 
 * @typedef {import("express").Response} ExpressResponse 
 */

/**
 * 
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */

export function allData (req, res) {
    modelAllData()
    .then((response) => {
        message(res, 200, "All data", response);
    }).catch((error) => {
        message(res, 500, error.message || "Server internal error");
    });
} 

/**
 * 
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */

export async function detailData(req, res) {
    try {
        const id = req.params.id;
        const detail = await modelDetail(id);

        message(res, 200, "Detail data", detail);
        
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
}

/**
 * 
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */

export async function createData(req, res) {
    try {
        const data = req.body;

        await modelCreate(data);

        message(res, 201, "New data added");
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
}
/**
 * 
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 */

export async function updateData(req, res) {
    try {
        const data = req.body;
        const id = req.params.id;

        // await modelCreate(data);

        message(res, 201, "Update Success", id, data);
    } catch (error) {
        message(res, 500, error.message || "Server internal error");
    }
}