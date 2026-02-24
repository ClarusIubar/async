import asyncio

wait = 1000
thousand_millisecond = wait / 1000

async def main():
    print("안녕?")
    await asyncio.sleep(thousand_millisecond)
    print("욱재는 미남이야")

print("자니...?")
asyncio.run(main())