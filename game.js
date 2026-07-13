import * as THREE from 'three';

// ---------- tiny tween helper (no external animation lib needed) ----------
const easeOutBack = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2; };
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function tween(obj, to, duration, ease = easeInOutQuad, onUpdate) {
  return new Promise((resolve) => {
    const from = {};
    for (const k in to) from[k] = obj[k];
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const e = ease(t);
      for (const k in to) obj[k] = from[k] + (to[k] - from[k]) * e;
      if (onUpdate) onUpdate(obj);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

// ---------- scene setup ----------
const canvas = document.getElementById('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070f);
scene.fog = new THREE.Fog(0x05070f, 6, 14);

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
const cameraBase = new THREE.Vector3(0, 2.5, 6);
camera.position.copy(cameraBase);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// mouse parallax (cheap liveliness, no OrbitControls needed)
const mouse = { x: 0, y: 0 };
addEventListener('pointermove', (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = (e.clientY / innerHeight) * 2 - 1;
});

// ---------- lighting ----------
scene.add(new THREE.AmbientLight(0x404060, 0.6));

const key = new THREE.DirectionalLight(0xffffff, 2);
key.position.set(4, 8, 5);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
scene.add(key);

const cyanLight = new THREE.PointLight(0x00fff0, 6, 8);
cyanLight.position.set(-2.5, 2, 2);
scene.add(cyanLight);

const magentaLight = new THREE.PointLight(0xff00e4, 6, 8);
magentaLight.position.set(2.5, 2, 2);
scene.add(magentaLight);

// ---------- floor + podiums ----------
const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5, 48),
  new THREE.MeshStandardMaterial({ color: 0x0a0d18, roughness: 0.35, metalness: 0.6 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

function makePodium(x, color) {
  const group = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.75, 0.85, 0.35, 32),
    new THREE.MeshStandardMaterial({ color: 0x0d1120, roughness: 0.5, metalness: 0.4 })
  );
  base.position.y = 0.175;
  base.castShadow = base.receiveShadow = true;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.03, 8, 48),
    new THREE.MeshBasicMaterial({ color })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.36;

  group.add(base, ring);
  group.position.x = x;
  scene.add(group);
  return group;
}

makePodium(-1.9, 0x00fff0);
makePodium(1.9, 0xff00e4);

// ---------- procedural shapes ----------
function makeRock() {
  const geo = new THREE.IcosahedronGeometry(0.55, 1);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).multiplyScalar(1 + (Math.random() - 0.5) * 0.15);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: 0x8a8a90, roughness: 0.95, metalness: 0.05, flatShading: true })
  );
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function makePaper() {
  const geo = new THREE.BoxGeometry(1.25, 1.55, 0.04, 6, 6, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const curl = Math.sin((y / 1.55 + 0.5) * Math.PI) * 0.09 * (x / 1.25);
    pos.setZ(i, pos.getZ(i) + curl);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.6, side: THREE.DoubleSide })
  );
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function makeScissors() {
  const group = new THREE.Group();
  const bladeMat = new THREE.MeshStandardMaterial({ color: 0xd7dbe0, roughness: 0.25, metalness: 0.85 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0xff3355, roughness: 0.4, metalness: 0.2 });

  function blade(sign) {
    const g = new THREE.Group();
    const bladeMesh = new THREE.Mesh(new THREE.ConeGeometry(0.11, 1.05, 4), bladeMat);
    bladeMesh.rotation.z = Math.PI / 2;
    bladeMesh.position.x = 0.45;
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.06, 8, 16), handleMat);
    handle.position.x = -0.45;
    g.add(bladeMesh, handle);
    g.rotation.z = sign * 0.28;
    g.traverse((o) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
    return g;
  }

  group.add(blade(1), blade(-1));
  return group;
}

const SHAPES = { rock: makeRock, paper: makePaper, scissors: makeScissors };

// ---------- hand controller ----------
class Hand {
  constructor(x) {
    this.group = new THREE.Group();
    this.group.position.set(x, 1.05, 0);
    scene.add(this.group);
    this.current = null;
    this.setShape('rock', true);
  }

  setShape(name, instant = false) {
    if (this.current) this.group.remove(this.current);
    this.current = SHAPES[name]();
    this.group.add(this.current);
    if (instant) return Promise.resolve();
    this.current.scale.setScalar(0.001);
    return tween(this.current.scale, { x: 1, y: 1, z: 1 }, 260, easeOutBack);
  }

