import React from 'react';
import { colors as C, fonts } from '../styles/theme';
export default function Header({ onHome, apiKey, setApiKey, showKey, setShowKey }) {
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:'1px solid '+C.bd,background:C.bg,position:'sticky',top:0,zIndex:100}}>
      <div onClick={onHome} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
        <span style={{fontSize:24}}>📜</span>
        <div><h1 style={{fontFamily:fonts.serif,fontSize:19,fontWeight:700,color:C.gold,letterSpacing:.5,lineHeight:1}}>ATHENAEUM</h1>
        <span style={{fontFamily:fonts.body,fontSize:9,color:C.creamF,letterSpacing:2.5,textTransform:'uppercase'}}>Tech Upskilling</span></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        {showKey ? (
          <div style={{display:'flex',gap:6}}>
            <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="Gemini API key..." style={{fontFamily:fonts.body,fontSize:11,padding:'5px 10px',background:C.input,border:'1px solid '+C.bd,borderRadius:6,color:C.cream,width:200,outline:'none'}} />
            <button onClick={()=>setShowKey(false)} style={{fontFamily:fonts.body,fontSize:10,padding:'5px 10px',background:C.gold,color:C.bg,border:'none',borderRadius:6,cursor:'pointer',fontWeight:600}}>{apiKey?'✓':'×'}</button>
          </div>
        ) : (
          <button onClick={()=>setShowKey(true)} style={{fontFamily:fonts.body,fontSize:10,padding:'4px 10px',background:'none',border:'1px solid '+(apiKey?C.green:C.bd),borderRadius:6,color:apiKey?C.green:C.creamF,cursor:'pointer'}}>
            {apiKey?'🔑 Key Set':'🔑 Gemini Key'}</button>
        )}
      </div>
    </header>
  );
}
