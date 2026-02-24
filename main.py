import asyncio
import datetime

def get_time():
    return datetime.datetime.now().strftime("%H:%M:%S")

async def fetch_poke_move(move_id):
    print(f"[{get_time()}] 요청 시작: Move ID {move_id}")
    # 비동기적 대기 (2초)
    await asyncio.sleep(2)
    print(f"[{get_time()}] 응답 완료: Move ID {move_id}")
    return f"Move {move_id} Data"

async def main():
    print("=== 비동기 스터디 시작 ===")
    
    # 두 작업을 동시에 예약 (자바스크립트의 Promise.all과 동일 역할)
    task1 = asyncio.create_task(fetch_poke_move(1))
    task2 = asyncio.create_task(fetch_poke_move(2))
    
    print(f"[{get_time()}] 메인 스레드는 멈추지 않고 다른 작업 수행 중...")
    
    # 두 작업의 결과를 기다림
    results = await asyncio.gather(task1, task2)
    
    print(f"최종 결과: {results}")
    print("=== 비동기 스터디 종료 ===")

if __name__ == "__main__":
    asyncio.run(main())