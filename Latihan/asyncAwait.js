const ambilDataUser = (berhasil) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (berhasil){
                resolve("Data user berhasil diambil");
            } else {
                reject("Gagal mengambil data user");
            }
        }, 2000);
    });
};

const jalankanProgram = async () => {
    try {
        console.log("Sedang mengambil data user...");

        const hasil = await ambilDataUser(false);

        console.log(hasil);
    } catch (error) {
        console.log("Error:", error);
    }

    console.log("Program selesai");
};

jalankanProgram();