const bcrypt = require("bcrypt");

const belajarHash = async () => {
    try{
        const password = "BelajarNode123!";

        const hash = await bcrypt.hash(password, 12);

        console.log("Password asli:", password);
        console.log("Password hash:", hash);

        const cocok = await bcrypt.compare(password, hash);

        console.log("Password cocok:", cocok);
    } catch (error) {
        console.error("Terjadi error:", error.message);
    }
};

belajarHash();