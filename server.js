const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { title } = require('process');
const { error } = require('console');

const app = express();
const PORT = 3000;

const dataFilePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());

const readData = ()=>{
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data || '[]');
};
const writeData = (data)=>{
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.post("/books", (req, res)=>{
    const { book_id,title, author, genre, year, copies} = req.body;
    if(!book_id || !title || !author || !genre || !year || !copies){
        return res.status(400).json({error: 'All fields are required'});
    }
    const books = readData();
    const newBook = {book_id, title, author, genre, year, copies};
    books.push(newBook);
    writeData(books);
    res.status(201).json(newBook);
});
app.get('/books', (req, res)=>{
    const books = readData();
    res.status(200).json(books);
});
app.get('/books/:id', (req,res)=>{
    const {id} = req.params;
    const books = readData();
    const book = books.find((book)=> nook.book_id===id);
    if(!book){
        return res.status(404).json({error: "Book not found"});
    }
    res.status(200).json(book);
});
app.put('/books/:id', (req, res)=>{
    const {id} = req.params;
    const updatedData = req.body;
    const books = readData();
    const bookIndex = books.findIndex((boo)=> book.book_id===id);
    if(bookIndex === -1){
        return res.status(404).json({error: "Book not found"});
    }
    books[bookIndex]={ ...books[bookIndex], ...updatedData};
    writeData(books);
    res.status(200).json(books[bookIndex]);
});
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