  async punch() {
    await tween(this.group.position, { y: 0.75 }, 110, easeInOutQuad);
    await tween(this.group.position, { y: 1.05 }, 140, easeInOutQuad);
  }

  async win() {
    const meshes = this._meshes();
    meshes.forEach((m) => (m.material.emissive = new THREE.Color(0x00fff0)));
    await tween(this.group.scale, { x: 1.25, y: 1.25, z: 1.25 }, 200, easeOutBack);
    const glow = { v: 0 };
    const applyGlow = () => meshes.forEach((m) => (m.material.emissiveIntensity = glow.v));
    for (let i = 0; i < 2; i++) {
      await tween(glow, { v: 1 }, 220, easeInOutQuad, applyGlow);
      await tween(glow, { v: 0 }, 220, easeInOutQuad, applyGlow);
    }
  }

  async lose() {
    const meshes = this._meshes();
    meshes.forEach((m) => (m.material.transparent = true));
    const fade = { v: 1 };
    await tween(fade, { v: 0.25 }, 260, easeInOutQuad, () => meshes.forEach((m) => (m.material.opacity = fade.v)));
  }

  reset() {
    this.group.scale.setScalar(1);
    for (const mesh of this._meshes()) {
      mesh.material.opacity = 1;
      mesh.material.emissiveIntensity = 0;
    }
  }

  idle(t) {
    this.group.position.y = 1.05 + Math.sin(t * 1.6 + this.group.position.x) * 0.05;
    this.group.rotation.y = Math.sin(t * 0.6 + this.group.position.x) * 0.15;
  }

  _meshes() {
    const meshes = [];
    this.current.traverse((o) => { if (o.isMesh) meshes.push(o); });
    return meshes;
  }
}

const player = new Hand(-1.9);
const cpu = new Hand(1.9);

// ---------- sound effects (Web Audio oscillators, no asset files) ----------
let audioCtx;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function beep(freq, duration, { type = 'sine', gain = 0.15, delay = 0 } = {}) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = audioCtx.currentTime + delay;
  env.gain.setValueAtTime(0, t0);
  env.gain.linearRampToValueAtTime(gain, t0 + 0.015);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(env).connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

const sfx = {
  click: () => beep(520, 0.08, { type: 'square', gain: 0.08 }),
  tick: () => beep(440, 0.12, { type: 'triangle' }),
  shoot: () => beep(660, 0.22, { type: 'sawtooth', gain: 0.2 }),
  reveal: () => beep(300, 0.1, { gain: 0.12 }),
  win: () => [523.25, 659.25, 783.99].forEach((f, i) => beep(f, 0.25, { type: 'triangle', gain: 0.16, delay: i * 0.09 })),
  lose: () => [300, 220, 160].forEach((f, i) => beep(f, 0.3, { type: 'sawtooth', gain: 0.14, delay: i * 0.1 })),
  draw: () => [400, 400].forEach((f, i) => beep(f, 0.15, { gain: 0.12, delay: i * 0.14 })),
};

// ---------- game logic (server is authoritative on outcome + score) ----------
const EMOJI = { rock: '🪨', paper: '📄', scissors: '✂️' };
let busy = true; // stays disabled until an opponent connects

const buttons = [...document.querySelectorAll('.choice')];
const banner = document.getElementById('banner');
const playerScoreEl = document.getElementById('playerScore');
const cpuScoreEl = document.getElementById('cpuScore');

function setButtons(enabled) {
  buttons.forEach((b) => (b.disabled = !enabled));
}

async function showBanner(text, ms = 900) {
  banner.textContent = text;
  banner.classList.add('show');
  await sleep(ms);
  banner.classList.remove('show');
}

