// 언어 설정 변경

const changeLanguageBtn = document.getElementById("change-lang");
let currentLanguage = "en"; // 초기 언어 설정

// JSON 파일에서 번역 데이터를 불러오는 함수
async function fetchTranslations() {
    const response = await fetch("translations.json");
    return await response.json();
}

// 언어를 변경하는 함수
async function toggleLanguage() {
    const translations = await fetchTranslations();
    currentLanguage = currentLanguage === "en" ? "ko" : "en"; // 언어 토글

    // 모든 data-i18n 요소를 업데이트
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translations[currentLanguage][key];
    });
}

changeLanguageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    toggleLanguage();
});

// toggleLanguage();
