from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer


PORT = 8000


handler = SimpleHTTPRequestHandler
handler.extensions_map[".js"] = "application/javascript"

httpd = TCPServer(("", PORT), handler)
httpd.serve_forever()
