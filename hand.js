// 비동기 함수 정의
async function show() {
    console.log(" [stack] show 함수 진입.");

    const result = await new Promise(
        (resolve) => {
            console.log(" [stack] Promise 내부 로직 실행");
            const data = "성공 데이터"; // 이 과정에 데이터 처리 로직이 있으면, 그것이 전달됨.
            resolve(data);
            console.log(" [stack] data를 콜 스택으로 보냈어요! 처리해주세요!");
        }
    );

    console.log(" [microstack/stack] await 후 이후 재개됨. 결과값 할당 : ", result);
    console.log(" [microstack/stack] show 함수 최종 종료.")
}

console.log(" [stack] 전역 코드 시작(main thread)");
show();
setTimeout(
    ()=> {
        console.log(" [Macrostack] setTimeout 콜백 실행 (스택이 비어있고, 마이크로 스택 처리 후에 실행) ")
    }, 0);

Promise.resolve().then(
    ()=>{
        console.log(" [microstack] 일반 Promise.then 티켓, show()가 생성한 티켓 종료 후 실행.")
    }
);

console.log(" [stack] 전역 코드 마지막 줄 실행 (스택이 비워짐)");