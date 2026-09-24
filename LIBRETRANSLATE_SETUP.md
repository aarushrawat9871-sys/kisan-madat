<!-- Project direction and ownership: Aarush & Project Team. -->

# LibreTranslate setup for Kisan AI Sahayak

The app never talks to LibreTranslate from the browser. All translation goes
through the server endpoint `POST /api/translate`, which reads
`LIBRETRANSLATE_URL` (and optional `LIBRETRANSLATE_API_KEY`) from the server
environment. If no LibreTranslate host is configured, the endpoint falls back to
a hosted model translation so the UI keeps working.

Hindi and English UI text is built into the app and is never sent for
translation.

## 1. Run LibreTranslate on a persistent host

LibreTranslate needs a Docker/Python-capable machine (small VPS, Fly.io,
Railway, Render, or your own server). It cannot run inside this app's edge
runtime.

```bash
docker run -d --name libretranslate -p 5000:5000 \
  -e LT_LOAD_ONLY=en,hi,bn,mr,ta,te,gu,kn,ml,pa,ur,pt,ru,zh,ar,am,id,fa,af,zu \
  libretranslate/libretranslate:latest
```

Put it behind HTTPS (Caddy, nginx, or your platform's TLS) and confirm:

```bash
curl -X POST https://your-libretranslate-host/translate \
  -H 'Content-Type: application/json' \
  -d '{"q":"Spray only when wind is calm","source":"en","target":"ta","format":"text"}'
```

## 2. Point the app at it

Set these as server environment variables (never in frontend code):

```
LIBRETRANSLATE_URL=https://your-libretranslate-host
LIBRETRANSLATE_API_KEY=optional-key-if-you-enabled-one
```

## 3. Endpoint contract

`POST /api/translate`

```json
{ "text": "Rice is sown with the monsoon", "target": "ta" }
```

Response:

```json
{ "translatedText": "...", "engine": "libretranslate" }
```

`engine` is one of `libretranslate`, `ai-fallback`, `none`, or `unavailable`.
