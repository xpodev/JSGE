from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import sys
from typing import Tuple

try:
    PORT = int(sys.argv[1])
except (IndexError, ValueError):
    PORT = 8000


handler = SimpleHTTPRequestHandler
handler.extensions_map[".js"] = "application/javascript"

httpd = TCPServer(("", PORT), handler)
print(f"Server is running on port {PORT}")
httpd.serve_forever()
