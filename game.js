"use strict"

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2', 
        choice2: '4',
        choice3: '21',
        choice4: '13',
        answer: 2,
    },
    {
        question: 'Which is the largest number?',
        choice1: '403', 
        choice2: '4600',
        choice3: '406',
        choice4: 'None of these',
        answer: 2,
    },
    {
        question: '-10+-3--4+5',
        choice1: '2', 
        choice2: '–12',
        choice3: '–4',
        choice4: '16',
        answer: 3,
    },

    {
        question: 'Jo bought a used car for $6000 and paid 15% deposit. How much did he still have to pay?',
        choice1: '$900', 
        choice2: '$5000',
        choice3: '$4500',
        choice4: '$5100',
        answer: 2,
    },
    {
        question: 'Which is the longest distance?',
        choice1: '3500cm', 
        choice2: '65.5m',
        choice3: '75000mm',
        choice4: '15.5m',
        answer: 3,
    },
    {
        question: 'If 2 fligs make a flog and 3 flogs make a flug, how many fligs in 12 flugs?',
        choice1: '72', 
        choice2: '17',
        choice3: '36',
        choice4: '34',
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avalableQuestions = [...questions]; 
    getNewQuestion();
}

getNewQuestion = () => {
    if(avalableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * avalableQuestions.length);
    currentQuestion = avalableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    avalableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choices => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => { 
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();


        }, 1000);
    });
});

incrementScore = num => {
     score += num;
     scoreText.innerText = score;

}