import urllib.request
import urllib.error
import glob
import re
from concurrent.futures import ThreadPoolExecutor

project_dir = "/Volumes/M2 Externo/Code/codigo-en-familia-web"

# Collect all files
json_files = glob.glob(f"{project_dir}/src/data/*.json")
src_files = glob.glob(f"{project_dir}/src/**/*.tsx", recursive=True) + glob.glob(f"{project_dir}/src/**/*.ts", recursive=True)

internal_links = set()
external_links = set()

md_link_pattern = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
href_pattern = re.compile(r"href=[\"']([^\"']+)[\"']")

for jf in json_files:
    with open(jf, "r", encoding="utf-8") as f:
        content = f.read()
        for _, url in md_link_pattern.findall(content):
            if url.startswith("http"):
                external_links.add((url, jf))
            elif url.startswith("/"):
                internal_links.add((url.split("#")[0], jf))

for sf in src_files:
    with open(sf, "r", encoding="utf-8") as f:
        content = f.read()
        for _, url in md_link_pattern.findall(content):
            if url.startswith("http"):
                external_links.add((url, sf))
            elif url.startswith("/"):
                internal_links.add((url.split("#")[0], sf))
        for url in href_pattern.findall(content):
            if url.startswith("http"):
                external_links.add((url, sf))
            elif url.startswith("/"):
                internal_links.add((url.split("#")[0], sf))

unique_paths = sorted(list({p[0] for p in internal_links}))
print(f"Total unique internal paths to test: {len(unique_paths)}", flush=True)

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        return fp
    http_error_301 = http_error_302
    http_error_307 = http_error_302
    http_error_308 = http_error_302

opener = urllib.request.build_opener(NoRedirectHandler)

def check_path(p):
    url = f"https://codigoenfamilia.org{p}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 LinkAuditor"})
    try:
        resp = opener.open(req, timeout=10)
        status = getattr(resp, "status", getattr(resp, "code", 200))
        loc = resp.headers.get("Location")
        return (p, status, loc)
    except urllib.error.HTTPError as e:
        return (p, e.code, None)
    except Exception as e:
        return (p, str(e), None)

results = []
with ThreadPoolExecutor(max_workers=15) as executor:
    for res in executor.map(check_path, unique_paths):
        results.append(res)

broken = []
redirects = []
ok = []

for p, st, loc in results:
    if st in (301, 302, 307, 308):
        redirects.append((p, st, loc))
    elif st == 200:
        ok.append(p)
    else:
        broken.append((p, st, loc))

print(f"\n--- AUDIT COMPLETE ---", flush=True)
print(f"OK (200): {len(ok)}", flush=True)
print(f"REDIRECTS (30x): {len(redirects)}", flush=True)
for p, st, loc in redirects:
    print(f"  [REDIRECT {st}] {p} -> {loc}", flush=True)

print(f"\nBROKEN / ERRORS: {len(broken)}", flush=True)
for p, st, _ in broken:
    files = [f for path, f in internal_links if path == p]
    short_files = [f.replace(project_dir, "") for f in files]
    print(f"  [ERROR {st}] {p}  (Files: {', '.join(short_files)})", flush=True)

# Also test external links
print(f"\nTesting {len(external_links)} unique external links...", flush=True)
ext_urls = sorted(list({u[0] for u in external_links}))

def check_ext(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 LinkAuditor"})
    try:
        resp = urllib.request.urlopen(req, timeout=10)
        return (url, getattr(resp, "status", getattr(resp, "code", 200)))
    except urllib.error.HTTPError as e:
        return (url, e.code)
    except Exception as e:
        return (url, str(e))

with ThreadPoolExecutor(max_workers=5) as executor:
    for url, st in executor.map(check_ext, ext_urls):
        print(f"  External: {url} -> {st}", flush=True)
