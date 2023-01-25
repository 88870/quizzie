let questions = [
  {
    numb: 1,
    question: "Wat voor genre is het film?",
    answer: "Horror/Sci-fi",
    options: [
      "Actie/Horror",
      "Horrr/Sci-fi",
      "Comedy/Actie",
      "Sci-fi/Comedy"
    ]
  },
  {
    numb: 2,
    question: "Wanneer is M3GAN officieel uitgekomen?",
    answer: "2022",
    options: [
      "2023",
      "2024",
      "2021",
      "2022"
    ]
  },
  {
    numb: 3,
    question: "Wie speels als M3GAN? ",
    answer: "Amie Donald",
    options: [
      "Kimberley Crossman",
      "Amie Donald",
      "Jenna Davis",
      "Violet McGraw"
    ]
  },
  {
    numb: 4,
    question: "Wie is de stemacteur van M3GAN?",
    answer: "Jenna Davis",
    options: [
      "Kimberley Crossman",
      "Amie Donald",
      "Jenna Davis",
      "Violet McGraw"
    ]
  },
  {
    numb: 5,
    question: "Wie is de regisseur?",
    answer: "Gerard Johnstone",
    options: [
      "Gerard Johnstone",
      "James Wan",
      "Michael Clear",
      "Couper Samuelson"
    ]
  },
  {
    numb: 6,
    question: "Hoeveel euro is het budget?",
    answer: "12 miljoen",
    options: [
      "19 miljoen",
      "31 miljoen",
      "26 miljoen",
      "12 miljoen"
    ]
  },
  {
    numb: 7,
    question: "Er spelen meer mannen dan vrouwen in M3GAN",
    answer: "Niet waar",
    options: [
      "Waar",
      "Niet waar",
      "Er spelen geen mensen in het film",
      "yes"
    ]
  },
  {
    numb: 8,
    question: "Hoeveel mensen spelen in het film?",
    answer: "13",
    options: [
      "13",
      "21",
      "16",
      "19"
    ]
  },
  {
    numb: 9,
    question: "Hoelang duurt het film?",
    answer: "1u 42m",
    options: [
      "1u 37m",
      "2u 25m",
      "1u 42m",
      "2u 12m"
    ]
  },
  {
    numb: 10,
    question: "Wanneer is het film in Nederland uitgekomen?",
    answer: "2023",
    options: [
      "2023",
      "2022",
      "2024",
      "2021"
    ]
  },
];



const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
}


exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); 
}


continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); 
  quiz_box.classList.add("activeQuiz"); 
  showQuetions(0); 
  queCounter(1); 
  startTimer(15); 
  startTimerLine(0); 
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); 
  result_box.classList.remove("activeResult"); 
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); 
  queCounter(que_numb); 
  clearInterval(counter); 
  clearInterval(counterLine); 
  startTimer(timeValue); 
  startTimerLine(widthValue); 
  timeText.textContent = "Time Left"; 
  next_btn.classList.remove("show"); 
}


quit_quiz.onclick = () => {
  window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = () => {
  if (que_count < questions.length - 1) { 
    que_count++; 
    que_numb++; 
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
  } else {
    clearInterval(counter); 
    clearInterval(counterLine); 
    showResult(); 
  }
}


function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

 
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
  que_text.innerHTML = que_tag; 
  option_list.innerHTML = option_tag; 

  const option = option_list.querySelectorAll(".option");


  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
  clearInterval(counter); 
  clearInterval(counterLine); 
  let userAns = answer.textContent; 
  let correcAns = questions[que_count].answer; 
  const allOptions = option_list.children.length; 

  if (userAns == correcAns) { 
    userScore += 1; 
    answer.classList.add("correct"); 
    answer.insertAdjacentHTML("beforeend", tickIconTag); 
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag); 
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {  
        option_list.children[i].setAttribute("class", "option correct"); 
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show"); 
}

function showResult() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  let name = document.getElementById("name").value;

  
  if (userScore >= 7) {
    document.getElementById("name").value

    let scoreTag = '<span> Goed gedaan, <p>' + name + "   " + "  je hebt" + userScore + '</p> van de <p>' + questions.length + '</p>goed </span>';
    scoreText.innerHTML = scoreTag;
    document.getElementById("eindfoto").src = "imgg/yay.jpeg";
  }
  else if (userScore < 7) {
    let scoreTag = '<span> Kan beter, <p>' + name + "   " + "  je hebt" + userScore + '</p> van de <p>' + questions.length + '</p>goed </span>';
    scoreText.innerHTML = scoreTag;
    document.getElementById("eindfoto").src = "imgg/no.jpeg";
  }
  else {
    let scoreTag = '<span> Goed gedaan <p>' + name + "   " + "  je hebt" + userScore + '</p> van de <p>' + questions.length + '</p>goed </span>';
    scoreText.innerHTML = scoreTag;
  }
}


function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; 
    time--; 
    if (time < 9) { 
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; 
    }
    if (time < 0) { 
      clearInterval(counter); 
      timeText.textContent = "Time Off"; 
      const allOptions = option_list.children.length; 
      let correcAns = questions[que_count].answer; 
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) { 
          option_list.children[i].setAttribute("class", "option correct"); 
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); 
      }
      next_btn.classList.add("show"); 
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; 
    time_line.style.width = time + "px"; 
    if (time > 549) { 
      clearInterval(counterLine); 
    }
  }
}

function queCounter(index) {
  
  let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; 
}