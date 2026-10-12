const db = require("../config/database");

const bcrypt = require("bcrypt");

const register = async(req, res, next) => {
    try{
        const { nama, email, password } = req.body;

        if (
            typeof nama !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            nama.trim() === "" ||
            email.trim() === "" ||
            password.length < 8
        ) {
            return res.status(400).json({
                message: "Nama dan email wajib diisi, password minimal 8 karakter"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const sql = `
            INSERT INTO accounts (nama, email, password_hash)
            VALUES (?, ?, ?)
            `;

        const [results] = await db.query(sql, [
            nama.trim(),
            email.trim(),
            passwordHash
        ]);

        res.status(201).json({
            message: "Registrasi berhasil",
            data: {
                id: results.insertId,
                nama: nama.trim(),
                email: email.trim()
            }
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email sudah terdaftar"
            });
        }

        next(error);
    }
};

module.exports = { register };