// Firebase 설정객체 : 내 firebase 에대한 정보
const firebaseConfig = {
  apiKey: "AIzaSyBjPPPPhjM1zdSWRJs0TKYrlne0nTFKb8M",
  authDomain: "fir-test-2941b.firebaseapp.com",
  databaseURL: "https://fir-test-2941b-default-rtdb.firebaseio.com",
  projectId: "fir-test-2941b",
  storageBucket: "fir-test-2941b.appspot.com",
  messagingSenderId: "57174928866",
  appId: "1:57174928866:web:584e0568dd9f9e235a9dbb",
};

// Firebase 앱 초기화
const app = firebase.initializeApp(firebaseConfig);

// Firebase 의 실시간 데이터베이스
const database = firebase.database();

if (sessionStorage.getItem("id")) {
  // sessionStorge에 id값이 존재하는지 확인
  document.getElementById("login_out").innerText = "Logout"; // 존재할경우 sidenav의 login을 logout으로변경
  const logoutBtn = document.getElementById("logoutBtn"); // a태그 가져오기
  logoutBtn.addEventListener("click", () => {
    // 이벤트 걸어주기
    logoutBtn.href = "Login.html"; // 로그아웃버튼일때 이동하고싶은 주소 지정
    sessionStorage.removeItem("id"); // 세션에 담은 id값 삭제
    sessionStorage.removeItem("name"); // 세션에 담은 name값 삭제
  });
}

// Initialize Vanta.js
VANTA.BIRDS({
  el: "body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 900.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  backgroundColor: 0xfcf6f5,
  color1: 0x7b9acc,
  color2: 0x7b9acc,
});

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("modalOpen");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = () => {
  resetQuiz();
  modal.style.display = "block";
  modal.querySelector(".modal-content").classList.add("slideIn");
  displayQuestion();
};

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
  modal.querySelector(".modal-content").classList.remove("slideIn");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector(".modal-content").classList.remove("slideIn");
  }
};

let questions = [
  {
    q: "인터랙티브 미디어란 무엇을 의미하나요?",
    a: [
      "사용자가 콘텐츠와 상호작용할 수 있는 미디어",
      "일방적으로 전달되는 미디어",
    ],
    correct: 0,
  },
  {
    q: "다음 중 인터랙티브 미디어의 예시가 아닌 것은 무엇인가요?",
    a: ["비디오 게임", "텔레비전 방송"],
    correct: 1,
  },
  {
    q: "멀티미디어와 인터랙티브 미디어의 차이점은 무엇인가요?",
    a: [
      "멀티미디어는 다양한 콘텐츠를 포함하고, 인터랙티브 미디어는 사용자 참여를 포함한다.",
      "멀티미디어는 사용자 참여를 포함하고, 인터랙티브 미디어는 다양한 콘텐츠를 포함한다.",
    ],
    correct: 0,
  },
  {
    q: "인터랙티브 미디어에서 가장 중요한 요소는 무엇인가요?",
    a: ["그래픽 품질", "사용자 참여"],
    correct: 1,
  },
  {
    q: "다음 중 인터랙티브 미디어 기술에 해당하는 것은 무엇인가요?",
    a: ["라디오", "가상 현실 (VR)"],
    correct: 1,
  },
  {
    q: "인터랙티브 스토리텔링에서 사용자가 할 수 있는 것은 무엇인가요?",
    a: ["이야기를 들을 수 있다.", "이야기의 진행 방향을 선택할 수 있다."],
    correct: 1,
  },
  {
    q: "다음 중 인터랙티브 미디어가 아닌 것은 무엇인가요?",
    a: ["소셜 미디어 플랫폼", "신문 기사"],
    correct: 1,
  },
  {
    q: "인터랙티브 미디어는 주로 어떤 산업에서 사용되나요?",
    a: ["교육", "농업"],
    correct: 0,
  },
  {
    q: "다음 중 인터랙티브 미디어의 장점은 무엇인가요?",
    a: ["사용자와의 높은 상호작용성", "대량 생산 가능성"],
    correct: 0,
  },
  {
    q: "인터랙티브 미디어가 다른 전통적인 미디어와 다른 점은 무엇인가요?",
    a: [
      "수동적 경험을 제공한다.",
      "사용자에게 선택과 상호작용의 기회를 제공한다.",
    ],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let ranking = [];
const resetQuiz = () => {
  currentQuestion = 0;
  score = 0;
  document.getElementById("score").innerText = "점수: " + score;
  updateProgressBar();
};
const updateProgressBar = () => {
  let progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
};

const displayQuestion = () => {
  document.getElementById("question").innerText =
    "Q" + (currentQuestion + 1) + ": " + questions[currentQuestion].q;
  let answers = document.getElementsByClassName("answer");
  for (let i = 0; i < answers.length; i++) {
    answers[i].innerText = questions[currentQuestion].a[i];
    answers[i].setAttribute(
      "onclick",
      "checkAnswer(" + (i === questions[currentQuestion].correct ? 1 : 0) + ")"
    );
  }
  updateProgressBar();
};
const checkAnswer = (isCorrect) => {
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
    if (sessionStorage.getItem("name")) {
      savescore(sessionStorage.getItem("name"), score);
    }
    modal.style.display = "none";
  }
};

const updateRanking = () => {
  let rankingList = document.getElementById("rankingList");
  rankingList.innerHTML = "";
  ranking.forEach((entry, index) => {
    let listItem = document.createElement("p");
    switch (index) {
      case 0:
        listItem.innerHTML = `<img src="./img/goldmedal.png" style="width: 30px; height: 30px" /> &nbsp;&nbsp;${entry.name} ${entry.score}점`;
        break;
      case 1:
        listItem.innerHTML = `<img src="./img/silvermedal.png" style="width: 30px; height: 30px" /> &nbsp;&nbsp;${entry.name} ${entry.score}점`;
        break;
      case 2:
        listItem.innerHTML = `<img src="./img/bronzemedal.png" style="width: 30px; height: 30px" /> &nbsp;&nbsp;${entry.name} ${entry.score}점`;
        break;
      default:
        listItem.innerHTML = `${index + 1}등 &nbsp;&nbsp; ${entry.name} ${
          entry.score
        }점`;
    }
    rankingList.appendChild(listItem);
  });
};

let flag = false;

const blink = () => {
  let vision = flag ? "none" : "block";
  document.getElementById("coinP").style.display = vision;
  flag = !flag;
};
window.addEventListener("load", () => {
  setInterval(blink, 750);
  readRanking();
});

const savescore = (name, score) => {
  return database
    .ref("ranking/" + name)
    .set({
      name: name,
      score: score,
    })
    .then(() => {
      // 점수 저장 후 랭킹 다시 읽기
      return readRanking();
    });
};

const readRanking = () => {
  return database
    .ref("ranking/")
    .once("value")
    .then((res) => {
      const data = res.val();
      ranking = Object.values(data).sort((a, b) => b.score - a.score);
      updateRanking();
    });
};
