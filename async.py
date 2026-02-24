import asyncio
import time

async def async_task(name, sec):
    print(f"[{time.strftime('%S')}s] 작업 {name} 시작")
    await asyncio.sleep(sec)
    print(f"[{time.strftime('%S')}s] 작업 {name} 완료")
    return name

async def main():
    print(f"[{time.strftime('%S')}s] 메인 시작")

    # task 객체를 만드는 순간 이벤트 루프에 등록됨
    t1 = asyncio.create_task(async_task("A", 10))
    t2 = asyncio.create_task(async_task("B", 5))

    await asyncio.sleep(0.5)
    print(f"[{time.strftime('%S')}s] 중간 점검")

    # B가 먼저 끝나더라도 코드 구조상 t1을 먼저 await 함
    res1 = await t1
    print(f"[{time.strftime('%S')}s] 결과 1: {res1}")
    res2 = await t2
    print(f"[{time.strftime('%S')}s] 결과 2: {res2}")

asyncio.run(main())