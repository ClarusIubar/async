import data from "./data.js";

const submitButton = document.getElementById("submit-btn");
const resultDisplay = document.getElementById("result-display");

const ajaxTest = async (e) => {
  e.preventDefault();

  const selectValue = document.getElementById("hero-select").value;
  let dataValue = data.find(item => item.name === selectValue);

  try {
    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataValue),
    });

    const result = await response.json();
    // 화면에 결과 바로 출력
    resultDisplay.innerText = "서버 응답: " + result.result;
    console.log("통신 성공:", result);
  } catch (error) {
    console.error("에러 발생:", error);
    resultDisplay.innerText = "서버 연결에 실패했습니다.";
  }
};

submitButton.addEventListener("click", ajaxTest);