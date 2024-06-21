import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get("/updates", (req, res) => {
    res.json({ update: "New updates coming soon..."});
});

app.get("/icons", (req, res) => {
    res.sendFile(__dirname+"/public/icons.html")
});

app.get("/music", (req, res) => {
    res.sendFile(__dirname + "/public/music.html");
});

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + "/public/404.html")
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
