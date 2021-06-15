from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import sys
import os.path

try:
    PORT = int(sys.argv[1])
except (IndexError, ValueError):
    PORT = 8000


class ComplexHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:
        filename = '.' + self.path + '.js'
        if os.path.isfile(filename):
            self.send_response(200)
            self.send_header("Content-type", "application/javascript")
            self.end_headers()
            with open(filename) as file:
                self.wfile.write(file.read().encode())
        else:
            return super().do_GET()


handler = ComplexHTTPRequestHandler
handler.extensions_map[".js"] = "application/javascript"

httpd = TCPServer(("", PORT), handler)
print(f"Server is running on port {PORT}")
httpd.serve_forever()
