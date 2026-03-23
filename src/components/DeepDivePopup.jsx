import React from 'react';
import { colors as C, fonts } from '../styles/theme';
export default function DeepDivePopup({ module: mod, onDeepDive, onSkip }) {
  return <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(10,8,5,0.85)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
    <div style={{background:C.card,border:'1px solid '+C.bd,borderRadius:16,padding:'36px 32px',maxWidth:480,width:'100%',textAlign:'center',boxShadow:'0 24px 80px rgba(0,0,0,0.6)'}}>
      <div style={{fontSize:56,marginBottom:16}}>🔭</div>
      <h3 style={{fontFamily:fonts.serif,fontSize:24,color:C.cream,fontWeight:700,marginBottom:8}}>Module Complete!</h3>
      <p style={{fontFamily:fonts.body,fontSize:14,color:C.creamD}}>You finished <span style={{color:C.gold,fontWeight:600}}>{mod.title}</span></p>
      <div style={{width:50,height:2,background:C.gold,margin:'16px auto',borderRadius:1}} />
      <p style={{fontFamily:fonts.body,fontSize:13,color:C.creamF,lineHeight:1.6,marginBottom:24}}>AI-powered <b style={{color:C.goldB}}>Deep Dive</b> generates advanced content and an expert quiz.</p>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        <button onClick={onDeepDive} style={{fontFamily:fonts.body,fontSize:16,padding:'14px 32px',background:'linear-gradient(135deg,'+C.gold+','+C.accent+')',color:C.bg,border:'none',borderRadius:10,cursor:'pointer',fontWeight:700}}>🔭 Go Deeper with AI</button>
        <button onClick={onSkip} style={{fontFamily:fonts.body,fontSize:13,padding:'10px 20px',background:'none',border:'1px solid '+C.bd,borderRadius:8,color:C.creamF,cursor:'pointer'}}>Skip → Back to modules</button>
      </div>
    </div>
  </div>;
}
