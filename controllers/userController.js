const db = require("../config/database");

const validateUser = require("../validators/userValidator");

const getAllUsers = async (req, res, next) => {
    
    try {
    const sql = "SELECT * FROM users";
    
    const [results] = await db.query(sql);

    res.status(200).json(results);
    
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
    const id = req.params.id;

    const sql = "SELECT * FROM users WHERE id = ?";

    const[results] = await db.query(sql, [id]);

    if (results.length === 0) {
        return res.status(404).json({
            message: "User tidak ditemukan"
        });
    }

    res.status(200).json(results[0]);

} catch (error) {
    next(error);
}
};

const createUser = async (req, res, next) => {
    try {
        const body = req.body;

        const errorValidasi = validateUser(body);

        if(errorValidasi) {
            return res.status(400).json ({
                message: errorValidasi
            });
        }

        const sql = `
            INSERT INTO users (nama, umur, hobi)
            VALUES (?, ?, ?)
            `;
        
        const [results] = await db.query(
            sql,
            [body.nama, body.umur, body.hobi]
        );

        res.status(201).json({
            message: "User berhasil ditambahkan",
            data: {
                id: results.insertId,
                nama: body.nama,
                umur: body.umur,
                hobi: body.hobi
            }
        });
    } catch (error) {
        next(error);
        }
};

const updateUser = async (req, res, next) => {
    try {
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

    const [results] = await db.query(
        sql,
        [body.nama, body.umur, body.hobi, id],
    );

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
} catch (error) {
    next(error);
}
};

const deleteUser = async (req, res, next) => {
    try {
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE id = ?";

    const [results] = await db.query(sql, [id]);

    if(results.affectedRows === 0) {
        return res.status(404).json({
            message: "User tidak ditemukan"
        });
    }

    res.status(200).json({
        message: "User berhasil dihapus"
    });
    
} catch (error) {
    next(error);
}
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};