// Runs once the server confirms both players have chosen.
async function playRound({ choices, outcome, scores }) {
  const myChoice = choices[mySlot];
  const oppChoice = choices[1 - mySlot];

  await player.setShape('rock', true);
  await cpu.setShape('rock', true);
  player.reset();
  cpu.reset();

  const countdownWords = ['Rock', 'Paper', 'Scissors', 'Shoot!'];
  for (const word of countdownWords) {
    banner.textContent = word;
    banner.classList.add('show');
    word === 'Shoot!' ? sfx.shoot() : sfx.tick();
    await Promise.all([player.punch(), cpu.punch()]);
  }
  banner.classList.remove('show');

  await Promise.all([player.setShape(myChoice), cpu.setShape(oppChoice)]);
  sfx.reveal();

  playerScoreEl.textContent = scores[mySlot];
  cpuScoreEl.textContent = scores[1 - mySlot];

  if (outcome === 'draw') {
    sfx.draw();
    await showBanner(`DRAW — both picked ${EMOJI[myChoice]}`, 1100);
  } else if (outcome === mySlot) {
    sfx.win();
    await Promise.all([player.win(), cpu.lose()]);
    await showBanner('YOU WIN THIS ROUND', 1100);
  } else {
    sfx.lose();
    await Promise.all([cpu.win(), player.lose()]);
    await showBanner('OPPONENT WINS THIS ROUND', 1100);
  }

  player.reset();
  cpu.reset();
  busy = false;
  setButtons(true);
}

buttons.forEach((b) => b.addEventListener('click', () => {
  if (busy) return;
  ensureAudio(); // AudioContext needs a user gesture to start — this click is it
  sfx.click();
  busy = true;
  setButtons(false);
  banner.textContent = 'Waiting for opponent…';
  banner.classList.add('show');
  socket.send(JSON.stringify({ type: 'choice', choice: b.dataset.choice }));
}));

// ---------- multiplayer connection ----------
// Same machine (testing) uses the local relay; anywhere else uses the deployed Render service.
const WS_URL = ['localhost', '127.0.0.1'].includes(location.hostname)
  ? 'ws://localhost:8787'
  : 'wss://https://rock-paper-scissor-server-5rsz.onrender.com/';

const lobby = document.getElementById('lobby');
const lobbyStatus = document.getElementById('lobbyStatus');
const createBtn = document.getElementById('createGame');
const joinBtn = document.getElementById('joinGame');
const joinCodeInput = document.getElementById('joinCode');

let socket, mySlot;

// Free-tier hosts (e.g. Render) spin down after idle and take ~30-60s to wake on
// the next request, so a single failed attempt doesn't mean the server is down.
const MAX_CONNECT_ATTEMPTS = 15;

function connect(onOpen) {
  let attempt = 0;

  function tryConnect() {
    attempt++;
    let opened = false;
    socket = new WebSocket(WS_URL);

    socket.onopen = () => { opened = true; onOpen(); };
    socket.onmessage = (e) => handleServerMessage(JSON.parse(e.data));

    socket.onclose = () => {
      if (opened) {
        if (lobby.style.display !== 'none') lobbyStatus.textContent = 'Disconnected.';
        return;
      }
      if (attempt < MAX_CONNECT_ATTEMPTS) {
        lobbyStatus.textContent = `Waking up server… (this can take up to a minute)`;
        setTimeout(tryConnect, 4000);
      } else {
        lobbyStatus.textContent = 'Could not reach the server. Try again in a moment.';
      }
    };
  }

  tryConnect();
}

function handleServerMessage(msg) {
  if (msg.type === 'created') {
    lobbyStatus.innerHTML = `Share this code: <strong>${msg.room}</strong><br>Waiting for opponent…`;
  } else if (msg.type === 'error') {
    lobbyStatus.textContent = msg.message;
  } else if (msg.type === 'start') {
    mySlot = msg.you;
    lobby.style.display = 'none';
    busy = false;
    setButtons(true);
  } else if (msg.type === 'reveal') {
    banner.classList.remove('show');
    playRound(msg);
  } else if (msg.type === 'opponent-left') {
    setButtons(false);
    showBanner('Opponent disconnected', 1800).then(() => location.reload());
  }
}

createBtn.addEventListener('click', () => {
  lobbyStatus.textContent = 'Connecting…';
  connect(() => socket.send(JSON.stringify({ type: 'create' })));
});

joinBtn.addEventListener('click', () => {
  const code = joinCodeInput.value.trim().toUpperCase();
  if (code.length !== 4) { lobbyStatus.textContent = 'Enter the 4-character code.'; return; }
  lobbyStatus.textContent = 'Connecting…';
  connect(() => socket.send(JSON.stringify({ type: 'join', room: code })));
});

// ---------- render loop ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  if (!busy) {
    player.idle(t);
    cpu.idle(t);
  }

  camera.position.x = cameraBase.x + mouse.x * 0.4;
  camera.position.y = cameraBase.y - mouse.y * 0.2;
  camera.lookAt(0, 1, 0);

  renderer.render(scene, camera);
}
animate();
