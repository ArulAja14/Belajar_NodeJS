const db = require("../config/database");

const validateUser = require("../validators/userValidator");

const getAllUsers = (req, res) => {
    
    const sql = "Select * FROM users";

    db.query(sql,(error, results) => {

        if(error) {
            return res.status(500).json({
                message: "Gagal mengambil data user",
                error: "error"
            });
        }

        res.status(200).json(results);
    });
};

const getUserById = (req, res) => {
    
    const id = req.params.id;

    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (error, results) => {

        if (error){
            return res.status(500).json({
                message: "Gagal mengambil data user",
                error: "error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        res.status(200).json(results[0]);

    });
};

const createUser = (req, res) => {
    
    const body = req.body;
    const errorValidasi = validateUser(body);

    if (errorValidasi) {
        return res.status(400).json({
            message: errorValidasi
        });
    }

    const sql = `
        INSERT INTO users (nama, umur, hobi)
        VALUES (?, ?, ?)
        `;
    db.query(
        sql,
        [body.nama, body.umur, body.hobi],
        (error, results) => {

            if(error) {
                return res.status(500).json({
                    message: "Gagal menambahkan user",
                    error: error
                });
            }

            res.status(201).json({
                message: "User berhasil ditambahkan",
                data: {
                    id: results.insertId,
                    nama: body.nama,
                    umur: body.umur,
                    hobi: body.hobi
                }
            });
        }
    );
};

const updateUser = (req, res) => {

    const id = req.params.id;
    const body = req.body;
    const errorValidasi = validateUser(body);

    if (errorValidasi) {
        return res.status(400).json({
            message: errorValidasi
        });
    }

    const sql = `
    UPDATE users
    SET nama = ?, umur = ?, hobi = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [body.nama, body.umur, body.hobi, id],
        (error, results) => {

            if(error) {
                return res.status(500).json({
                    message: "Gagal mengupdate user",
                    error: error
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "User tidak ditemukan"
                });
            }

            res.status(200).json({
                message: "User berhasil diupdate",
                data: {
                    id: Number(id),
                    nama: body.nama,
                    umur: body.umur,
                    hobi: body.hobi
                }
            });
        }
    );
};

const deleteUser = (req, res) => {
    
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (error, results) => {

        if(error) {
            return res.status(500).json({
                message: "Gagal menghapus user",
                error: error
            });
        }

        if(results.affectedRows === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "User berhasil dihapus"
        });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};