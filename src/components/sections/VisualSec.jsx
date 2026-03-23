import React, { useRef, useEffect } from 'react';
import { colors as C, fonts } from '../../styles/theme';
import { VIS_MAP } from '../../visualizations/index.js';
export default function VisualSec({ sec }) {
  const ref = useRef(null);
  const cw = Math.min(660, typeof window!=='undefined'?window.innerWidth-56:660);
  const ch = Math.round(cw * 0.4);
  useEffect(() => { if (ref.current && VIS_MAP[sec.vis]) VIS_MAP[sec.vis](ref.current); }, [sec.vis]);
  return <div style={{borderRadius:12,padding:22,border:'2px solid '+C.gold+'40',background:C.bg2}}>
    <p style={{fontFamily:fonts.body,fontSize:10,fontWeight:700,color:C.gold,textTransform:'uppercase',letterSpacing:1.2,marginBottom:10}}>👁️ See It</p>
    <h3 style={{fontFamily:fonts.serif,fontSize:20,color:C.cream,fontWeight:600,marginBottom:14}}>{sec.title}</h3>
    <canvas ref={ref} width={cw} height={ch} style={{borderRadius:10,display:'block',margin:'0 auto',background:C.bg+'aa'}} />
    {!VIS_MAP[sec.vis]&&<p style={{fontFamily:fonts.body,fontSize:12,color:C.creamF,textAlign:'center',marginTop:8,fontStyle:'italic'}}>Visualization "{sec.vis}" not registered yet.</p>}
    <p style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,lineHeight:1.75,marginTop:14,whiteSpace:'pre-wrap'}}>{sec.content}</p>
  </div>;
}
