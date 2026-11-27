// The living ledger: a monumental column of machine events streaming up the
// hero. Periodically one line is tampered with - the text itself changes,
// a crimson slash cuts it, newer lines fracture red - then the sealed
// original materializes and a stamp band re-certifies the wall. Pure 2D.
export function initLedger(canvas) {
  const ctx = canvas.getContext('2d');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let x0 = 0, x1 = 0, topPad = 0, lineH = 0, fontSize = 0, wallAlpha = 1, wide = true;
  let px = 0, py = 0, tpx = 0, tpy = 0;
  let t = 0, dt = 0.016;
  const FEED = 1.1;
  let feedT = 0;

  if (!REDUCED) {
    addEventListener('pointermove', (e) => {
      tpx = (e.clientX / innerWidth - 0.5) * 2;
      tpy = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  const FONT = (pxv) => `${pxv}px "IBM Plex Mono", ui-monospace, monospace`;

  function place() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    wide = W / H > 1.05;
    if (wide) {
      x0 = Math.max(W * 0.52, 640);
      x1 = W - Math.max(W * 0.045, 40);
      topPad = 132;
      lineH = Math.max(20, Math.min(24, H / 40));
      fontSize = Math.max(11, Math.min(13, lineH * 0.6));
      wallAlpha = 1;
    } else {
      x0 = 26;
      x1 = W - 26;
      topPad = 84;
      lineH = Math.max(17, Math.min(21, H / 46));
      fontSize = Math.max(9, Math.min(11, lineH * 0.58));
      wallAlpha = 0.45; // ambient behind the copy
    }
  }
  place();
  new ResizeObserver(place).observe(canvas);

  // ---------- event vocabulary ----------
  const NAMES = ['r.rossi', 'm.bianchi', 'fleet-ops', 'svc/ota'];
  const ZONES = ['B', 'C', 'D7', 'aisle 4'];
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  function hex(n) {
    let s = '';
    for (let i = 0; i < n; i++) s += '0123456789abcdef'[Math.floor(Math.random() * 16)];
    return s;
  }
  let clockS = 13 * 3600 + 58 * 60 + 2;
  let seqN = 2891;
  function fmtClock() {
    const h = Math.floor(clockS / 3600) % 24;
    const m = Math.floor(clockS / 60) % 60;
    const s = Math.floor(clockS) % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  const TEMPLATES = [
    () => `mcap slice ${(8 + Math.random() * 30).toFixed(1)}s  ros2 /nav2`,
    () => `speed_limit zone_${rnd(ZONES)} := ${(0.8 + Math.random() * 1.6).toFixed(1)} m/s`,
    () => `operator ${rnd(NAMES)}  remote param change`,
    () => `protective_stop  ${rnd(ZONES)}  v 0.0 in 0.${3 + Math.floor(Math.random() * 5)}s`,
    () => `mission_resume  dock ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
    () => `hash root sealed  ecdsa p-256  tpm`,
    () => `rfc3161 timestamp  2026-11-27T${fmtClock()}Z`,
    () => `cpn fitness ${(0.93 + Math.random() * 0.06).toFixed(3)}  dev:0`,
    () => `odom=imu=slam  delta ${Math.floor(Math.random() * 40)}mm`,
    () => `zone_entry  human_present  ${(0.4 + Math.random() * 0.8).toFixed(1)} m/s`,
    () => `worm segment locked  retention 5y`,
    () => `ota signed  agent v0.9.${Math.floor(Math.random() * 9)}`,
    () => `vda5050 order  state: ${rnd(['ACTIVE', 'PAUSED', 'CHARGING'])}`,
    () => `merkle proof ok  depth ${Math.floor(Math.random() * 12) + 8}`,
    () => `evidence bundle queued  annex III 1.1.9`,
  ];
  function newLine() {
    return {
      ts: fmtClock(),
      seq: seqN++,
      text: TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)](),
      hash: hex(4),
      corrupt: 0,
    };
  }

  // ---------- the wall ----------
  const lines = [];
  for (let i = 0; i < 90; i++) lines.push(newLine());

  // ---------- the tamper story ----------
  const T = { COOLDOWN: 7, GLITCH: 0.7, STRIKE: 0.55, TENSION: 1.7, SEALED: 1.1, STAMP: 1.1 };
  let phase = 'cool';
  let phaseT = 0;
  let nextIn = 4;
  let tamperIdx = -1;
  let tamperLine = null;
  let sealedText = '';
  let glitchBase = '';
  const GL = '0123456789abcdef#$%&';
  let stampY = 0;

  function visibleCount() {
    return Math.max(6, Math.floor((H - topPad - 30) / lineH));
  }

  function alterText(txt) {
    if (/operator \S+/.test(txt)) return txt.replace(/operator \S+/, 'system auto-tune');
    if (/:= [\d.]+/.test(txt)) return txt.replace(/:= [\d.]+/, ':= 1.2');
    if (/delta \d+mm/.test(txt)) return txt.replace(/delta \d+mm/, 'delta 0mm');
    if (/dev:0/.test(txt)) return txt.replace(/dev:0/, 'dev:?');
    return txt.replace(/  /, '  [redacted] ');
  }

  function startTamper() {
    const n = visibleCount();
    tamperIdx = Math.floor(n * 0.28) + Math.floor(Math.random() * Math.max(1, Math.floor(n * 0.2)));
    tamperLine = lines[lines.length - 1 - tamperIdx];
    if (!tamperLine || tamperLine.corrupt > 0) { nextIn = 2; tamperIdx = -1; return; }
    sealedText = tamperLine.text;
    glitchBase = tamperLine.text;
    phase = 'glitch';
    phaseT = 0;
  }

  function glitchText(txt) {
    let out = '';
    for (const c of txt) {
      out += (Math.random() < 0.55 && c !== ' ') ? GL[Math.floor(Math.random() * GL.length)] : c;
    }
    return out;
  }

  function stepPhase() {
    phaseT += dt;
    if (phase === 'cool') {
      nextIn -= dt;
      if (nextIn <= 0) startTamper();
    } else if (phase === 'glitch' && phaseT >= T.GLITCH) {
      // the edit lands
      tamperLine.text = alterText(sealedText);
      phase = 'strike'; phaseT = 0;
    } else if (phase === 'strike' && phaseT >= T.STRIKE) {
      phase = 'tension'; phaseT = 0;
    } else if (phase === 'tension' && phaseT >= T.TENSION) {
      phase = 'sealed'; phaseT = 0;
    } else if (phase === 'sealed' && phaseT >= T.SEALED) {
      phase = 'stamp'; phaseT = 0;
      stampY = 0;
    } else if (phase === 'stamp' && phaseT >= T.STAMP) {
      phase = 'cool'; phaseT = 0;
      nextIn = T.COOLDOWN;
      for (const l of lines) l.corrupt = 0;
      tamperIdx = -1;
      tamperLine = null;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const lx = px * 10;
    const ly = py * 6;
    const f = Math.min(1, feedT / FEED);
    const n = visibleCount();
    const nowIdx = lines.length - 1;

    // ledger spine: binding hairline with ticks
    ctx.save();
    ctx.translate(lx, ly);
    ctx.globalAlpha = wallAlpha;
    const spineX = x0 - 26;
    ctx.strokeStyle = 'rgba(229,72,77,0.32)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(spineX, topPad - 22);
    ctx.lineTo(spineX, H - 34);
    ctx.stroke();
    for (let y = topPad - 18; y < H - 40; y += lineH * 2) {
      ctx.strokeStyle = 'rgba(229,72,77,0.18)';
      ctx.beginPath();
      ctx.moveTo(spineX - 5, y);
      ctx.lineTo(spineX, y);
      ctx.stroke();
    }
    ctx.restore();

    // ---------- status line ----------
    ctx.save();
    ctx.translate(lx, ly);
    ctx.font = FONT(fontSize - 1);
    ctx.textBaseline = 'middle';
    let status = `CHAIN OK  ·  ${seqN} EVENTS SEALED`;
    let statusCol = 'rgba(130,178,140,0.95)';
    let dotCol = 'rgba(70,167,88,0.95)';
    if (phase === 'glitch' || phase === 'strike') { status = 'INTERVENTION DETECTED'; statusCol = 'rgba(255,99,105,0.95)'; dotCol = 'rgba(255,99,105,1)'; }
    if (phase === 'tension') { status = `CHAIN BROKEN AT SEQ ${tamperLine ? String(tamperLine.seq).padStart(5, '0') : ''}`; statusCol = 'rgba(255,99,105,1)'; dotCol = 'rgba(255,99,105,1)'; }
    if (phase === 'sealed' || phase === 'stamp') { status = 'SEALED ORIGINAL VERIFIED  ·  RFC3161'; statusCol = 'rgba(255,180,182,1)'; dotCol = 'rgba(255,180,182,1)'; }
    ctx.fillStyle = dotCol;
    ctx.beginPath(); ctx.arc(x0 - 12, topPad - 44, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = statusCol;
    ctx.fillText(status, x0, topPad - 44);
    ctx.restore();

    // ---------- the wall ----------
    ctx.save();
    ctx.translate(lx, ly);
    ctx.globalAlpha = wallAlpha;
    ctx.font = FONT(fontSize);
    ctx.textBaseline = 'middle';

    for (let v = 0; v < n + 2; v++) {
      const li = nowIdx - v;
      if (li < 0) break;
      const l = lines[li];
      // streaming: newest enters below the fold and rises
      const y = H - 40 - (v - 1 + f) * lineH;
      if (y < topPad - 12) break;

      const isTamper = phase !== 'cool' && tamperIdx >= 0 && li === nowIdx - tamperIdx;
      const below = tamperIdx >= 0 && li > nowIdx - tamperIdx;
      const dist = below ? li - (nowIdx - tamperIdx) : 0;

      // cascade corruption on newer lines
      if (below && phase !== 'cool') {
        if (phase === 'strike') {
          l.corrupt = Math.max(l.corrupt, Math.min(1, phaseT * 2.6 - dist * 0.09));
        } else if (phase === 'tension' || phase === 'sealed') {
          l.corrupt = Math.max(l.corrupt, Math.min(1, 1 - dist * 0.07));
        } else if (phase === 'stamp') {
          const vBand = tamperIdx * (1 - stampY);
          if (v >= vBand) l.corrupt *= Math.exp(-dt * 7);
        }
      }

      const shift = l.corrupt * 7;
      const x = x0 + shift;
      const bodyX = x + fontSize * 9.2;

      // timestamp + seq
      ctx.fillStyle = `rgba(110,109,104,${0.55})`;
      ctx.fillText(l.ts, x, y);
      ctx.fillStyle = `rgba(110,109,104,${0.7})`;
      ctx.fillText(String(l.seq).padStart(5, '0'), x + fontSize * 5.8, y);

      // body
      let body = l.text;
      if (isTamper && phase === 'glitch') body = glitchText(glitchBase);

      if (isTamper && phase !== 'glitch') {
        ctx.fillStyle = 'rgba(255,99,105,0.96)';
        ctx.fillText(body, bodyX, y);
        const bw = ctx.measureText(body).width;
        if (phase === 'strike' || phase === 'tension') {
          ctx.save();
          ctx.strokeStyle = 'rgba(255,99,105,0.95)';
          ctx.shadowColor = 'rgba(255,99,105,0.9)';
          ctx.shadowBlur = 8;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(bodyX - 4, y - fontSize * 0.6);
          ctx.lineTo(bodyX + bw + 4, y + fontSize * 0.6);
          ctx.stroke();
          ctx.restore();
        }
      } else {
        let r = 154, g = 152, b = 143;
        if (l.corrupt > 0.02) {
          r = Math.round(154 + (255 - 154) * l.corrupt);
          g = Math.round(152 + (99 - 152) * l.corrupt);
          b = Math.round(143 + (105 - 143) * l.corrupt);
        }
        ctx.fillStyle = `rgba(${r},${g},${b},0.92)`;
        ctx.fillText(body, bodyX, y);
      }

      // hash tail
      const bw2 = ctx.measureText(body).width;
      ctx.fillStyle = `rgba(92,91,85,${Math.max(0.3, 0.8 - l.corrupt * 0.4)})`;
      ctx.fillText('· ' + l.hash, bodyX + bw2 + fontSize * 1.2, y);
      if (bw2 > (x1 - x0) - fontSize * 14) {
        // long line: skip the tail to stay in the column
        ctx.fillStyle = 'rgba(0,0,0,0)';
      }

      // sealed original under the tampered line
      if (isTamper && (phase === 'sealed' || phase === 'stamp')) {
        const a = phase === 'sealed' ? Math.min(1, phaseT * 1.8) : 1;
        const sy = y + lineH * 0.95;
        ctx.save();
        ctx.globalAlpha = wallAlpha * a;
        // seal mark
        ctx.strokeStyle = 'rgba(255,99,105,0.95)';
        ctx.shadowColor = 'rgba(255,99,105,0.9)';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(x + 5, sy, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,99,105,0.9)';
        ctx.beginPath();
        ctx.arc(x + 5, sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = wallAlpha * a;
        ctx.fillStyle = 'rgba(255,233,233,0.98)';
        ctx.fillText(sealedText, bodyX, sy);
        const ow = ctx.measureText(sealedText).width;
        ctx.fillStyle = `rgba(255,99,105,${0.9})`;
        ctx.fillText('SEALED', bodyX + ow + fontSize * 1.4, sy);
        ctx.restore();
      }
    }

    // fracture crack between the tampered line and the corrupted ones
    if ((phase === 'strike' || phase === 'tension' || phase === 'sealed') && tamperIdx >= 0) {
      const yF = H - 40 - (tamperIdx - 1 + f) * lineH + lineH * 0.55;
      const grow = phase === 'strike' ? Math.min(1, phaseT * 3) : 1;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,99,105,0.7)';
      ctx.shadowColor = 'rgba(255,99,105,0.8)';
      ctx.shadowBlur = 9;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const xs = x0 - 20;
      ctx.moveTo(xs, yF);
      let cx = xs, cy = yF;
      const len = (x1 - x0 + 26) * grow;
      while (cx < xs + len) {
        cx += 24 + Math.random() * 20;
        cy += (Math.random() - 0.5) * 7;
        ctx.lineTo(Math.min(cx, xs + len), cy);
      }
      ctx.stroke();
      ctx.restore();
    }

    // stamp band sweeping down, re-certifying the wall
    if (phase === 'stamp' && tamperIdx >= 0) {
      stampY = Math.min(1, phaseT / (T.STAMP * 0.75));
      const tamY = H - 40 - (tamperIdx - 1 + f) * lineH + lineH * 0.55;
      const bandY = tamY + stampY * (H + 60 - tamY);
      ctx.save();
      ctx.globalAlpha = wallAlpha;
      const g = ctx.createLinearGradient(0, bandY - 26, 0, bandY + 26);
      g.addColorStop(0, 'rgba(255,99,105,0)');
      g.addColorStop(0.5, 'rgba(255,99,105,0.2)');
      g.addColorStop(1, 'rgba(255,99,105,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x0 - 30, bandY - 26, (x1 - x0) + 60, 52);
      ctx.strokeStyle = 'rgba(255,130,135,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0 - 30, bandY);
      ctx.lineTo(x1 + 30, bandY);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 }).observe(canvas);

  let last = performance.now();
  function frame(now) {
    dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    t += dt;
    clockS += dt;
    feedT += dt;
    if (feedT >= FEED) {
      feedT -= FEED;
      lines.push(newLine());
      if (lines.length > 130) lines.splice(0, lines.length - 130);
    }
    stepPhase();
    draw();
  }

  if (REDUCED) {
    phase = 'sealed'; phaseT = 0.8;
    const n0 = visibleCount();
    tamperIdx = Math.floor(n0 * 0.4);
    tamperLine = lines[lines.length - 1 - tamperIdx];
    sealedText = tamperLine.text;
    tamperLine.text = alterText(sealedText);
    draw();
  } else {
    const loop = (now) => {
      if (running && !document.hidden) {
        px += (tpx - px) * 0.05;
        py += (tpy - py) * 0.05;
        frame(now);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
