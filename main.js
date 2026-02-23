// data.js를 가져옴
import data from "./data.js";

// 버튼 요소 가져오기
const submitButton = document.querySelector("form button");

// 파일 연결 테스트
// async를 통해 비동기 지정
// await 전까지는 비동기로 행동
const ajaxTest = async (e) => {
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
  //   console.log(dataValue);

  // 데이터(dataValue)를 server로 전달
  // 비동기 방식(서버 통신 부터는 시간이 걸리기에
  //   await를 통해 기다리도록 하기
  const response = await fetch("http://localhost:8000/", {
    // 전송 타입
    // 전송할 것이기에 post
    method: "POST",
    // json 형태로 전달하려고 할 것이기에 application/json
    headers: { "content-type": "application/json" },
    // 전달할 데이터는 body
    // json으로 변환(json.stringify)
    body: JSON.stringify(dataValue),
  });

  // data를 받으면 다시 객체화
  const result = await response.json();

  // result가 지정이 되면 실행

  console.log(result)


  console.log("통신 성공");
};

// 버튼 요소에서 클릭시 ajaxTest 실행
submitButton.addEventListener("click", (e) => {
  ajaxTest(e);
});
