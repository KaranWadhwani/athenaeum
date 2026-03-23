import React from 'react';
import { colors as C, fonts } from '../../styles/theme';
export default function QuizSec({ sec, qKey, answers, onAnswer }) {
  const chosen=answers[qKey],revealed=chosen!==undefined,ok=chosen===sec.ans;
  return <div style={{background:C.bg2,borderRadius:12,padding:22,border:'1px solid '+C.bd}}>
    <p style={{fontFamily:fonts.body,fontSize:10,fontWeight:700,color:C.gold,textTransform:'uppercase',letterSpacing:1.2,marginBottom:10}}>🧪 Knowledge Check</p>
    <p style={{fontFamily:fonts.body,fontSize:15,color:C.cream,lineHeight:1.6,marginBottom:16}}>{sec.q}</p>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {sec.opts.map((o,i)=>{const isThis=chosen===i,correct=i===sec.ans;let bg=C.card,bdr=C.bd,clr=C.creamD;
        if(revealed&&correct){bg=C.green+'22';bdr=C.green;clr=C.green}else if(revealed&&isThis&&!correct){bg=C.red+'22';bdr=C.red;clr=C.red}else if(revealed){clr=C.creamF}
        return <button key={i} onClick={()=>{if(!revealed)onAnswer(qKey,i)}} disabled={revealed} style={{fontFamily:fonts.body,fontSize:13,textAlign:'left',padding:'12px 14px',background:bg,border:'1px solid '+bdr,borderRadius:8,color:clr,cursor:revealed?'default':'pointer',lineHeight:1.5}}>
          <span style={{fontWeight:600,marginRight:8}}>{String.fromCharCode(65+i)}.</span>{o}</button>})}
    </div>
    {revealed&&<div style={{marginTop:14,padding:14,borderRadius:8,background:ok?C.green+'12':C.red+'12',border:'1px solid '+(ok?C.green:C.red)+'30'}}>
      <p style={{fontFamily:fonts.body,fontSize:13,color:ok?C.green:C.red,fontWeight:600,marginBottom:4}}>{ok?'✓ Correct!':'✗ Not quite.'}</p>
      <p style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,lineHeight:1.7}}>{sec.explanation}</p></div>}
  </div>;
}
