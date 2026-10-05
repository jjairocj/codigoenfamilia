import urllib.request
import urllib.error
import json
import glob
import re

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

# Also add all routes from sitemap if any
print(f"Total internal link occurrences: {len(internal_links)}")
print(f"Total external link occurrences: {len(external_links)}")

unique_paths = sorted(list({p[0] for p in internal_links}))

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        return fp
    http_error_301 = http_error_302
    http_error_307 = http_error_302
    http_error_308 = http_error_302

opener = urllib.request.build_opener(NoRedirectHandler)

broken_links = []
redirects = []
ok_links = []

for p in unique_paths:
    url = f"https://codigoenfamilia.org{p}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 LinkAuditor"})
    try:
        resp = opener.open(req, timeout=10)
        status = getattr(resp, "status", getattr(resp, "code", 200))
        if status in (301, 302, 307, 308):
            loc = resp.headers.get("Location")
            redirects.append((p, status, loc))
        elif status == 200:
            ok_links.append(p)
        else:
            broken_links.append((p, status, None))
    except urllib.error.HTTPError as e:
        broken_links.append((p, e.code, None))
    except Exception as e:
        broken_links.append((p, str(e), None))

print("\n--- RESULTS ---")
print(f"OK (200): {len(ok_links)}")
print(f"REDIRECTS (30x): {len(redirects)}")
for p, st, loc in redirects:
    print(f"  [REDIRECT {st}] {p} -> {loc}")

print(f"BROKEN / ERRORS: {len(broken_links)}")
for p, st, _ in broken_links:
    # find occurrences
    files = [f for path, f in internal_links if path == p]
    short_files = [f.replace(project_dir, "") for f in files]
    print(f"  [ERROR {st}] {p} (Found in: {', '.join(short_files)})")
