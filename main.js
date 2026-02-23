// data.js를 가져옴
import data from "./data.js";

// 버튼 요소 가져오기
const submitButton = document.querySelector("form button");

// 파일 연결 테스트
const ajaxTest = (e) => {
  e.preventDefault();

  // select 요소 가져오기
  const selectElement = document.querySelector("form select");

  // select 값 가져오기
  const selectValue = selectElement.value;

  console.log("선택값", selectValue);

  // 저장할 객체 데이터
  let dataValue;

  // 가져온 값에 따라 data의 값 빼오기
  switch (selectValue) {
    case "슈퍼맨":
      dataValue = data[0];
      break;

    case "배트맨":
      dataValue = data[1];
      break;
    case "맨투맨":
      dataValue = data[2];
      break;

    case "원펀맨":
      dataValue = data[3];
      break;
  }

  //   dataValue 출력
  console.log(dataValue);

  console.log("통신 성공");
};

// 버튼 요소에서 클릭시 ajaxTest 실행
submitButton.addEventListener("click", (e) => {
  ajaxTest(e);
});
