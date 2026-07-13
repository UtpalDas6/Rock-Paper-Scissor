# Rock-Paper-Scissor

A 3D animated, online multiplayer Rock · Paper · Scissors game, built with [Three.js](https://threejs.org) — no client build step. A small Node/WebSocket server relays moves between two players.

## Play

**1. Start the relay server** (needs to run somewhere reachable by both players):

```bash
cd server
npm install
npm start        # listens on ws://localhost:8787
```

**2. Serve the client** (browsers block ES module imports over `file://`):

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. One player clicks **Create Game** and shares the 4-character code; the other enters it under **Join**. Once both are connected, pick a shape — the countdown ("Rock… Paper… Scissors… Shoot!") and reveal play out in 3D for both players, synced by the server. Winner glows, loser fades, score tracks across rounds.

## Deploying for real (two separate devices)

`game.js` picks the relay URL automatically: `localhost` for local testing, otherwise the deployed Render service below. Two pieces to stand up:

### 1. Relay server → Render

This repo includes `render.yaml`, so Render can set it up from a single click:

1. Push this repo to GitHub (already connected to `origin`).
2. On [render.com](https://render.com), sign in with GitHub → **New** → **Blueprint** → pick this repo. Render reads `render.yaml` and creates a free web service named `rock-paper-scissor-server` from the `server/` folder automatically.
3. Once deployed, Render gives it a URL like `https://rock-paper-scissor-server.onrender.com`. If that exact name was taken and Render appended a suffix, update the `WS_URL` fallback in `game.js` to match (it currently assumes the name is available) and push again.

Free-tier Render services spin down after inactivity — the first connection after a while can take ~30s to wake up.

### 2. Client → GitHub Pages

1. On GitHub: repo **Settings → Pages → Source: Deploy from a branch → `main` / root**.
2. Save. GitHub serves `index.html` at `https://utpaldas6.github.io/Rock-Paper-Scissor/`.

That's it — no build step for the client, and Render redeploys the server automatically on every push.

## Files

- `index.html` / `style.css` — page shell, lobby, and UI overlay
- `game.js` — scene, procedural rock/paper/scissors geometry, sound effects, and multiplayer client
- `server/server.js` — WebSocket relay: room codes, matchmaking, and authoritative round outcome
- `render.yaml` — Render Blueprint for one-click server deploy
- `game.py` — original terminal two-player version
