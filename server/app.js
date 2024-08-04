const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const comments = [
    { id: 1, comment: '멋진 사진입니다.', author: '박문수' },
    { id: 2, comment: '좋아요^^ 퍼가요~', author: '일지매' }
];

let commentIdSeq = 3;

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const newComment = {
        id: commentIdSeq++,
        comment: req.body.comment,
        author: req.body.author
    };
    comments.push(newComment);
    res.send(comments);
});

app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = comments.findIndex(c => c.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
    }
    res.send(comments);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get('port')}`);
});