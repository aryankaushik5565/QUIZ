const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const quiz = [
    {
        question: 'What is the capital of India?',
        options: ['Mumbai', 'Chandigarh', 'Kolkata', 'Delhi'],
        answer: 'Delhi'
    },
    {
        question: 'Which planet is known as the "Red Planet"?',
        options: ['Earth', 'Mars', 'Jupiter', 'Neptune'],
        answer: 'Mars'
    },
    {
        question: 'What is the largest mammal in the world?',
        options: ['Lion', 'Hippo', 'Blue Whale', 'Komodo Dragon'],
        answer: 'Blue Whale'
    },
    {
        question: 'How many continents are there in the world?',
        options: ['6', '7', '8', '9'],
        answer: '7'
    },
    {
        question: 'What is the largest ocean on Earth?',
        options: ['Indian', 'Arctic', 'Pacific', 'Atlantic'],
        answer: 'Pacific'
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        options: ['Robert Frost', 'Anne Frank', 'William Shakespeare', 'Ruskin Bond'],
        answer: 'William Shakespeare'
    },
    {
        question: 'What is the capital of Japan?',
        options: ['Tokyo', 'Kyoto', 'Shibuya', 'Hokkaido'],
        answer: 'Tokyo'
    },
    {
        question: 'What is the tallest mountain in the world?',
        options: ['Mount Everest', 'K2', 'Mount Abu', 'Mount Fuji'],
        answer: 'Mount Everest'
    },
    {
        question: 'What is the largest animal on Earth?',
        options: ['Giraffe', 'Cow', 'Blue Whale', 'Deer'],
        answer: 'Blue Whale'
    },
    {
        question: 'What is the national flower of Japan?',
        options: ['Cherry Blossom', 'Sunflower', 'Rose', 'Lily'],
        answer: 'Cherry Blossom'
    }
];

let playerName = "";
let score = 0; // Initialize score variable

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Quiz Game</title>
        </head>
        <body>
            <h1>Welcome to Quiz Game!</h1>
            <form action="/quiz" method="post">
                <label for="name">Enter your name:</label><br>
                <input type="text" id="name" name="name"><br>
                <input type="submit" value="Start Quiz">
            </form>
        </body>
        </html>
    `);
});

app.post('/quiz', (req, res) => {
    playerName = req.body.name;
    score = 0; // Reset score when starting a new quiz
    res.redirect('/question/0');
});

app.get('/question/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index < quiz.length) {
        res.send(`
            <html>
            <head>
                <title>Quiz Question</title>
            </head>
            <body>
                <h2>${quiz[index].question}</h2>
                <form action="/answer" method="post">
                    <input type="hidden" name="index" value="${index}">
                    ${quiz[index].options.map((option, i) => `
                        <input type="radio" id="option${i}" name="answer" value="${option}">
                        <label for="option${i}">${option}</label><br>
                    `).join('')}
                    <input type="submit" value="Submit">
                </form>
            </body>
            </html>
        `);
    } else {
        res.send(`<h2>Quiz completed!</h2><p>Thank you for playing, ${playerName}! Your total score is ${score}.</p>`);
    }
});

app.post('/answer', (req, res) => {
    const index = parseInt(req.body.index);
    const answer = req.body.answer;
    const correctAnswer = quiz[index].answer;
    
    if (answer === correctAnswer) {
        score++; // Increment score for correct answer
    }

    res.send(`
        <html>
        <head>
            <title>Answer Result</title>
        </head>
        <body>
            <h2>${answer === correctAnswer ? 'Correct!' : 'Incorrect!'}</h2>
            <p><a href="/question/${index + 1}">Next Question</a></p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Quiz app listening at http://localhost:${port}`);
});
