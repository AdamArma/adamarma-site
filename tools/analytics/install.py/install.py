#!/usr/bin/env python3
import glob, os, re, shutil, sys

GA4_ID = os.environ.get("GA4_ID", "")
YM_ID = os.environ.get("YANDEX_METRIKA_ID", "")

if not GA4_ID or not YM_ID:
    sys.exit(0)

if not GA4_ID.startswith("G-"):
    sys.exit(1)
if not YM_ID.isdigit():
    sys.exit(1)

SITE = "_site"
dst = os.path.join(SITE, "assets", "analytics", "consent.js")
if not os.path.exists(dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2("tools/analytics/consent.js", dst)

DUP = re.compile(r"googletagmanager\.com|mc\.yandex\.ru|data-ga4=|data-ym=")
tag = f"  &lt;script defer src=\"/assets/analytics/consent.js\" data-ga4=\"{GA4_ID}\" data-ym=\"{YM_ID}\"&gt;&lt;/script&gt;\n"

for f in sorted(glob.glob(os.path.join(SITE, "**", "*.html"), recursive=True)):
    c = open(f).read()
    if DUP.search(c):
        continue
    m = re.search(r"&lt;/head&gt;", c, re.I)
    if not m:
        continue
    open(f, "w").write(c[:m.start()] + tag + c[m.start():])
