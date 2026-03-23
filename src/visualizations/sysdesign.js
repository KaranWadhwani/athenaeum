import { colors as C, fonts } from '../styles/theme';
const ft = fonts.body;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

function dashedLine(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  ctx.strokeStyle = color || C.bd; ctx.lineWidth = width || 1.5;
  ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
}

// Module 0: The System Design Framework
function sd_framework(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const steps = [
    { label: 'REQUIREMENTS', sub: 'What & how many?', color: C.blue },
    { label: 'ESTIMATION', sub: 'Back-of-envelope', color: C.purple },
    { label: 'HIGH-LEVEL', sub: 'Boxes & arrows', color: C.gold },
    { label: 'DEEP DIVE', sub: 'Zoom into hard parts', color: C.green },
    { label: 'TRADEOFFS', sub: 'Name the costs', color: C.red },
  ];

  const stepW = (W - 40) / steps.length;
  const cy = H * 0.45;

  steps.forEach((s, i) => {
    const x = 20 + i * stepW + stepW / 2;

    // connector arrow
    if (i > 0) {
      const px = 20 + (i - 1) * stepW + stepW / 2;
      dashedLine(ctx, px + 32, cy, x - 32, cy, s.color + '60', 2);
      // arrowhead
      ctx.beginPath();
      ctx.moveTo(x - 36, cy - 4); ctx.lineTo(x - 30, cy); ctx.lineTo(x - 36, cy + 4);
      ctx.strokeStyle = s.color; ctx.lineWidth = 1.5; ctx.stroke();
    }

    // circle
    ctx.beginPath(); ctx.arc(x, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = s.color + '22'; ctx.fill();
    ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.stroke();

    // number
    ctx.fillStyle = s.color; ctx.font = `bold 14px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(i + 1, x, cy + 5);

    // label
    ctx.fillStyle = C.cream; ctx.font = `bold 10px ${ft}`;
    ctx.fillText(s.label, x, cy - 36);
    ctx.fillStyle = C.creamF; ctx.font = `9px ${ft}`;
    ctx.fillText(s.sub, x, cy + 42);
  });

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Every system design follows these 5 steps', W / 2, H - 8);
  ctx.textAlign = 'left';
}

// Module 1: SQL vs NoSQL Decision Tree
function sd_db_decision(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const nodes = [
    { x: 0.5, y: 0.1, label: 'Access Pattern?', color: C.gold, w: 110, h: 28 },
    { x: 0.18, y: 0.35, label: 'Need JOINs?', color: C.blue, w: 90, h: 24 },
    { x: 0.5, y: 0.35, label: 'Key-value?', color: C.green, w: 90, h: 24 },
    { x: 0.82, y: 0.35, label: 'Time-series?', color: C.purple, w: 90, h: 24 },
    // leaves
    { x: 0.1, y: 0.65, label: 'PostgreSQL\nMySQL', color: C.blue, w: 80, h: 34 },
    { x: 0.3, y: 0.65, label: 'MongoDB\nDynamoDB', color: C.gold, w: 80, h: 34 },
    { x: 0.5, y: 0.65, label: 'Redis\nMemcached', color: C.green, w: 80, h: 34 },
    { x: 0.7, y: 0.65, label: 'Elasticsearch', color: C.accent, w: 80, h: 34 },
    { x: 0.9, y: 0.65, label: 'TimescaleDB\nInfluxDB', color: C.purple, w: 80, h: 34 },
  ];

  // edges
  const edges = [[0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[3,7],[3,8]];
  edges.forEach(([a, b]) => {
    dashedLine(ctx, nodes[a].x * W, nodes[a].y * H + 14, nodes[b].x * W, nodes[b].y * H - 14, C.bd);
  });

  nodes.forEach((n) => {
    const x = n.x * W - n.w / 2, y = n.y * H - n.h / 2;
    ctx.fillStyle = n.color + '18'; ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, n.w, n.h, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 9px ${ft}`; ctx.textAlign = 'center';
    const lines = n.label.split('\n');
    lines.forEach((l, i) => {
      ctx.fillText(l, n.x * W, n.y * H - (lines.length - 1) * 5 + i * 12 + 3);
    });
  });

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Access pattern determines the database — not the other way around', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 2: Cache Aside Pattern
function sd_cache_aside(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const boxes = [
    { x: 0.15, y: 0.4, label: 'Client', color: C.creamF, w: 70, h: 36 },
    { x: 0.5, y: 0.2, label: 'Cache (Redis)', color: C.red, w: 100, h: 36 },
    { x: 0.5, y: 0.65, label: 'Database', color: C.blue, w: 100, h: 36 },
    { x: 0.85, y: 0.4, label: 'Response', color: C.green, w: 70, h: 36 },
  ];

  // flow arrows
  const flows = [
    { from: 0, to: 1, label: '1. Check cache', color: C.gold },
    { from: 1, to: 3, label: 'HIT → return (1ms)', color: C.green },
    { from: 1, to: 2, label: '2. MISS → query DB', color: C.red },
    { from: 2, to: 1, label: '3. Store in cache', color: C.purple },
    { from: 2, to: 3, label: '4. Return (200ms)', color: C.blue },
  ];

  flows.forEach((f) => {
    const a = boxes[f.from], b = boxes[f.to];
    dashedLine(ctx, a.x * W, a.y * H, b.x * W, b.y * H, f.color + '60', 1.5);
    // label
    const mx = (a.x * W + b.x * W) / 2, my = (a.y * H + b.y * H) / 2;
    ctx.fillStyle = f.color; ctx.font = `8px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(f.label, mx, my - 4);
  });

  boxes.forEach((b) => {
    const x = b.x * W - b.w / 2, y = b.y * H - b.h / 2;
    ctx.fillStyle = b.color + '22'; ctx.strokeStyle = b.color; ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, b.w, b.h, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 10px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(b.label, b.x * W, b.y * H + 4);
  });

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Cache-aside: check cache first, populate on miss, invalidate on write', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 3: Load Balancing Algorithms
function sd_load_balancer(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // LB
  const lbX = W * 0.2, lbY = H * 0.5;
  ctx.fillStyle = C.gold + '22'; ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
  roundRect(ctx, lbX - 50, lbY - 24, 100, 48, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Load', lbX, lbY - 4); ctx.fillText('Balancer', lbX, lbY + 10);

  // clients
  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  for (let i = 0; i < 3; i++) {
    const cy = H * (0.2 + i * 0.3);
    ctx.fillText('→', W * 0.05, cy + 3);
    ctx.fillText('req', W * 0.08, cy + 3);
    dashedLine(ctx, W * 0.12, cy, lbX - 52, lbY, C.creamF + '40');
  }

  // servers
  const servers = [
    { y: 0.18, label: 'Server 1', load: '25%', color: C.green },
    { y: 0.38, label: 'Server 2', load: '25%', color: C.green },
    { y: 0.58, label: 'Server 3', load: '25%', color: C.green },
    { y: 0.78, label: 'Server 4', load: '25%', color: C.green },
  ];

  servers.forEach((s) => {
    const sx = W * 0.7, sy = s.y * H;
    dashedLine(ctx, lbX + 52, lbY, sx - 40, sy, C.gold + '40');
    ctx.fillStyle = s.color + '18'; ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
    roundRect(ctx, sx - 38, sy - 14, 120, 28, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `10px ${ft}`; ctx.textAlign = 'left';
    ctx.fillText(s.label, sx - 28, sy + 3);
    ctx.fillStyle = s.color; ctx.font = `bold 10px ${ft}`; ctx.textAlign = 'right';
    ctx.fillText(s.load, sx + 76, sy + 3);
  });

  // algorithms
  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Round Robin: 1→2→3→4→1... | Least Connections: send to least busy', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 4: Sync vs Async Architecture
function sd_async(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const hw = W / 2 - 8;

  // SYNC side
  ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Synchronous (4.3s)', hw / 2, 16);
  const syncSteps = ['Validate', 'Charge Card', 'Update DB', 'Send Email', 'Notify', 'Analytics'];
  const syncColors = [C.green, C.red, C.blue, C.red, C.purple, C.creamF];
  let sy = 28;
  syncSteps.forEach((s, i) => {
    ctx.fillStyle = syncColors[i] + '22'; ctx.strokeStyle = syncColors[i]; ctx.lineWidth = 1;
    roundRect(ctx, 10, sy, hw - 20, 18, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(s, hw / 2, sy + 12);
    if (i < syncSteps.length - 1) {
      ctx.fillStyle = C.creamF; ctx.fillText('↓', hw / 2, sy + 22);
    }
    sy += 23;
  });
  ctx.fillStyle = C.red; ctx.font = `bold 9px ${ft}`;
  ctx.fillText('User waits for ALL steps', hw / 2, H - 8);

  // ASYNC side
  const ox = hw + 16;
  ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`;
  ctx.fillText('Asynchronous (0.3s)', ox + hw / 2, 16);

  // Critical path
  ctx.fillStyle = C.green + '22'; ctx.strokeStyle = C.green; ctx.lineWidth = 1;
  roundRect(ctx, ox + 10, 28, hw - 20, 18, 4); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`;
  ctx.fillText('Validate + Charge + DB (critical)', ox + hw / 2, 40);

  // Queue
  ctx.fillStyle = C.gold + '22'; ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5;
  roundRect(ctx, ox + 10, 54, hw - 20, 18, 4); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.font = `bold 9px ${ft}`;
  ctx.fillText('→ Respond to user + Publish to Queue', ox + hw / 2, 66);

  // Workers
  const workers = ['📧 Email Worker', '🏭 Warehouse Worker', '📊 Analytics Worker'];
  const wColors = [C.purple, C.blue, C.creamF];
  workers.forEach((w, i) => {
    const wy = 82 + i * 24;
    ctx.fillStyle = wColors[i] + '18'; ctx.strokeStyle = wColors[i]; ctx.lineWidth = 1;
    roundRect(ctx, ox + 20, wy, hw - 40, 18, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`;
    ctx.fillText(w, ox + hw / 2, wy + 12);
  });
  ctx.fillStyle = C.green; ctx.font = `bold 9px ${ft}`;
  ctx.fillText('User gets response in 0.3s', ox + hw / 2, H - 8);
  ctx.textAlign = 'left';
}

// Module 5: Monolith vs Microservices
function sd_mono_vs_micro(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const hw = W / 2 - 10;

  // Monolith
  ctx.fillStyle = C.cream; ctx.font = `bold 12px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Monolith', hw / 2, 16);
  ctx.fillStyle = C.blue + '12'; ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
  roundRect(ctx, 16, 26, hw - 32, H - 42, 10); ctx.fill(); ctx.stroke();
  const monoModules = ['Auth', 'Orders', 'Payments', 'Email', 'Analytics'];
  monoModules.forEach((m, i) => {
    const my = 40 + i * ((H - 60) / monoModules.length);
    ctx.fillStyle = C.blue + '30';
    roundRect(ctx, 28, my, hw - 56, 18, 4); ctx.fill();
    ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`; ctx.fillText(m, hw / 2, my + 12);
  });
  ctx.fillStyle = C.blue; ctx.font = `9px ${ft}`;
  ctx.fillText('1 deploy, 1 database', hw / 2, H - 8);

  // Microservices
  const ox = hw + 20;
  ctx.fillStyle = C.cream; ctx.font = `bold 12px ${ft}`;
  ctx.fillText('Microservices', ox + hw / 2, 16);
  const services = [
    { x: 0.25, y: 0.28, label: 'Auth', color: C.green },
    { x: 0.75, y: 0.28, label: 'Orders', color: C.gold },
    { x: 0.25, y: 0.55, label: 'Payments', color: C.red },
    { x: 0.75, y: 0.55, label: 'Email', color: C.purple },
    { x: 0.5, y: 0.78, label: 'Analytics', color: C.accent },
  ];
  // connections
  const conns = [[0,1],[0,2],[1,2],[1,3],[1,4],[2,4]];
  conns.forEach(([a, b]) => {
    const sa = services[a], sb = services[b];
    dashedLine(ctx, ox + sa.x * hw, sa.y * H, ox + sb.x * hw, sb.y * H, C.bd + '60', 1);
  });
  services.forEach((s) => {
    const sx = ox + s.x * hw, sy = s.y * H;
    ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2);
    ctx.fillStyle = s.color + '22'; ctx.fill();
    ctx.strokeStyle = s.color; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 9px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(s.label, sx, sy + 3);
  });
  ctx.fillStyle = C.gold; ctx.font = `9px ${ft}`;
  ctx.fillText('Independent deploy + DB each', ox + hw / 2, H - 8);
  ctx.textAlign = 'left';
}

