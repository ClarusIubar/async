# 서버를 불러옴

from http.server import BaseHTTPRequestHandler, HTTPServer

# json으로 변환
import json


# 서버 구조 생성
# simpleHTTP 구조 오버라이드
class TestServer(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        # 5500번 서버 주소로 8000번 주소에게 post 요청을 보내야 하기에
        # CORS 오류가 나지 않도록 설정
        self.send_response(200, "ok")
        self.send_header("Access-Control-Allow-Origin", "*")  # 모든 주소 허용
        # get, post, options 메소드 허용
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        # content-type에 해당하는 헤더 타입 허용
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    # do_GET 메서드(테스트)
    def do_GET(self):
        # 응답 코드 반환
        self.send_response(200)
        # 응답 헤더 반환
        self.send_header("Content-type", "text/html; charset=utf-8")
        # 헤더 종료
        self.end_headers()

        # 터미널 출력 테스트
        print("응답 성공")

    # do_POST 메서드
    def do_POST(self):
        if self.path == "/":
            self.send_response(200)

            # CORS 헤더 추가 (어디서 요청하든 받아주겠다는 뜻)
            self.send_header("Access-Control-Allow-Origin", "*")

            # 돌려줄 데이터가 json이므로 application/json으로 명확히 지정
            self.send_header("Content-type", "application/json; charset=utf-8")
            self.end_headers()

            # 헤더의 길이를 측정
            # 헤더의 길이만큼 읽어야 json의 값이 있기 때문
            content_length = int(self.headers["Content-length"])
            # 헤더의 길이만큼 데이터를 읽어내서 json을 읽어냄
            post_data = self.rfile.read(content_length)
            # 받은 데이터를 다시 utf-8로 디코딩
            # 디코딩은 받은 데이터를 변환함
            decode_data = post_data.decode("utf-8")
            # json데이터를 딕셔너리로 변환
            data = json.loads(decode_data)

            print("서버에서 받은 데이터:", data)

            # f-string 진행
            result = {
                "result": f"그는 {data['name']}이고 나이는 {data['age']}살이고 별명은 {data['nickname']}이다."
            }
            # json으로 다시 변환
            json_result = json.dumps(result)
            # json으로 변환한 데이터
            # utf-8로 인코딩
            self.wfile.write(json_result.encode("utf-8"))


# httpserver실행
# port 8000번
PORT = 8000

# TestServer를 올려놓아서 실행
server = HTTPServer(("", PORT), TestServer)

# server 실행
server.serve_forever()
