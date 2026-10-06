const validateUser = (body) => {

    if (
        body.nama === undefined ||
        body.umur === undefined ||
        body.hobi === undefined
    ) {
        return "Nama, Umur, dan Hobi wajib diisi";
    }

    if (
        typeof body.nama !== "string" ||
        typeof body.hobi !== "string"
    ) {
        return "Nama dan Hobi harus berupa teks";
    }

    if (
        body.nama.trim() === "" ||
        body.hobi.trim() === ""
    ) {
        return "Nama dan Hobi tidak boleh kosong";
    }

    if (typeof body.umur !== "number") {
        return "Umur harus berupa angka";
    }

    if (body.umur <= 0) {
        return "Umur harus lebih dari 0";
    }

    return null;
};

module.exports = validateUser;