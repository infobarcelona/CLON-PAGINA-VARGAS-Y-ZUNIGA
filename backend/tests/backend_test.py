"""Backend tests for Vargas & Zúñiga site.

Covers:
- /api root health
- /api/status GET/POST (legacy)
- /api/contact POST (new endpoint, validation + persistence)
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://vargas-zuniga-legal.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_api_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("message") == "Hello World"


# ---------- Legacy status endpoints (smoke) ----------
class TestStatus:
    def test_status_list_ok(self, session):
        r = session.get(f"{API}/status")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Contact endpoint ----------
class TestContact:
    def test_contact_create_success(self, session):
        payload = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": "test@example.com",
            "subject": "TEST subject",
            "message": "TEST message body with enough text",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        # Validate structure
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "timestamp" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        # No _id leak
        assert "_id" not in data

    def test_contact_missing_fields_returns_422(self, session):
        # Missing 'message' field entirely
        payload = {"name": "X", "email": "x@example.com", "subject": "subj"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_empty_fields_returns_422(self, session):
        payload = {"name": "", "email": "", "subject": "", "message": ""}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_email_too_short(self, session):
        payload = {"name": "A", "email": "a", "subject": "s", "message": "m"}
        r = session.post(f"{API}/contact", json=payload)
        # min_length=3 for email
        assert r.status_code == 422

    def test_contact_unique_ids(self, session):
        ids = set()
        for i in range(3):
            payload = {
                "name": f"TEST_user_{i}",
                "email": f"t{i}@example.com",
                "subject": "TEST",
                "message": "Hello",
            }
            r = session.post(f"{API}/contact", json=payload)
            assert r.status_code == 200
            ids.add(r.json()["id"])
        assert len(ids) == 3
