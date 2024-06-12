// Initialize Vanta.js
VANTA.BIRDS({
  el: "body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 695.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  backgroundColor: 0x7b9acc,
  color1: 0xfcf6f5,
  color2: 0xfcf6f5,
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modalOpen");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  resetQuiz();
  modal.style.display = "block";
  displayQuestion();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var questions = [
  {
    q: "인터랙티브 미디어에 대한 설명으로 옳은 것은?",
    a: ["정답1", "정답2"],
    correct: 0,
  },
  {
    q: "HTML의 약자는?",
    a: ["Hyper Text Markup Language", "Home Tool Markup Language"],
    correct: 0,
  },
  {
    q: "CSS의 약자는?",
    a: ["Cascading Style Sheets", "Colorful Style Sheets"],
    correct: 0,
  },
  {
    q: "JavaScript는 무엇을 위해 사용되는가?",
    a: ["웹 개발", "데이터 분석"],
    correct: 0,
  },
  {
    q: "DOM은 무엇의 약자인가?",
    a: ["Document Object Model", "Display Object Management"],
    correct: 0,
  },
  {
    q: "HTTP의 약자는?",
    a: ["HyperText Transfer Protocol", "Hyperlink Transfer Protocol"],
    correct: 0,
  },
  {
    q: "브라우저가 HTML을 해석하는 과정을 무엇이라고 하는가?",
    a: ["렌더링", "컴파일링"],
    correct: 0,
  },
  {
    q: "CSS에서 색상을 지정하는 방법이 아닌 것은?",
    a: ["hex 코드", "pixel 코드"],
    correct: 1,
  },
  {
    q: "JavaScript 배열 메소드 중 배열의 끝에 요소를 추가하는 것은?",
    a: ["push()", "pop()"],
    correct: 0,
  },
  {
    q: "CSS에서 Flexbox는 무엇을 위한 레이아웃 모델인가?",
    a: ["1차원 레이아웃", "2차원 레이아웃"],
    correct: 0,
  },
];

var currentQuestion = 0;
var score = 0;
var ranking = [];

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("score").innerText = "점수: " + score;
}

function displayQuestion() {
  document.getElementById("question").innerText =
    "Q" + (currentQuestion + 1) + ": " + questions[currentQuestion].q;
  var answers = document.getElementsByClassName("answer");
  for (var i = 0; i < answers.length; i++) {
    answers[i].innerText = questions[currentQuestion].a[i];
    answers[i].setAttribute(
      "onclick",
      "checkAnswer(" + (i === questions[currentQuestion].correct ? 1 : 0) + ")"
    );
  }
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    score++;
  }
  document.getElementById("score").innerText = "점수: " + score;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    if (score < 5) {
      Swal.fire({
        title: "좀더분발하세요!",
        text: `최종 점수 : ${score}`,
        icon: "error",
      });
    } else if (score < 10) {
      Swal.fire({
        title: "수준급의 실력이군요!",
        text: `최종 점수 : ${score}`,
        icon: "info",
      });
    } else if (score == 10) {
      Swal.fire({
        title: "만점입니다!",
        text: `최종 점수 : ${score}`,
        icon: "success",
      });
    }

    updateRanking(score);
    modal.style.display = "none";
  }
}

function updateRanking(newScore) {
  ranking.push(newScore);
  ranking.sort((a, b) => b - a);
  ranking = ranking.slice(0, 10); // 상위 10개의 점수만 유지
  var rankingList = document.getElementById("rankingList");
  rankingList.innerHTML = "";
  ranking.forEach((score, index) => {
    var listItem = document.createElement("li");
    listItem.textContent = `${score}점`;
    rankingList.appendChild(listItem);
  });
}
