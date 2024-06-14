document.addEventListener("DOMContentLoaded", function () {
    var showSignupBtn = document.getElementsByClassName("show-signup")[0];
    var showSigninBtn = document.getElementsByClassName("show-signin")[0];
    var form = document.getElementsByClassName("form")[0];
    var submitBtn = document.getElementById("submit-btn");
    

    
    function resetClass(element, className) {
        element.classList.remove(className);
    }
    
    let submitBtnLogin = document.getElementById("submit-btn-login");
    
    if (showSignupBtn) {
        showSignupBtn.addEventListener("click", function () {
            resetClass(form, "signin");
            resetClass(form, "reset");
            form.classList.add("signup");
            submitBtn.innerText = "회원가입";
            submitBtn.style.display = "inline-block"; // submit-btn-login 표시
            submitBtnLogin.style.display = "none"; // submit-btn-login 숨기기
        });
    }
    
    if (showSigninBtn) {
        showSigninBtn.addEventListener("click", function () {
            resetClass(form, "signup");
            resetClass(form, "reset");
            form.classList.add("signin");
            submitBtn.style.display = "none"
            submitBtnLogin.style.display = "inline-block"; // submit-btn-login 표시
        });
    }
});