import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8787;
const wss = new WebSocketServer({ port: PORT });

// roomCode -> { sockets: [ws|null, ws|null], choices: [choice|null, choice|null], scores: [n, n] }
const rooms = new Map();

const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I ambiguity
function makeCode() {
  let code;
  do {
    code = Array.from({ length: 4 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  } while (rooms.has(code));
  return code;
}

const BEATS = { rock: 'scissors', scissors: 'paper', paper: 'rock' };
const send = (ws, msg) => { if (ws && ws.readyState === ws.OPEN) ws.send(JSON.stringify(msg)); };

wss.on('connection', (ws) => {
  ws.room = null;
  ws.slot = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'create') {
      const code = makeCode();
      rooms.set(code, { sockets: [ws, null], choices: [null, null], scores: [0, 0] });
      ws.room = code;
      ws.slot = 0;
      send(ws, { type: 'created', room: code });
      return;
    }

    if (msg.type === 'join') {
      const code = String(msg.room || '').toUpperCase();
      const room = rooms.get(code);
      if (!room) return send(ws, { type: 'error', message: 'Room not found.' });
      if (room.sockets[1]) return send(ws, { type: 'error', message: 'Room is full.' });
      room.sockets[1] = ws;
      ws.room = code;
      ws.slot = 1;
      room.sockets.forEach((s, i) => send(s, { type: 'start', you: i }));
      return;
    }

    if (msg.type === 'choice' && ws.room) {
      const room = rooms.get(ws.room);
      if (!room) return;
      room.choices[ws.slot] = msg.choice;
      const [a, b] = room.choices;
      if (!a || !b) return; // waiting on the other player

      let outcome = 'draw';
      if (a !== b) outcome = BEATS[a] === b ? 0 : 1; // winning slot index
      if (outcome === 0) room.scores[0]++;
      if (outcome === 1) room.scores[1]++;

      room.sockets.forEach((s) => send(s, { type: 'reveal', choices: [a, b], outcome, scores: room.scores }));
      room.choices = [null, null];
    }
  });

  ws.on('close', () => {
    if (!ws.room) return;
    const room = rooms.get(ws.room);
    if (!room) return;
    room.sockets.forEach((s) => { if (s && s !== ws) send(s, { type: 'opponent-left' }); });
    rooms.delete(ws.room);
  });
});

console.log(`Rock-Paper-Scissors relay listening on ws://localhost:${PORT}`);
