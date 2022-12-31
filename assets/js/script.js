// #start div elements
var startDiv = document.querySelector("#start");
var startBtn = document.querySelector("#start-quiz");

// #questions div elements
var questionsDiv = document.querySelector("#questions");
var questionNumberEl = document.querySelector("#question-number");
var questionTextEl = document.querySelector("#question");

var answerBtnDiv = document.querySelector("#answer-buttons");
var firstBtn = document.querySelector("#first-option");
var secondBtn = document.querySelector("#second-option");
var thirdBtn = document.querySelector("#third-option");

var nextBtn = document.querySelector("#next-question");
var nextDiv = document.querySelector("#next-div");

// #complete div elements
var completeDiv = document.querySelector("#complete");
var completeMsg = document.querySelector("#complete-msg");
var userScoreEl = document.querySelector("#user-score");
var userScoreMsgEl = document.querySelector("#user-score-msg");
var inputMessageEl = document.querySelector("#input-message");
var retakeBtn = document.querySelector("#retake");

// #highscores div elements
var submitBtn = document.querySelector("#submit-highscore");
var returnBtn = document.querySelector("#go-to-start");

// global variables for use in functions
var questionCounter = 30;
var userScore = 0; 
var questionDuration = 10;
var defaultTimeLeft = questionCounter*questionDuration;
var timeLeft = defaultTimeLeft;
var flag = ""
// countdown element 
var countdownEl = document.querySelector("#countdown");

// parse seconds to min and second string
function parseTime(x) {
    var x_min = String(Math.floor(x/60));
    var x_sec = String(x%60);
    if (x_min=="20")
        str = x_min + "min ";
    else if (x_min=="0")
        str = x_sec + "s";
    else
        str = x_min + "min " + x_sec + "s";
    return str
}

// countdown begins when start button is clicked (event listener at line 302)
function countdown() {
    var timerVar = setInterval(function() {
        if (timeLeft < 0) {
            clearInterval(timerVar);
            countdownEl.innerHTML = 0;
            completeMsg.textContent = "Vrijeme isteklo!"

            userScoreEl.textContent = userScore + " od " + 30 + " bodova";
            if (userScore <= 3) {
                userScoreMsgEl.textContent = "... Kako?";
            } else if (userScore > 3 && userScore <= 5) {
                userScoreMsgEl.textContent = "... Više sreće drugi put!";
            } else if (userScore > 5 && userScore <= 7) {
                userScoreMsgEl.textContent = "... Priznaj, koliko se pitanja pogađalo?";
            } else if (userScore > 7 && userScore <= 9) {
                userScoreMsgEl.textContent = "... Možeš ti to i bolje.";
            } else if (userScore > 9 && userScore <= 11) {
                userScoreMsgEl.textContent = ", Not Great Not Terrible.";
            } else if (userScore > 11 && userScore <= 13) {
                userScoreMsgEl.textContent = ", Bravo!";
            } else if (userScore > 13 && userScore <= 15) {
                userScoreMsgEl.textContent = ", Dobro poznaješ opće znanje!";
            } else if (userScore > 15 && userScore <= 17) {
                userScoreMsgEl.textContent = ", Odlično poznaješ opće znanje!";
            } else if (userScore > 17 && userScore <= 19) {
                userScoreMsgEl.textContent = ", Wow, impresivno!";
            } else {
                userScoreMsgEl.textContent = "... TKO SI TI!?";
            }

            questionsDiv.setAttribute("class", "hide");
            completeDiv.setAttribute("class", "show");
            
            currentIndex = 0;
            timeLeft = defaultTimeLeft;
        } else if (completeDiv.className === "show") {
            clearInterval(timerVar);
        } else {
            countdownEl.innerHTML = parseTime(timeLeft);
        }
        timeLeft--;
    }, 1000);
}

// question array index number generator for question 1
var answeredQuestions = [];

// show question 1 when start button is clicked (event listener at line 303) 
function showQuestions(event) {
    event.preventDefault();
    changeQuestions(event)
    startDiv.setAttribute("class", "hide");
    questionsDiv.setAttribute("class", "show");
}

// question array index number generator for rest of questions
var currentIndex = 0;
var currentQuestion = questionArr[currentIndex];

// increment score or deduct time when an answer button is clicked (event listener at line 304)
function scoreIncrement(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.matches("button")) {
        if (currentIndex == 0 && event.target.matches(startQuestion.correctAnswer) === true) {
            userScore++;
            flag = "True";

        } else if (currentIndex == 0 && event.target.matches(startQuestion.correctAnswer) === false){
            timeLeft -= 0;
            flag = "False";

            setTimeout(function() {
            }, 1000)
        } else if (event.target.matches(currentQuestion.correctAnswer) === true) {
            userScore++;
            flag = "True";

        } else {
            timeLeft -= 0;
            flag = "False";

            setTimeout(function() {
            }, 1000)
        }

        firstBtn.setAttribute("disabled", "disabled");
        secondBtn.setAttribute("disabled", "disabled");
        thirdBtn.setAttribute("disabled", "disabled");

        nextBtn.click()
    } 
}

