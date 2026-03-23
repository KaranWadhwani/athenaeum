import { colors as C, fonts } from '../styles/theme';

const ft = fonts.body;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function genai_evolution(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const phases = [
    { x: 0.15, label: 'Classical ML', sub: 'Hand-crafted features', color: C.blue },
    { x: 0.5, label: 'Deep Learning', sub: 'Learned features', color: C.purple },
    { x: 0.85, label: 'Foundation Models', sub: 'General purpose', color: C.gold },
  ];
  ctx.strokeStyle = C.bd; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W * 0.05, H * 0.4); ctx.lineTo(W * 0.95, H * 0.4); ctx.stroke();
  phases.forEach((p, i) => {
    const px = p.x * W, py = H * 0.4;
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
    ctx.fillStyle = C.cream; ctx.font = `bold 13px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(p.label, px, py - 20);
    ctx.fillStyle = C.creamF; ctx.font = `11px ${ft}`; ctx.fillText(p.sub, px, py + 28);
    if (i < phases.length - 1) {
      ctx.beginPath(); ctx.moveTo(px + 16, py); ctx.lineTo(phases[i + 1].x * W - 16, py);
      ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
    }
  });
  ctx.textAlign = 'center'; ctx.fillStyle = C.goldD; ctx.font = `bold 11px ${ft}`;
  ctx.fillText('Capability increases exponentially →', W * 0.5, H * 0.85);
  ctx.textAlign = 'left';
}

function attention_viz(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const words = ['The', 'server', 'crashed', 'because', 'it', 'was', 'overloaded'];
  const attn = [0.03, 0.42, 0.15, 0.05, 0.02, 0.08, 0.25];
  const fi = 4, gap = W / (words.length + 1);
  words.forEach((w, i) => {
    const x = (i + 1) * gap;
    ctx.fillStyle = i === fi ? C.gold : C.cream;
    ctx.font = `${i === fi ? 'bold ' : ''}13px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(w, x, H * 0.28); ctx.fillText(w, x, H * 0.68);
    if (i !== fi) {
      ctx.beginPath(); ctx.moveTo((fi + 1) * gap, H * 0.32); ctx.lineTo(x, H * 0.60);
      ctx.strokeStyle = `rgba(196,162,101,${Math.max(attn[i] * 1.5, 0.1)})`;
      ctx.lineWidth = Math.max(attn[i] * 12, 1); ctx.stroke();
    }
  });
  ctx.fillStyle = C.creamF; ctx.font = `11px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText("'it' attends most to 'server' (42%) — learned coreference!", W / 2, H * 0.88);
  ctx.textAlign = 'left';
}

function tokenizer_viz(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const examples = [
    { text: 'Hello world', tokens: ['Hello', ' world'], y: 0.18 },
    { text: 'Strawberry', tokens: ['Str', 'aw', 'berry'], y: 0.38 },
    { text: 'print("hi")', tokens: ['print', '("', 'hi', '")'], y: 0.58 },
    { text: 'Incomprehensible', tokens: ['In', 'comp', 'rehens', 'ible'], y: 0.78 },
  ];
  const cols = [C.blue, C.purple, C.gold, C.green, C.red];
  examples.forEach((ex) => {
    const y = ex.y * H;
    ctx.fillStyle = C.creamD; ctx.font = `13px ${ft}`; ctx.textAlign = 'left';
    ctx.fillText(ex.text, 16, y); ctx.fillStyle = C.creamF; ctx.fillText('→', 130, y);
    let tx = 150;
    ex.tokens.forEach((t, i) => {
      const col = cols[i % cols.length], tw = ctx.measureText(t).width + 16;
      ctx.fillStyle = col + '22'; ctx.strokeStyle = col; ctx.lineWidth = 1;
      roundRect(ctx, tx, y - 12, tw, 20, 5); ctx.fill(); ctx.stroke();
      ctx.fillStyle = col; ctx.font = `11px ${ft}`; ctx.textAlign = 'center';
      ctx.fillText(t, tx + tw / 2, y + 2); ctx.textAlign = 'left'; tx += tw + 4;
    });
    ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`; ctx.fillText(`${ex.tokens.length} tokens`, tx + 6, y);
  });
}

