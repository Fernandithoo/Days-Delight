import hashlib
import json
import secrets
from pathlib import Path

USERNAME = "luis"
PASSWORD_COUNT = 300
BACKEND_DIRECTORY = Path(__file__).parent


def hash_password(password: str, salt: bytes | None = None) -> dict[str, str]:
    salt = salt or secrets.token_bytes(16)
    password_hash = hashlib.scrypt(
        password.encode("utf-8"), salt=salt, n=2**14, r=8, p=1, dklen=64
    )
    return {"salt": salt.hex(), "hash": password_hash.hex()}


passwords = [secrets.token_urlsafe(32) for _ in range(PASSWORD_COUNT)]
credentials = {
    "username": USERNAME,
    "password_hashes": [hash_password(password) for password in passwords],
}

(BACKEND_DIRECTORY / "credentials.json").write_text(
    json.dumps(credentials, indent=2) + "\n", encoding="utf-8"
)
(BACKEND_DIRECTORY / "generated-keys.txt").write_text(
    "Usuario: " + USERNAME + "\n"
    "Claves de desarrollo generadas automáticamente:\n"
    + "\n".join(passwords)
    + "\n",
    encoding="utf-8",
)

print(f"Se generaron {PASSWORD_COUNT} claves para el usuario '{USERNAME}'.")
print(f"Claves guardadas en: {BACKEND_DIRECTORY / 'generated-keys.txt'}")