// change questions when next button is clicked (event listener at line 305)
function changeQuestions(event) {
    event.preventDefault();
    event.stopPropagation();

    firstBtn.setAttribute("style", "border: none");
    secondBtn.setAttribute("style", "border: none");
    thirdBtn.setAttribute("style", "border: none");

    firstBtn.removeAttribute("disabled");
    secondBtn.removeAttribute("disabled");
    thirdBtn.removeAttribute("disabled");

    if (currentIndex < 29) {
        if (currentIndex!=0) {
            currentQuestion = questionArr[currentIndex-1];
            var current_answer = "";
            if (currentQuestion.correctAnswer=="#third-option")
                current_answer = currentQuestion.thirdOption;
            else if (currentQuestion.correctAnswer=="#second-option")
                current_answer = currentQuestion.secondOption;
            else if (currentQuestion.correctAnswer=="#first-option")
                current_answer = currentQuestion.firstOption;
            answeredQuestions.push([currentQuestion.question,current_answer,flag])   
        }
        currentQuestion = questionArr[currentIndex];
        questionNumberEl.textContent = currentIndex+1;
        questionTextEl.textContent = currentQuestion.question;
        firstBtn.textContent = currentQuestion.firstOption;            
        secondBtn.textContent = currentQuestion.secondOption;
        thirdBtn.textContent = currentQuestion.thirdOption;

        currentIndex = currentIndex+1;

    } else {
        userScoreEl.textContent = userScore + " od " + 30 + " bodova";
        if (userScore <= 3) {
            userScoreMsgEl.textContent = "... Kako?";
        } else if (userScore > 3 && userScore <= 5) {
            userScoreMsgEl.textContent = "... Više sreće drugi put!";
        } else if (userScore > 5 && userScore <= 7) {
            userScoreMsgEl.textContent = "... Priznaj, koliko se pitanja pogađalo?";
        } else if (userScore > 7 && userScore <= 9) {
            userScoreMsgEl.textContent = "... Možeš ti to i bolje.";
        } else if (userScore > 9 && userScore <= 11) {
            userScoreMsgEl.textContent = ", Not Great Not Terrible.";
        } else if (userScore > 11 && userScore <= 13) {
            userScoreMsgEl.textContent = ", Bravo!";
        } else if (userScore > 13 && userScore <= 15) {
            userScoreMsgEl.textContent = ", Dobro poznaješ opće znanje!";
        } else if (userScore > 15 && userScore <= 17) {
            userScoreMsgEl.textContent = ", Odlično poznaješ opće znanje!";
        } else if (userScore > 17 && userScore <= 19) {
            userScoreMsgEl.textContent = ", Wow, impresivno!";
        } else {
            userScoreMsgEl.textContent = "... TKO SI TI!?";
        }

        questionsDiv.setAttribute("class", "hide");
        completeDiv.setAttribute("class", "show");

        answeredQuestions[0][0] = questionArr[0].question;
        currentQuestion = questionArr[0]
        var current_answer = "";
            if (currentQuestion.correctAnswer=="#third-option")
                current_answer = currentQuestion.thirdOption;
            else if (currentQuestion.correctAnswer=="#second-option")
                current_answer = currentQuestion.secondOption;
            else if (currentQuestion.correctAnswer=="#first-option")
                current_answer = currentQuestion.firstOption;
        answeredQuestions[0][1] = current_answer;

        table = document.createElement('table');
        table.style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"

        for (let i = 0; i < answeredQuestions.length; i++) {
            const tr = table.insertRow();
            for (let j = 0; j < 2; j++) {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(answeredQuestions[i][j]));
                td.style.border = '0.1px inset #013383';
                if (j==1)
                    if (answeredQuestions[i][j+1]=="True") {
                        td.style.backgroundColor = '#F1FFE1';
                        td.style.marginLeft = "20px"
                    }

                    else if (answeredQuestions[i][j+1]=="False")
                        td.style.backgroundColor = '#FFE6E1';
                        td.style.marginLeft = "20px"
            }
        }
        completeDiv.appendChild(table);

        currentIndex = 0;
        timeLeft = defaultTimeLeft;

        return;
    }
}

// ------------------ client-side storage for scores ------------------ //
var userScores = [];

// ------------------ event listeners ------------------ //
startBtn.addEventListener("click", countdown);
startBtn.addEventListener("click", showQuestions);
answerBtnDiv.addEventListener("click", scoreIncrement);
nextBtn.addEventListener("click", changeQuestions);
