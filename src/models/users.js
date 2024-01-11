import connection from "../config/connections.js";

export function modelAllData() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM users", (err, result) => {
                if (err) {
                    reject(new Error(err))
                }

                resolve(result);
            }
        )
    })
};

export function modelDetail (id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM users WHERE  id=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else resolve(result);
            }
        )
    })
};

export function modelCreate(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO users SET ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else resolve(result);
            }
        )
    })
}

export function modelUpdate(id, data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE users SET ? WHERE id=${id}`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else resolve(result);
            }
        )
    })
}


