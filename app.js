const express = require("express");
const path = require("path");
const app = express();


app.use(express.static(path.join(__dirname, "public-flutter")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public-flutter/index.html"));
});

const port = 3000; // Choose a suitable port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});