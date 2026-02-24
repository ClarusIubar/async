const log = (msg) => console.log(`[${new Date().getSeconds()}s] ${msg}`);

async function asyncTask(id, ms) {
    log(`작업 ${id} 시작`);
    await new Promise(r => setTimeout(r, ms));
    log(`작업 ${id} 완료`);
    return id;
}

async function complexFlow() {
    log("메인 시작");

    // 1. await 없이 호출 (작업 예약만 함)
    const t1 = asyncTask("A", 10000); 
    const t2 = asyncTask("B", 5000); 

    log("중간 점검"); // t1, t2가 끝나기 전에 실행됨

    // 2. 나중에 한꺼번에 기다림
    const r1 = await t1;
    log(`결과 r1: ${r1}`);
    const r2 = await t2;
    log(`결과 r2: ${r2}`);

    log("메인 종료");
}

complexFlow();