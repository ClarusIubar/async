/**
 * 자바스크립트 실행 우선순위 및 제어권 이동 관측 코드
 */

// 비동기 함수 정의
async function observeAsync() {
  console.log("2. [Stack] observeAsync 함수 진입");

  // await를 만나는 순간: 
  // 1. '재료(Promise)'를 확인한다.
  // 2. 이 함수를 중단(Suspend)하고 스택에서 나간다.
  // 3. 후속 작업(Ticket)을 마이크로태스크 큐에 예약한다.
  const result = await new Promise((resolve) => {
    console.log("3. [Stack] Promise 내부 로직 실행 (동기적)");
    resolve("재료 준비 완료!"); 
  });

  // 여기서부터가 '후속 작업(Ticket)'의 실체입니다.
  // 큐에서 꺼내져 콜스택으로 돌아와야만 실행됩니다.
  console.log("6. [Microtask/Stack] await 이후 재개됨. 결과값 할당:", result);
  console.log("7. [Microtask/Stack] observeAsync 함수 최종 종료");
}

// 0. 전역 코드 시작
console.log("1. [Stack] 전역 코드 시작 (Main Thread)");

// 1. 비동기 함수 호출
observeAsync();

// 2. 매크로태스크 예약 (가장 낮은 우선순위)
setTimeout(() => {
  console.log("8. [Macrotask] setTimeout 콜백 실행 (모든 큐가 비어야 실행됨)");
}, 0);

// 3. 다른 마이크로태스크 예약 (Promise.then)
Promise.resolve().then(() => {
  console.log("5. [Microtask] 일반 Promise.then 티켓 실행");
});

console.log("4. [Stack] 전역 코드 마지막 줄 실행 완료 (이제 스택이 비워짐)");
