import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
const PORT = 3000;

app.get("/", (req, res) => {
    res.render("index");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    socket.on("chat", (payload) => {
        console.log("Chat recieved: " + JSON.stringify(payload));
        io.emit("chat", payload);
    });
});

httpServer.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}/`)
);
