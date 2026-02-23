from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os

class MissionServer(BaseHTTPRequestHandler):
    def do_GET(self):
        # 루트(/)나 index.html 접속 시 파일을 읽어서 전달
        if self.path == '/' or self.path == '/index.html':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            with open('index.html', 'rb') as f:
                self.wfile.write(f.read())
        
        # JS 파일 요청 처리
        elif self.path.endswith('.js'):
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            file_path = self.path.lstrip('/')
            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())

    def do_POST(self):
        if self.path == "/api":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # f-string 처리 (미션 8번)
            message = f"그는 {data['name']}이고 나이는 {data['age']}살이고 별명은 {data['nickname']}이다."
            
            result = {"result": message}
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

PORT = 8000
print(f"서버가 시작되었습니다: http://localhost:{PORT}")
HTTPServer(('', PORT), MissionServer).serve_forever()