const log = (msg) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);

async function fetchPokeMove(id) {
    log(`요청 시작: Move ID ${id}`);
    // 실제 네트워크 통신 대신 2초 대기를 시뮬레이션 (PokeAPI 응답 가정)
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    log(`응답 완료: Move ID ${id}`);
    return `Move ${id} Data`;
}

async function runStudy() {
    log("=== 비동기 스터디 시작 ===");
    
    // 두 개의 요청을 동시에 시작
    const p1 = fetchPokeMove(1);
    const p2 = fetchPokeMove(2);
    
    log("메인 스레드는 멈추지 않고 다른 작업 수행 중...");
    
    // 결과가 올 때까지 기다림
    const results = await Promise.all([p1, p2]);
    
    log(`최종 결과: ${results}`);
    log("=== 비동기 스터디 종료 ===");
}

runStudy();