import hashlib
import hmac
import json
import mimetypes
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote

PORT = 3000
BACKEND_DIRECTORY = Path(__file__).parent
ROOT_DIRECTORY = BACKEND_DIRECTORY.parent
CREDENTIALS_PATH = BACKEND_DIRECTORY / "credentials.json"


def load_credentials() -> dict:
    with CREDENTIALS_PATH.open(encoding="utf-8") as credentials_file:
        return json.load(credentials_file)


def password_matches(password: str, stored_password: dict[str, str]) -> bool:
    salt = bytes.fromhex(stored_password["salt"])
    candidate_hash = hashlib.scrypt(
        password.encode("utf-8"), salt=salt, n=2**14, r=8, p=1, dklen=64
    )
    return hmac.compare_digest(candidate_hash.hex(), stored_password["hash"])


class DaysDelightHandler(BaseHTTPRequestHandler):
    def send_json(self, status: HTTPStatus, body: dict) -> None:
        response = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)

    def do_POST(self) -> None:
        if self.path != "/api/login":
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            if content_length > 10_000:
                raise ValueError("Solicitud demasiado grande")
            data = json.loads(self.rfile.read(content_length))
            username = data.get("usuario", "")
            password = data.get("contrasena", "")
            credentials = load_credentials()
            username_matches = username == credentials["username"]
            password_matches_result = any(
                password_matches(password, stored_password)
                for stored_password in credentials["password_hashes"]
            )

            if not username_matches or not password_matches_result:
                self.send_json(HTTPStatus.UNAUTHORIZED, {"error": "Usuario o clave inválida."})
                return

            self.send_json(
                HTTPStatus.OK,
                {"ok": True, "redirect": "/frontend/html/index.html"},
            )
        except (ValueError, KeyError, json.JSONDecodeError):
            self.send_json(
                HTTPStatus.BAD_REQUEST,
                {"error": "La solicitud de acceso no es válida."},
            )

    def do_GET(self) -> None:
        requested_path = unquote(self.path.split("?", 1)[0])
        if requested_path == "/":
            requested_path = "/frontend/html/loguin.html"
        file_path = (ROOT_DIRECTORY / requested_path.lstrip("/")).resolve()

        if ROOT_DIRECTORY not in file_path.parents or not file_path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        content = file_path.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def log_message(self, format: str, *args: object) -> None:
        print(f"{self.address_string()} - {format % args}")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("localhost", PORT), DaysDelightHandler)
    print(f"Days Delight disponible en http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        server.server_close()