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

// Module 0: ETL vs ELT
function de_etl_vs_elt(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const hw = W / 2 - 8;

  // ETL
  ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('ETL (Traditional)', hw / 2, 16);
  const etlSteps = [
    { label: 'Extract', sub: 'from sources', color: C.blue },
    { label: 'Transform', sub: 'in processing engine', color: C.red },
    { label: 'Load', sub: 'into warehouse', color: C.green },
  ];
  etlSteps.forEach((s, i) => {
    const y = 32 + i * (H - 52) / 3;
    if (i > 0) {
      ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`; ctx.fillText('↓', hw / 2, y - 6);
    }
    ctx.fillStyle = s.color + '22'; ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
    roundRect(ctx, 16, y, hw - 32, 28, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 10px ${ft}`;
    ctx.fillText(s.label, hw / 2 - 20, y + 14);
    ctx.fillStyle = C.creamF; ctx.font = `9px ${ft}`;
    ctx.fillText(s.sub, hw / 2 + 36, y + 14);
  });
  ctx.fillStyle = C.red; ctx.font = `9px ${ft}`;
  ctx.fillText('Transform BEFORE load', hw / 2, H - 8);

  // ELT
  const ox = hw + 16;
  ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`;
  ctx.fillText('ELT (Modern)', ox + hw / 2, 16);
  const eltSteps = [
    { label: 'Extract', sub: 'from sources', color: C.blue },
    { label: 'Load', sub: 'RAW into lake', color: C.green },
    { label: 'Transform', sub: 'using SQL/Spark', color: C.gold },
  ];
  eltSteps.forEach((s, i) => {
    const y = 32 + i * (H - 52) / 3;
    if (i > 0) {
      ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`; ctx.fillText('↓', ox + hw / 2, y - 6);
    }
    ctx.fillStyle = s.color + '22'; ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
    roundRect(ctx, ox + 16, y, hw - 32, 28, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 10px ${ft}`;
    ctx.fillText(s.label, ox + hw / 2 - 20, y + 14);
    ctx.fillStyle = C.creamF; ctx.font = `9px ${ft}`;
    ctx.fillText(s.sub, ox + hw / 2 + 36, y + 14);
  });
  ctx.fillStyle = C.green; ctx.font = `9px ${ft}`;
  ctx.fillText('Load first, transform later', ox + hw / 2, H - 8);
  ctx.textAlign = 'left';
}

// Module 1: Star Schema
function de_star_schema(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Fact table (center)
  const fx = W * 0.5, fy = H * 0.5;
  ctx.fillStyle = C.gold + '22'; ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
  roundRect(ctx, fx - 55, fy - 30, 110, 60, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('fact_orders', fx, fy - 10);
  ctx.fillStyle = C.creamF; ctx.font = `8px ${ft}`;
  ctx.fillText('order_id, amount', fx, fy + 4);
  ctx.fillText('date_key, prod_key', fx, fy + 16);

  // Dimension tables (star points)
  const dims = [
    { x: 0.15, y: 0.2, label: 'dim_date', fields: 'month, year', color: C.blue },
    { x: 0.85, y: 0.2, label: 'dim_product', fields: 'name, category', color: C.green },
    { x: 0.15, y: 0.8, label: 'dim_customer', fields: 'name, segment', color: C.purple },
    { x: 0.85, y: 0.8, label: 'dim_store', fields: 'city, region', color: C.red },
  ];

  dims.forEach((d) => {
    // connector
    dashedLine(ctx, fx, fy, d.x * W, d.y * H, d.color + '50', 1.5);

    const dw = 90, dh = 40;
    ctx.fillStyle = d.color + '18'; ctx.strokeStyle = d.color; ctx.lineWidth = 1.5;
    roundRect(ctx, d.x * W - dw / 2, d.y * H - dh / 2, dw, dh, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 9px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(d.label, d.x * W, d.y * H - 4);
    ctx.fillStyle = C.creamF; ctx.font = `8px ${ft}`;
    ctx.fillText(d.fields, d.x * W, d.y * H + 10);
  });

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Star schema: fact table (events) + dimension tables (attributes)', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 2: Kafka Architecture
function de_kafka(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Producers
  ctx.fillStyle = C.cream; ctx.font = `bold 10px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Producers', W * 0.1, 14);
  for (let i = 0; i < 3; i++) {
    const y = 26 + i * 28;
    ctx.fillStyle = C.blue + '22'; ctx.strokeStyle = C.blue; ctx.lineWidth = 1;
    roundRect(ctx, 4, y, W * 0.15, 20, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`;
    ctx.fillText('App ' + (i + 1), W * 0.1, y + 13);
    dashedLine(ctx, W * 0.2, y + 10, W * 0.28, H * 0.45, C.blue + '40');
  }

  // Topic (partitions)
  ctx.fillStyle = C.gold + '10'; ctx.strokeStyle = C.gold + '50'; ctx.lineWidth = 1.5;
  roundRect(ctx, W * 0.28, 14, W * 0.4, H - 28, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.font = `bold 10px ${ft}`;
  ctx.fillText('Topic: ride-requests', W * 0.48, 28);

  // Partitions
  for (let p = 0; p < 4; p++) {
    const py = 40 + p * ((H - 60) / 4);
    ctx.fillStyle = C.gold + '22'; ctx.strokeStyle = C.gold; ctx.lineWidth = 1;
    roundRect(ctx, W * 0.3, py, W * 0.36, 18, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`;
    ctx.fillText(`Partition ${p}`, W * 0.36, py + 12);
    // offset markers
    for (let o = 0; o < 5; o++) {
      const ox = W * 0.52 + o * 14;
      ctx.fillStyle = C.gold + (o < 3 ? '60' : '20');
      ctx.fillRect(ox, py + 3, 10, 12);
    }
    ctx.fillStyle = C.creamF; ctx.font = `7px ${ft}`; ctx.textAlign = 'right';
    ctx.fillText('offset →', W * 0.64, py + 12);
    ctx.textAlign = 'center';
  }

  // Consumers
  ctx.fillStyle = C.cream; ctx.font = `bold 10px ${ft}`;
  ctx.fillText('Consumer Groups', W * 0.84, 14);
  const groups = [
    { label: 'Pricing', color: C.green, y: 0.3 },
    { label: 'Analytics', color: C.purple, y: 0.7 },
  ];
  groups.forEach((g) => {
    const gy = g.y * H;
    dashedLine(ctx, W * 0.68, gy, W * 0.74, gy, g.color + '40');
    ctx.fillStyle = g.color + '22'; ctx.strokeStyle = g.color; ctx.lineWidth = 1;
    roundRect(ctx, W * 0.74, gy - 14, W * 0.22, 28, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `9px ${ft}`;
    ctx.fillText(g.label + ' svc', W * 0.85, gy + 3);
  });

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Append-only log — multiple consumer groups read independently', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 3: Airflow DAG
function de_airflow_dag(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const nodes = [
    { x: 0.08, y: 0.22, label: 'extract\norders', color: C.blue },
    { x: 0.08, y: 0.52, label: 'extract\nusers', color: C.blue },
    { x: 0.08, y: 0.82, label: 'extract\nproducts', color: C.blue },
    { x: 0.33, y: 0.22, label: 'clean\norders', color: C.purple },
    { x: 0.33, y: 0.52, label: 'clean\nusers', color: C.purple },
    { x: 0.33, y: 0.82, label: 'clean\nproducts', color: C.purple },
    { x: 0.58, y: 0.22, label: 'load\norders', color: C.gold },
    { x: 0.58, y: 0.52, label: 'load\nusers', color: C.gold },
    { x: 0.58, y: 0.82, label: 'load\nproducts', color: C.gold },
    { x: 0.85, y: 0.52, label: 'build\ngold', color: C.green },
  ];

  const edges = [[0,3],[1,4],[2,5],[3,6],[4,7],[5,8],[6,9],[7,9],[8,9]];
  edges.forEach(([a, b]) => {
    dashedLine(ctx, nodes[a].x * W + 32, nodes[a].y * H, nodes[b].x * W - 32, nodes[b].y * H, C.bd);
  });

  nodes.forEach((n) => {
    ctx.fillStyle = n.color + '22'; ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
    roundRect(ctx, n.x * W - 28, n.y * H - 18, 56, 36, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 8px ${ft}`; ctx.textAlign = 'center';
    n.label.split('\n').forEach((l, i) => {
      ctx.fillText(l, n.x * W, n.y * H - 4 + i * 11);
    });
  });

  // phase labels
  ctx.fillStyle = C.blue; ctx.font = `bold 9px ${ft}`;
  ctx.fillText('Extract', W * 0.08, H * 0.05);
  ctx.fillStyle = C.purple; ctx.fillText('Clean', W * 0.33, H * 0.05);
  ctx.fillStyle = C.gold; ctx.fillText('Load Silver', W * 0.58, H * 0.05);
  ctx.fillStyle = C.green; ctx.fillText('Gold', W * 0.85, H * 0.05);

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('Airflow runs tasks in dependency order — failure stops downstream', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 4: dbt DAG
function de_dbt_dag(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const nodes = [
    { x: 0.1, y: 0.2, label: 'stg_orders', color: '#a07040' },
    { x: 0.1, y: 0.5, label: 'stg_customers', color: '#a07040' },
    { x: 0.1, y: 0.8, label: 'stg_products', color: '#a07040' },
    { x: 0.42, y: 0.3, label: 'int_orders\n_enriched', color: '#8090a0' },
    { x: 0.42, y: 0.7, label: 'int_customer\n_metrics', color: '#8090a0' },
    { x: 0.75, y: 0.35, label: 'mart_revenue', color: C.gold },
    { x: 0.75, y: 0.7, label: 'mart_customers', color: C.gold },
  ];

  const edges = [[0,3],[1,3],[1,4],[2,3],[3,5],[4,5],[4,6]];
  edges.forEach(([a, b]) => {
    dashedLine(ctx, nodes[a].x * W + 40, nodes[a].y * H, nodes[b].x * W - 40, nodes[b].y * H, C.bd);
  });

  nodes.forEach((n) => {
    ctx.fillStyle = n.color + '22'; ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
    roundRect(ctx, n.x * W - 38, n.y * H - 18, 76, 36, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 8px ${ft}`; ctx.textAlign = 'center';
    n.label.split('\n').forEach((l, i) => {
      ctx.fillText(l, n.x * W, n.y * H - 3 + i * 11);
    });
  });

  // layer labels
  ctx.font = `bold 9px ${ft}`;
  ctx.fillStyle = '#a07040'; ctx.fillText('Staging', W * 0.1, 14);
  ctx.fillStyle = '#8090a0'; ctx.fillText('Intermediate', W * 0.42, 14);
  ctx.fillStyle = C.gold; ctx.fillText('Marts', W * 0.75, 14);

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`;
  ctx.fillText('dbt builds models in dependency order via {{ ref() }}', W / 2, H - 6);
  ctx.textAlign = 'left';
}

// Module 5: Data Quality Dimensions
function de_data_quality(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const dims = [
    { label: 'Complete', icon: '📊', desc: 'All records present', color: C.blue },
    { label: 'Unique', icon: '🔑', desc: 'No duplicates', color: C.green },
    { label: 'Valid', icon: '✅', desc: 'Values in range', color: C.gold },
    { label: 'Accurate', icon: '🎯', desc: 'Matches reality', color: C.red },
    { label: 'Timely', icon: '⏱️', desc: 'Fresh enough', color: C.purple },
    { label: 'Consistent', icon: '🔄', desc: 'Same everywhere', color: C.accent },
  ];

  const cols = 3, rows = 2;
  const cellW = (W - 24) / cols, cellH = (H - 30) / rows;

  dims.forEach((d, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = 12 + col * cellW, y = 12 + row * cellH;

    ctx.fillStyle = d.color + '12'; ctx.strokeStyle = d.color + '40'; ctx.lineWidth = 1;
    roundRect(ctx, x, y, cellW - 6, cellH - 6, 8); ctx.fill(); ctx.stroke();

    ctx.font = `16px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(d.icon, x + (cellW - 6) / 2, y + cellH * 0.3);
    ctx.fillStyle = d.color; ctx.font = `bold 10px ${ft}`;
    ctx.fillText(d.label, x + (cellW - 6) / 2, y + cellH * 0.55);
    ctx.fillStyle = C.creamF; ctx.font = `9px ${ft}`;
    ctx.fillText(d.desc, x + (cellW - 6) / 2, y + cellH * 0.75);
  });

  ctx.textAlign = 'left';
}

// Module 6: Cost Optimization Layers
function de_cost_optimization(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const layers = [
    { label: 'COMPUTE', desc: 'Auto-terminate, spot, right-size', saving: '60%', color: C.blue },
    { label: 'STORAGE', desc: 'Tiering, compression, lifecycle', saving: '70%', color: C.green },
    { label: 'QUERY', desc: 'Partitioning, caching, materialization', saving: '50%', color: C.gold },
    { label: 'GOVERNANCE', desc: 'Tagging, budgets, ownership', saving: '—', color: C.purple },
  ];

  const barH = (H - 30) / layers.length - 6;
  layers.forEach((l, i) => {
    const y = 14 + i * (barH + 6);
    const savingW = l.saving === '—' ? W * 0.3 : (parseInt(l.saving) / 100) * (W - 130);

    // background bar
    ctx.fillStyle = C.bd + '30';
    roundRect(ctx, 100, y, W - 130, barH, 6); ctx.fill();

    // filled bar
    ctx.fillStyle = l.color + '35'; ctx.strokeStyle = l.color; ctx.lineWidth = 1;
    roundRect(ctx, 100, y, savingW, barH, 6); ctx.fill(); ctx.stroke();

    // label
    ctx.fillStyle = l.color; ctx.font = `bold 10px ${ft}`; ctx.textAlign = 'right';
    ctx.fillText(l.label, 92, y + barH / 2 + 4);

    // saving text
    ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'left';
    if (l.saving !== '—') ctx.fillText(`up to ${l.saving} savings`, 108, y + barH / 2 - 4);
    ctx.fillStyle = C.creamF; ctx.font = `8px ${ft}`;
    ctx.fillText(l.desc, 108, y + barH / 2 + 10);
  });

  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Typically 40-60% total savings without losing capability', W / 2, H - 4);
  ctx.textAlign = 'left';
}

export const dataengVisualizations = {
  de_etl_vs_elt,
  de_star_schema,
  de_kafka,
  de_airflow_dag,
  de_dbt_dag,
  de_data_quality,
  de_cost_optimization,
};