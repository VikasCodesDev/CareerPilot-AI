import os
import requests
import time

BASE = os.environ.get('VERIFY_BASE_URL', 'http://localhost:3000')

SESSION = requests.Session()

KEY_PATHS = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
    '/dashboard',
    '/dashboard/resume',
]

API_PATHS = [
    '/api/auth/register',
    '/api/auth/forgot',
    '/api/auth/verify',
    '/api/auth/onboarding',
    '/api/auth/providers',
    '/api/auth/session',
    '/api/resume/list',
    '/api/portfolio',
    '/api/roadmap/list',
]


def assert_status(path, expected=None):
    url = BASE + path
    try:
        r = SESSION.options(url, timeout=10)
    except requests.RequestException as exc:
        raise RuntimeError(f'{path}: connection failed: {exc}')
    if expected is None:
        if r.status_code >= 500:
            raise RuntimeError(f'{path}: server error {r.status_code}')
    else:
        if r.status_code != expected:
            raise RuntimeError(f'{path}: expected {expected}, got {r.status_code}')
    return r


def test_basic_pages():
    for p in KEY_PATHS:
        assert_status(p)


def test_api_basic():
    for p in API_PATHS:
        assert_status(p)


def test_register_login():
    # Register a new user via auth API
    url = BASE + '/api/auth/register'
    payload = {
        'name': 'Runtime Tester',
        'email': f'runtime+{int(time.time())}@example.com',
        'password': 'TestPass123',
        'careerGoal': 'Runtime validation',
    }
    r = SESSION.post(url, json=payload, timeout=15)
    if r.status_code not in (200, 201):
        raise RuntimeError(f'register failed {r.status_code}: {r.text}')
    data = r.json()
    if not data.get('success'):
        raise RuntimeError(f'register returned failure: {data}')
    email = payload['email']

    # Send reset link, verify API path responds
    r2 = SESSION.post(BASE + '/api/auth/forgot', json={'email': email}, timeout=15)
    if r2.status_code not in (200, 201):
        raise RuntimeError(f'forgot failed {r2.status_code}: {r2.text}')
    data2 = r2.json()
    if not data2.get('success'):
        raise RuntimeError(f'forgot returned failure: {data2}')

    return email, payload['password']


def run_all():
    print('BASE', BASE)
    test_basic_pages()
    print('basic pages ok')
    test_api_basic()
    print('api basics ok')
    email, password = test_register_login()
    print('register/forgot ok', email)


if __name__ == '__main__':
    run_all()
    print('all runtime checks passed')
