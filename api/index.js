const express = require('express');
const app = express();
const http = require("http");
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const Column = require('./models/Column');
const Card = require('./models/Card');
const Comment = require('./models/Comment');
const createDefaultColumns = async () => {
    const defaultColumns = ['Que se hizo bien', 'Para mejorar', 'Accionables'];
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
        const columns = await Column.find().populate('cards');
        res.json(columns);
    } catch (err){
        console.error(err);
        res.status(500).send('Failed');
    }
});
// CARDS
app.get('/cards', async (req, res) => {
    const cards = await Card.find();

    res.json(cards);
});
app.post('/card/new', async (req, res) => {
    console.log(req.body)
    try{
        const { text, columnId } = req.body;
        const column = await Column.findById(columnId);
        if (!column) {
            return res.status(404).json({ message: 'Columna no encontrada' });
        }
        const newCard = new Card({
            text,
            column: column._id,  // Establecer la referencia a la columna
        });
        await newCard.save();
        column.cards.push(newCard._id);
        await column.save();
        res.json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la tarjeta' });
    }
});
app.delete('/card/delete/:id', async (req, res) => {
    const result = await Card.findByIdAndDelete(req.params.id);
    res.json(result);
});
app.put('/card/edit/:id', async (req, res) => {
    const { text, column} = req.body;
    const card = await Card.findById(req.params.id);
    card.text = text;
    card.column = column;
    card.save();
    res.json(card);
})

//COMMENTS
app.post('/card/comment', async (req, res) => {
    try{
        const { text, cardId } = req.body;
        const card = await Card.findById(cardId);
        console.log('card', card)
        if (!card) {
            return res.status(404).json({ message: 'Tarjeta no encontrada' });
        }

        const newComment = new Comment({
            text
        })
        card.comments.push(newComment);
        await card.save();

        res.json(newComment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la comentario' });
    }
});
app.delete('/card/:cardId/comment/:commentId', async (req, res) => {
    try {
        const { cardId, commentId } = req.params;

        const card = await Card.findById(cardId);
        if (!card) {
            return res.status(404).json({ message: 'Tarjeta no encontrada' });
        }

        const commentIndex = card.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }
        
        card.comments.splice(commentIndex, 1);
        await card.save();

        res.json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el comentario' });
    }
});