// Module 6: URL Shortener Architecture
function sd_url_shortener(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const nodes = [
    { x: 0.08, y: 0.5, label: 'Client', color: C.creamF, w: 56, h: 30 },
    { x: 0.27, y: 0.5, label: 'Load\nBalancer', color: C.gold, w: 70, h: 36 },
    { x: 0.5, y: 0.5, label: 'App\nServers', color: C.blue, w: 70, h: 36 },
    { x: 0.73, y: 0.25, label: 'Redis\nCache', color: C.red, w: 70, h: 36 },
    { x: 0.73, y: 0.75, label: 'Database', color: C.green, w: 70, h: 36 },
    { x: 0.93, y: 0.5, label: 'Analytics\n(Kafka)', color: C.purple, w: 70, h: 36 },
  ];

  const edges = [[0,1],[1,2],[2,3],[2,4],[3,4],[2,5]];
  edges.forEach(([a, b]) => {
    const na = nodes[a], nb = nodes[b];
    dashedLine(ctx, na.x * W + na.w / 2 - 6, na.y * H, nb.x * W - nb.w / 2 + 6, nb.y * H, C.bd);
  });

  nodes.forEach((n) => {
    const x = n.x * W - n.w / 2, y = n.y * H - n.h / 2;
    ctx.fillStyle = n.color + '18'; ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, n.w, n.h, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 9px ${ft}`; ctx.textAlign = 'center';
    n.label.split('\n').forEach((l, i) => {
      ctx.fillText(l, n.x * W, n.y * H - 4 + i * 12);
    });
  });

  // flow labels
  ctx.fillStyle = C.green; ctx.font = `8px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('99% cache hit', W * 0.62, H * 0.2);
  ctx.fillStyle = C.creamF;
  ctx.fillText('1% miss → DB', W * 0.62, H * 0.87);

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Read path: Client → LB → App → Cache (1ms) or DB (50ms) → Redirect', W / 2, H - 6);
  ctx.textAlign = 'left';
}

export const sysdesignVisualizations = {
  sd_framework,
  sd_db_decision,
  sd_cache_aside,
  sd_load_balancer,
  sd_async,
  sd_mono_vs_micro,
  sd_url_shortener,
};