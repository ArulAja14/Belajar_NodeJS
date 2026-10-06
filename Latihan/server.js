const http = require("http");

const users = [
    {
        id: 1,
        nama: "Syahrul",
        umur: 24,
        hobi: "Gaming"
    },
    {
        id: 2,
        nama: "Budi",
        umur: 22,
        hobi: "Futsal"
    },
    {
        id: 3,
        nama: "Andi",
        umur: 25,
        hobi: "Membaca"
    }
];

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/get") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(`
            <h1>Form GET</h1>

            <form action="/hasil" method="GET">
                <label>Nama:</label>
                <input type="text" name="nama">

                <button type="submit">Kirim</button>
            </form>
            `);

    } else if (req.method === "GET" && req.url.startsWith("/hasil")) {
        
        const url = new URL(req.url, "http://localhost:3000");

        const nama = url.searchParams.get("nama");

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Hasil GET</h1>
            <p>Nama: ${nama}</p>
            `);

    } else if (req.method === "GET" && req.url === "/post") {
        
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Form Biodata</h1>
            <form action="/submit" method="POST">
                <label>Nama:</label>
                <input type="text" name="nama">

                <br></br>

                <label>Umur:</label>
                <input type="number" name="umur">

                <br></br>

                <label>Hobi:</label>
                <input type="text" name="hobi">

                <br></br>
                
                <label>Status:</label>
                <input type="text" name="status">

                <button type="submit">Kirim</button>
            </form>
            `);

    } else if (req.method === "POST" && req.url === "/submit") {

        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {

        const params = new URLSearchParams(data);

        const nama = params.get("nama");
        const umur = Number(params.get("umur"));
        const hobi = params.get("hobi");
        const status = params.get("status");

        const biodata = {
            nama: nama,
            umur: umur,
            hobi: hobi,
            status: status
        };

        const jsonbiodata = JSON.stringify(biodata);

        console.log(biodata);
        console.log(jsonbiodata);

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Hasil Biodata</h1>
            <p>Nama: ${biodata.nama}</p>
            <p>Hobi: ${biodata.hobi}</p>
            <p>Umur: ${biodata.umur}</p>
            <p>Status: ${biodata.status}</p>
            `);

        }); 
    } else if (req.method === "GET" && req.url === "/api/biodata") {
        
        const biodata = {
            nama: "Syahrul",
            umur: 24,
            hobi: "Gaming",
            status: "Mahasiswa"
        };

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(biodata));

    } else if (req.method === "GET" && req.url === "/api/users") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(users));

    } else if (req.method === "POST" && req.url === "/api/users") {
        let data = "";
        
        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {

            const body = JSON.parse(data);
            
            if (!body.nama || !body.umur || !body.hobi) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                return res.end(JSON.stringify({
                    message: "Nama, Umur, dan Hobi wajib diisi"
                }));
            }
            const userbaru = {
                id: users.length + 1,
                nama: body.nama,
                umur: body.umur,
                hobi: body.hobi
            };

            users.push(userbaru);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "User berhasil ditambahkan",
                data: userbaru
            }));
        });
    } else if (req.method === "PUT" && req.url.startsWith("/api/users/")) {

        const id = Number(req.url.split("/")[3]);

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            
            return res.end(JSON.stringify({
                message: "User tidak ditemukan"
            }));
        }

        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {

            const body = JSON.parse(data);

            if (!body.nama || !body.umur || !body.hobi) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                return res.end(JSON.stringify({
                    message: "Nama, Umur, dan Hobi wajib diisi"
                }));
            }
            users[index] = {
                id: id,
                nama: body.nama,
                umur: body.umur,
                hobi: body.hobi
            };
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "User berhasil diupdate",
                data: users[index]
            }));
        });
    } else if(req.method === "DELETE" && req.url.startsWith("/api/users/")) {

         const id = Number(req.url.split("/")[3]);

         const index = users.findIndex((user) => user.id === id);

         if (index === -1) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "User tidak ditemukan"
            }));
         }

         const userDihapus = users[index];

         users.splice(index, 1);

         res.writeHead(200, {
            "Content-Type": "application/json"
         });

         res.end(JSON.stringify({
            message: "User berhasil dihapus",
            data: userDihapus
         }));
    } else if (req.method === "GET" && req.url.startsWith("/api/users/")) {
        
        const id = Number(req.url.split("/")[3]);

        const user = users.find((user) => user.id === id);

        if (user) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(user));
    
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            Message: "User tidak ditemukan"
    }));
}
    } else {
        
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        
        res.end("<h1>404 - Halaman tidak ditemukan</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000")
});