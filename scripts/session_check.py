import json
import urllib.parse
import urllib.request
import http.cookiejar
import time

base = "http://localhost:3000"
email = f"runtime_test_{int(time.time())}@example.com"

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(
    urllib.request.HTTPCookieProcessor(cj),
    urllib.request.HTTPRedirectHandler(),
)

print('register', email)
register_data = json.dumps({
    'name': 'Runtime Verifier',
    'email': email,
    'password': 'TestPass123',
    'careerGoal': 'Verify session',
}).encode('utf-8')
register_req = urllib.request.Request(
    base + '/api/auth/register',
    data=register_data,
    headers={'Content-Type': 'application/json'},
)
with opener.open(register_req, timeout=15) as resp:
    print('register status', resp.status)
    print(resp.read().decode('utf-8')[:500])

with opener.open(base + '/api/auth/csrf', timeout=15) as resp:
    csrf_body = json.loads(resp.read().decode('utf-8'))
    csrf_token = csrf_body['csrfToken']
    print('csrf', csrf_token)

signin_data = urllib.parse.urlencode({
    'csrfToken': csrf_token,
    'callbackUrl': '/dashboard',
    'json': True,
    'email': email,
    'password': 'TestPass123',
}).encode('utf-8')
signin_req = urllib.request.Request(
    base + '/api/auth/callback/credentials',
    data=signin_data,
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
)
with opener.open(signin_req, timeout=15) as resp:
    print('signin status', resp.status)
    print('signin headers', {k: v for k, v in resp.headers.items() if k.lower() in ['location', 'content-type']})
    print(resp.read().decode('utf-8')[:500])

with opener.open(base + '/api/auth/session', timeout=15) as resp:
    session_body = resp.read().decode('utf-8')
    print('session status', resp.status)
    print('session', session_body)

signout_req = urllib.request.Request(
    base + '/api/auth/signout',
    data=urllib.parse.urlencode({'callbackUrl': '/'}).encode('utf-8'),
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
    method='POST',
)
signout_data = urllib.parse.urlencode({
    'csrfToken': csrf_token,
    'callbackUrl': '/',
    'json': True,
}).encode('utf-8')
signout_req = urllib.request.Request(
    base + '/api/auth/signout',
    data=signout_data,
    headers={'Content-Type': 'application/x-www-form-urlencoded'},
    method='POST',
)
with opener.open(signout_req, timeout=15) as resp:
    print('signout status', resp.status)
    print('signout headers', {k: v for k, v in resp.headers.items() if k.lower() in ['location', 'content-type']})
    print(resp.read().decode('utf-8')[:500])

with opener.open(base + '/api/auth/session', timeout=15) as resp:
    session_body = resp.read().decode('utf-8')
    print('session after signout status', resp.status)
    print('session after signout', session_body)
