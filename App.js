var questionData = [
  {
    question: "What is the Full Form Of HTML",
    options: [
      "HyperText Makeup Language",
      "HyperText Markup Language",
      "HyperText Markup Lame",
      "HyperTate Markup Language",
    ],
    answer: "HyperText Markup Language",
  },

  {
    question: "What does CSS stands for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },

  {
    question: "What does PHP stands for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    question: "What does SQL stands for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    question: "What year was JavaScript launched?",
    answer: "1995",
    options: ["1996", "1995", "1994", "None of the Above"],
  },
];

var questionNumber = document.getElementById("questionNumber")
var duration = document.getElementById("duration")
var questionIndex = document.getElementById("questionIndex")
var options = document.getElementById("options")
var container = document.getElementById("container")
var container2 = document.getElementById("container2")
var result = document.getElementById("result")
var grade = document.getElementById("grade")
var btn = document.getElementById("btn")
var emoji = document.getElementById("em")
var emoji2 = document.getElementById("em2")
var userNameGet = document.getElementById("userNameGet")
var userName = document.getElementById("userNAme")
var emailGet = document.getElementById("emailGet")
var email = document.getElementById("email")
var Login = document.getElementById("Login")
var main = document.getElementById("main")
var Rigister = document.getElementById("Rigister")
var userPasword = document.getElementById("userPasword")
var emailSend = document.getElementById("emailSend")
var emailSend3 = document.getElementById("emailSend3")
var userPaswordSend = document.getElementById("userPaswordSend")
var changepage = document.getElementById("changepage")
var forgetPassword = document.getElementById("forgetPassword")



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIi9_odqNJbT3HggzVf3HG364dUd0Oios",
  authDomain: "quiz-29.firebaseapp.com",
  projectId: "quiz-29",
  storageBucket: "quiz-29.appspot.com",
  messagingSenderId: "365733541556",
  appId: "1:365733541556:web:09cc2ffe1de12a978ac9e1",
  measurementId: "G-2XXB6YX2NZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const DATABASE = getDatabase(app)

var index = 0;
var right = 0;
var timing = 30


window.ChangePAge = function () {
  Login.style.display = "none"
  Rigister.style.display = "block"
}

window.RigistraTion = function () {
  if (emailSend.value === "") {
    swal("Email", "Email is emty")
  } else if (userNameGet.value === "") {
    swal("User Name", "User Name is emty")
  } else if (userPaswordSend.value === "") {
    swal("Password", "Password is emty")
  } else if (userPaswordSend.value.length <= 5) {
    swal("Password", "Password at least 6 characters")
  } else {
    var users = {
      userName: userNameGet.value,
      email: emailSend.value,
      password: userPaswordSend.value,
    }
    createUserWithEmailAndPassword(auth, emailSend.value, userPaswordSend.value).then(
      function (user) {
        users.id = user.user.uid
        var refer = ref(DATABASE, `users/${users.id}`)
        set(refer, users)
        swal("Registration", "Successfully", "success")
        Rigister.style.display = "none"
        Login.style.display = "block"
      }).catch(
        function () {

          sweetAlert("Oops...", "Something went wrong!", "error");
        }
      )
  }
}
var res = {}

window.dataSending = function () {
  email.innerHTML = emailGet.value
  signInWithEmailAndPassword(auth, emailGet.value, userPasword.value).then(
    
    function (user) {
      res.id = user.user.uid
res.password = userPasword.value
      res.email = emailGet.value

      Login.style.display = "none"
      swal({
        title: "You are Login Successfully",
        text: "Now Your Quiz Start Best Of Luck",
        timer: 2000
      });
      main.style.display = "block"
      timeimg()
      Question()
    }
  ).catch(
    function () {
      sweetAlert("Oops...", "Login Faild!", "error");
    }
  )


}

function Question() {
  document.getElementById("logoutBtn").style.display = "none"

  if (index < questionData.length) {
    questionNumber.innerHTML = questionData[index].question
    questionIndex.innerHTML = `Question Number ${index + 1}/${questionData.length}`
    options.innerHTML = ""
    for (var i = 0; i < questionData[index].options.length; i++) {
      options.innerHTML += `<div class="col-md-6 mt-2" >
<div class="p-2 shadow-lg rounded bg-dark">
    <button   onclick="recive('${questionData[index].options[i]}','${questionData[index].answer}')" class="btn w-100 text-white">${questionData[index].options[i]}</button>
</div>
</div>`
    }
  } else {
    container.style.display = "none"
    btn.style.display = "none"
    result.innerHTML = `Your Result ${right}/${questionData.length}`
  res.result = right
    
    var refe = ref(DATABASE, `Results/${res.id}`)
    set(refe, res)
    container2.style.display = "block"
    document.getElementById("logoutBtn").style.display = "block"

    grade.style.color = "skyBlue"
    if (right === 5) {
      grade.innerHTML = `Your grade is A+1`
      emoji2.style.display = "block"

    } else if (right === 4) {
      grade.innerHTML = `Your grade is A`
      emoji2.style.display = "block"

    } else if (right === 3) {
      grade.innerHTML = `Your grade is B`
      emoji2.style.display = "block"

    } else if (right === 2) {
      grade.innerHTML = `Your grade is C`
      emoji2.style.display = "block"

    } else {
      grade.innerHTML = `You are Fail Bater luck next Time`
      grade.style.color = "red"
      emoji.style.display = "block"
    }


  }


}

window.change = function () {
  timing = 31
  index++
  Question()
}
window.recive = function (que, ans) {
  if (que === ans) {
    right++
  }
  change()
}
function timeimg() {
  var hh = setInterval(time, 1000)
  function time() {
    timing--
    duration.innerHTML = `time : ${timing}`
    if (timing === 0) {
      index++
      Question()
      timing = 31
    } else if (index === questionData.length) {
      clearInterval(hh)
    }
  }
}


window.logOut = function () {
  signOut(auth).then(
    function () {
 
      swal("SignOut", "Successfully", "success")
      container2.style.display = "none"
      Login.style.display = "block"
      btn.style.display = "block"
      window.location.reload()

    }
  ).catch(
    function () {
      sweetAlert("Oops...", "LogOut Faild", "error");

    }
  )
}

window.cha = function () {
  Login.style.display = "none"
  forgetPassword.style.display = "block"

}
window.Forget = function () {
  sendPasswordResetEmail(auth, emailSend3.value).then(
    function () {
    
      swal("Reset Successfully", "Please Check Your Email", "success")
      forgetPassword.value = ""
      forgetPassword.style.display = "none"
      Login.style.display = "block"

    }
  ).catch(
    function () {
      sweetAlert("Oops...", "Reset Password Faild", "error");

    }
  )
}