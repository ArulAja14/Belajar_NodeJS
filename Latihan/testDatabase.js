const db = require("../config/database");

const testDatabase = async () => {
    try {
        const [results] = await db.query(
            "SELECT * FROM users"
        );

        console.log ("Berhasil mengambil data MySQL:");
        console.log (results);
    } catch(error) {
        console.log ("Gagal mengambil data:", error.message);
    } finally {
        await db.end();
    }
};

testDatabase();