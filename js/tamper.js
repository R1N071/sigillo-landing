// Tamper demo: a real hash chain, computed in the browser with WebCrypto.
// Edit or delete an event, then verify: the chain fails at the exact gap,
// while the sealed authority copy still shows the original intervention.
import { animate, stagger } from 'animejs';

const EVENTS = [
  { time: '13:58:02', payload: 'agent v0.9.3 online, fleet B' },
  { time: '13:59:10', payload: 'config speed_limit zone_B = 1.2 m/s' },
  { time: '14:01:58', payload: 'intervention: operator r.rossi raised speed_limit zone_B to 1.8 m/s (remote)' },
  { time: '14:02:09', payload: 'safety: protective stop near human, aisle 7' },
  { time: '14:02:10', payload: 'state: velocity reached 0.0 m/s in 0.4 s' },
  { time: '14:04:33', payload: 'mission: resumed mission 217' },
  { time: '14:31:02', payload: 'config speed_limit zone_B restored 1.2 m/s' },
  { time: '14:31:05', payload: 'upload: bundle sealed, Merkle root 9f3c41' },
];
const EDITED_PAYLOAD = 'intervention: system auto-tuned speed_limit zone_B to 1.8 m/s';
const EDIT_IDX = 2;  // event 03
const DEL_IDX = 5;   // event 06

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function initTamper() {
  const logEl = document.getElementById('event-log');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const sealedPanel = document.getElementById('sealed-panel');
  const btnEdit = document.getElementById('btn-edit');
  const btnDelete = document.getElementById('btn-delete');
  const btnRestore = document.getElementById('btn-restore');
  const btnVerify = document.getElementById('btn-verify');

  // ---- initial chain (the sealed snapshot) ----
  const sealedHashes = [];
  let prev = 'genesis';
  for (const ev of EVENTS) {
    prev = await sha256Hex(prev + ev.payload);
    sealedHashes.push(prev);
  }

  let deleted = false;
  let edited = false;

  const rows = [];

  function buildRows() {
    rows.length = 0;
    EVENTS.forEach((ev, i) => {
      rows.push({
        seq: i + 1,
        time: ev.time,
        payload: edited && i === EDIT_IDX ? EDITED_PAYLOAD : ev.payload,
        deleted: deleted && i === DEL_IDX,
        sealedHash: sealedHashes[i],
      });
    });
  }

  function render() {
    buildRows();
    logEl.innerHTML = '';
    rows.forEach((r, i) => {
      const li = document.createElement('li');
      li.className = 'event-row' + (r.deleted ? ' deleted' : '');
      li.innerHTML = `
        <span class="ev-seq">${String(r.seq).padStart(2, '0')}</span>
        <span class="ev-time">${r.time}</span>
        <span class="ev-payload">${r.deleted ? '[missing event: sequence break]' : esc(r.payload)}</span>
        <span class="ev-hash">${r.sealedHash.slice(0, 12)}</span>`;
      logEl.appendChild(li);
    });
  }

  const esc = (s) => s.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

  // ---- verification: recompute the chain over what's on disk ----
  async function verify() {
    let prev = 'genesis';
    let broken = false;
    const lis = [...logEl.children];

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const li = lis[i];
      if (r.deleted) {
        broken = true;
        li.classList.add('bad');
        continue;
      }
      if (broken) {
        li.classList.remove('ok');
        li.classList.add('bad');
        continue;
      }
      const h = await sha256Hex(prev + r.payload);
      if (h === r.sealedHash) {
        li.classList.add('ok');
        prev = h;
      } else {
        broken = true;
        li.classList.add('bad');
      }
    }

    if (broken) {
      statusDot.classList.add('broken');
      statusText.textContent = 'Verification fails at the exact gap: the chain is broken';
      sealedPanel.hidden = false;
    } else {
      statusDot.classList.remove('broken');
      statusText.textContent = `Chain intact - 8 events sealed`;
      sealedPanel.hidden = true;
    }
  }

  function entrance() {
    animate('.event-row', {
      opacity: [0, 1],
      translateX: [-14, 0],
      duration: 480,
      delay: stagger(55),
      ease: 'outQuad',
    });
  }

  // ---- actions ----
  btnEdit.addEventListener('click', () => {
    edited = !edited;
    btnEdit.textContent = edited ? 'Undo edit 03' : 'Edit event 03';
    render(); verify();
  });
  btnDelete.addEventListener('click', () => {
    deleted = !deleted;
    btnDelete.textContent = deleted ? 'Restore event 06' : 'Delete event 06';
    render(); verify();
  });
  btnRestore.addEventListener('click', () => {
    edited = false; deleted = false;
    btnEdit.textContent = 'Edit event 03';
    btnDelete.textContent = 'Delete event 06';
    render(); verify();
  });
  btnVerify.addEventListener('click', verify);

  render();
  entrance();
  await verify();
}
