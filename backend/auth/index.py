import json
import os
import hashlib
import secrets
import psycopg2

SESSIONS: dict = {}

def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Авторизация учителей: вход и выход."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Session-Id",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    headers = event.get("headers", {}) or {}
    session_id = headers.get("X-Session-Id", "")
    action = body.get("action", "login")

    # login
    if method == "POST" and action == "login":
        login = body.get("login", "").strip()
        password = body.get("password", "").strip()
        if not login or not password:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Введите логин и пароль"})}

        password_hash = hashlib.md5(password.encode()).hexdigest()
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, name, subject FROM t_p11218885_create_site_project_.teachers WHERE login = %s AND password_hash = %s",
            (login, password_hash)
        )
        row = cur.fetchone()
        conn.close()

        if not row:
            return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "Неверный логин или пароль"})}

        token = secrets.token_hex(32)
        SESSIONS[token] = {"id": row[0], "name": row[1], "subject": row[2], "login": login}
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"token": token, "name": row[1], "subject": row[2]})
        }

    # me
    if method == "GET":
        teacher = SESSIONS.get(session_id)
        if not teacher:
            return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "Не авторизован"})}
        return {"statusCode": 200, "headers": cors, "body": json.dumps(teacher)}

    # logout
    if method == "POST" and action == "logout":
        SESSIONS.pop(session_id, None)
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}