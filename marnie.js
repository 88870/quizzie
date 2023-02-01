
let questions = [
  {
    numb: 1,
    question: "Wanner was When Marnie was there outgekomen? ",
    answer: "2014",
    options: [
      "2010",
      "2008",
      "2014",
      "2017",
    ]
  },
  {
    numb: 2,
    question: "De film is gemaakt door studio... ",
    answer: "Studio Ghibli",
    options: [
      "Studio Bones",
      "Studio Ghibli",
      "Studio Mappa",
      "Studio Q",
    ]
  },
  {
    numb: 3,
    question: " Directed..... ",
    answer: "By Hiromasa Yonebayashi",
    options: [
      "By Hiromasa Yonebayashi",
      "By Hola Holola",
      "By Shinji Ikari",
      "By Pop buurman"
    ]
  },
  {
    numb: 4,
    question: "Is het gebaseerd op een novel?",
    answer: "Ja",
    options: [
      "Ja",
      "Nee",
      "IDK",
      "Misschine"
    ]
  },
  {
    numb: 5,
    question: "Wie heeft de novel geschreven?",
    answer: "Joan G. Robinson",
    options: [
      "Quency deli",
      "Joan G. Robinson",
      "Paul grid",
      "Hirsomia Aiod"
    ]
  },
  {
    numb: 6,
    question: "Op welke jaar was de novel geschreven?",
    answer: "1967",
    options: [
      "1930",
      "1967",
      "1960",
      "1989"
    ]
  },
  {
    numb: 7,
    question: "Waar is de huis van marnie op gebaseerd?",
    answer: "Villa Suikyuso",
    options: [
      "Villa Suikyuso",
      "Villa Sedny",
      "Villa Toun",
      "Villa Edward"
    ]
  },
  {
    numb: 8,
    question: "Hoe veel prijzen heeft de film gewonnen?",
    answer: "1",
    options: [
      "3",
      "1",
      "4",
      "Geen"
    ]
  },
  {
    numb: 9,
    question: "Hoe lang is de film?",
    answer: "1h 43m",
    options: [
      "1h 43m",
      "1h 59m",
      "1h 29m",
      "1h 53m"
    ]
  },
  {
    numb: 10,
    question: " Heeft de film open einde?",
    answer: "Nee",
    options: [
      "Ja",
      "Nee",
      "IDK",
      "Misschine"
    ]
  }

];


const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let namee = document.getElementById("name").value

start_btn.onclick = () => {
  
  info_box.classList.add("activeInfo");
}


exit_btn.onclick = () => {
  info_box.classList.add("activeInfo");
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
  timeText.textContent = "Tijd over";
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
    timeText.textContent = "Tijd over";
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
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);


    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
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


  if (userScore == 10) {
    let scoreTag = name + "   " + "  je hebt   " + userScore + "   " + "van de" + "   " + questions.length + "   " + "goed";
    scoreText.innerHTML = scoreTag + "   " + "WOW, Alle vragen goed!";
    document.getElementById('resultimg').src = "media/a.gif"
  }
  else if (userScore >= 8) {
    let scoreTag = name + "   " + "  je hebt   " + userScore + "   " + "van de" + "   " + questions.length + "   " + "goed";
    scoreText.innerHTML = scoreTag + "   " + ",Maar een paar foutjes!";
    document.getElementById('resultimg').src = "media/b.gif"
  }
  else if (userScore >= 6 && userScore <= 7) {
    let scoreTag = name + "   " + "  je hebt   " + userScore + "   " + "van de" + "   " + questions.length + "   " + "goed";
    scoreText.innerHTML = scoreTag + "   " + ",Niet slecht!";
    document.getElementById('resultimg').src = "media/c.gif"
  }

  else if (userScore <= 5 && userScore > 2) {
    let scoreTag = name + "   " + "  je hebt   " + userScore + "   " + "van de" + "   " + questions.length + "   " + "goed";
    scoreText.innerHTML = scoreTag + "   " + ",probeer het opnieuw je haalt vast hoger!";
    document.getElementById('resultimg').src = "media/d.png"
  }

  else if (userScore < 2) {
    let scoreTag = name + "   " + "  je hebt   " + userScore + "   " + "van de" + "   " + questions.length + "   " + "goed";
    scoreText.innerHTML = scoreTag + "   " + ",Heb de film wel gezien? ";
    document.getElementById('resultimg').src = "media/e.png"

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
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {

  let totalQueCounTag = '<span><p>' + index + '</p> van <p>' + questions.length + '</p> Vragen</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag;
}

window.onload = function () {

  var backgroundImg = ["media/foto1.webp",
    "media/foto2.webp",
    "media/foto3.jpg",
    "media/foto4.jpeg",
    "media/foto5.jpeg",
    "media/foto6.png",
    "media/foto7.jpeg",
    "media/foto8.webp"
  ]

  setInterval(changeImage, 5000);
  function changeImage() {
    var i = Math.floor((Math.random() * 8));

    document.body.style.backgroundImage = "url('" + backgroundImg[i] + "')";

  }
}



let audio = document.getElementById("myAudio");

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

