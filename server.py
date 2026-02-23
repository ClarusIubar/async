# 서버를 불러옴

from http.server import SimpleHTTPRequestHandler, HTTPServer


# 서버 구조 생성
# simpleHTTP 구조 오버라이드
class TestServer(SimpleHTTPRequestHandler):
    # do_GET 메서드(테스트)
    def do_GET(self):
        # 응답 코드 반환
        self.send_response(200)
        # 응답 헤더 반환
        self.send_header("Content-type","text/html; charset=utf-8")
        # 헤더 종료
        self.end_headers()
        
        # 터미널 출력 테스트
        print("응답 성공")
    # do_POST 메서드
    def do_POST(self):
        # 응답 코드 반환
        self.send_response(200)
        # 응답 헤더 반환
        self.send_header("Content-type","text/html; charset=utf-8")
        # 헤더 종료
        self.end_headers()
        
        # 터미널 출력 테스트
        print("POST 성공")
        
        
# httpserver실행
# port 8000번
PORT = 8000

# TestServer를 올려놓아서 실행
server = HTTPServer(("",PORT),TestServer)

# server 실행
server.serve_forever()