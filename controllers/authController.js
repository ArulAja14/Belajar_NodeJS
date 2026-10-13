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
    }catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email sudah terdaftar"
            });
        }
        next(error);
    }
};

    const login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (
                typeof email !== "string" ||
                typeof password !== "string" ||
                email.trim() === "" ||
                password === ""
            ) {
                return res.status(400).json({
                    message: "Email dan password wajib diisi"
                });
            }

            const sql = "SELECT * FROM accounts WHERE email = ?";
            
            const [results] = await db.query(sql, [email.trim()]);

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Email atau password salah"
                });
            }

            const account = results[0];

            const cocok = await bcrypt.compare(
                password,
                account.password_hash
            );

            if (!cocok) {
                return res.status(401).json({
                    message: "Email atau password salah"
                });
            }

            res.status(200).json({
                message: "Login berhasil",
                data: {
                    id: account.id,
                    nama: account.nama,
                    email: account.email,
                    role: account.role
                }
            });
            
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };