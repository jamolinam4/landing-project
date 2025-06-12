from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Cambiar al directorio que contiene los archivos estáticos
os.chdir('src/public')

# Configurar el servidor
port = 8000
server_address = ('', port)
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

print(f'Servidor iniciado en http://localhost:{port}')
httpd.serve_forever()