function prompt_anatomy(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const secs = [
    { label: 'SYSTEM', desc: 'Role & expertise', color: C.blue, h: 0.1 },
    { label: 'CONTEXT', desc: 'Background info', color: C.purple, h: 0.1 },
    { label: 'INSTRUCTION', desc: 'Task definition', color: C.gold, h: 0.12 },
    { label: 'FORMAT', desc: 'Output structure', color: C.green, h: 0.08 },
    { label: 'EXAMPLES', desc: 'Few-shot demos', color: C.red, h: 0.18 },
    { label: 'GUARDRAILS', desc: 'Edge cases', color: C.purple, h: 0.08 },
    { label: 'INPUT', desc: 'Actual data', color: C.goldD, h: 0.12 },
  ];
  let y = 12; const bw = W - 48;
  secs.forEach((s) => {
    const sh = s.h * H;
    ctx.fillStyle = s.color + '18'; ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
    roundRect(ctx, 24, y, bw, sh, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = s.color; ctx.font = `bold 10px ${ft}`; ctx.textAlign = 'left';
    ctx.fillText(s.label, 36, y + sh / 2 + 3);
    ctx.fillStyle = C.creamD; ctx.font = `12px ${ft}`; ctx.fillText(s.desc, 120, y + sh / 2 + 3);
    y += sh + 3;
  });
}

function rag_pipeline(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const stages = [
    { x: 0.1, label: 'Docs', color: C.blue }, { x: 0.3, label: 'Chunk', color: C.purple },
    { x: 0.5, label: 'Embed', color: C.gold }, { x: 0.7, label: 'Retrieve', color: C.green },
    { x: 0.9, label: 'Generate', color: C.red },
  ];
  stages.forEach((s, i) => {
    if (i < stages.length - 1) {
      ctx.beginPath(); ctx.moveTo(s.x * W + 30, H * 0.5); ctx.lineTo(stages[i + 1].x * W - 30, H * 0.5);
      ctx.strokeStyle = C.bd; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.beginPath(); ctx.arc(s.x * W, H * 0.5, 24, 0, Math.PI * 2);
    ctx.fillStyle = s.color + '22'; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(s.label, s.x * W, H * 0.5 + 4);
  });
  ctx.fillStyle = C.creamF; ctx.font = `11px ${ft}`;
  ctx.fillText('Question → Retrieve relevant chunks → LLM generates grounded answer', W / 2, H * 0.85);
  ctx.textAlign = 'left';
}

function lora_viz(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const hw = W / 2;
  ctx.fillStyle = C.cream; ctx.font = `bold 13px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('Full Fine-Tuning', hw / 2, 22);
  ctx.fillStyle = C.red + '22'; ctx.strokeStyle = C.red; ctx.lineWidth = 1.5;
  roundRect(ctx, hw / 2 - 60, 34, 120, 50, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.red; ctx.font = `11px ${ft}`;
  ctx.fillText('All 175B params', hw / 2, 58); ctx.fillText('~1.4 TB | $10K+', hw / 2, 74);
  ctx.fillStyle = C.cream; ctx.font = `bold 13px ${ft}`; ctx.fillText('LoRA', hw + hw / 2, 22);
  ctx.fillStyle = C.blue + '18'; ctx.strokeStyle = C.blue;
  roundRect(ctx, hw + hw / 2 - 60, 34, 120, 30, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.blue; ctx.font = `10px ${ft}`; ctx.fillText('Original (FROZEN)', hw + hw / 2, 52);
  ctx.fillStyle = C.gold + '22'; ctx.strokeStyle = C.gold;
  roundRect(ctx, hw + hw / 2 - 40, 72, 80, 24, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.font = `bold 10px ${ft}`; ctx.fillText('Adapters (0.4%)', hw + hw / 2, 88);
  ctx.fillStyle = C.creamF; ctx.font = `10px ${ft}`; ctx.fillText('~16 GB | $50-200', hw + hw / 2, 112);
  ctx.textAlign = 'left';
}

function agent_loop(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const steps = [
    { x: 0.5, y: 0.18, label: 'THINK', color: C.gold },
    { x: 0.82, y: 0.5, label: 'ACT', color: C.green },
    { x: 0.5, y: 0.78, label: 'OBSERVE', color: C.blue },
    { x: 0.18, y: 0.5, label: 'UPDATE', color: C.purple },
  ];
  for (let i = 0; i < steps.length; i++) {
    const a = steps[i], b = steps[(i + 1) % steps.length];
    ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H);
    ctx.strokeStyle = C.bd; ctx.lineWidth = 1.5; ctx.setLineDash([5, 3]); ctx.stroke(); ctx.setLineDash([]);
  }
  steps.forEach((s) => {
    ctx.beginPath(); ctx.arc(s.x * W, s.y * H, 28, 0, Math.PI * 2);
    ctx.fillStyle = s.color + '22'; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = C.cream; ctx.font = `bold 11px ${ft}`; ctx.textAlign = 'center';
    ctx.fillText(s.label, s.x * W, s.y * H + 4);
  });
  ctx.fillStyle = C.creamF; ctx.font = `11px ${ft}`; ctx.textAlign = 'center';
  ctx.fillText('ReAct loop continues until task complete', W / 2, H * 0.95); ctx.textAlign = 'left';
}

export const genaiVisualizations = {
  genai_evolution,
  attention_viz,
  tokenizer_viz,
  prompt_anatomy,
  rag_pipeline,
  lora_viz,
  agent_loop,
};