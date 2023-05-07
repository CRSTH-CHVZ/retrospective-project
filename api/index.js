const express = require('express');
const app = express();
const http = require("http");
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
// models
const {Column, Card} = require('./models/Model')
const createDefaultColumns = async () => {
    const defaultColumns = ['Que hizo bien', 'Para mejorar', 'Kudos'];
    //validamos si existen las columnas del kanban, en caso contrario se crean
    for (const title of defaultColumns) {
        const existingColumn = await Column.findOne({ title });
        if (!existingColumn) {
            const newColumn = new Column({ title });
            await newColumn.save();
        }
    }
};
mongoose.connect('mongodb://127.0.0.1:27017/retrospective-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
        .then(() => {
            console.log("Connected to MongoDB");
            createDefaultColumns();
        })
        .catch(console.error);
const io = new Server( server, {
    cors: {
        origin: "http://localhost:3000",
        // origin: "http://127.0.0.1:3000/",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
io.on("connection",
    (socket) => {
    console.log(`User connected: ${ socket.id }`)

        socket.on("send_message", ( data ) => {
            console.log(data)
            socket.broadcast.emit("receive_message", data)
        })
    });
server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})
// COLUMNS
app.get('/columns', async (req, res) => {
    try {
        const columns = await Column.find();
        res.json(columns);
    } catch (err){
        console.error(err);
        res.status(200).send('Failed');
    }
});
// CARDS
app.get('/cards', async (req, res) => {
    const cards = await Card.find();

    res.json(cards);
});
app.post('/card/new', (req, res) => {
    console.log(req.body)
    const card = new Card({
        text: req.body?.text,
        column: req.body?.column,
        isLike: req.body?.isLike

    })
    card.save();
    res.json(card);
});