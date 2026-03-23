import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { colors as C, fonts } from '../styles/theme';
import ScenarioSec from '../components/sections/ScenarioSec';
import VisualSec from '../components/sections/VisualSec';
import ConceptSec from '../components/sections/ConceptSec';
import InsightSec from '../components/sections/InsightSec';
import QuizSec from '../components/sections/QuizSec';
import DeepDive from '../components/DeepDive';
import DeepDivePopup from '../components/DeepDivePopup';
const IC={scenario:'🎬',visual:'👁️',concept:'📘',insight:'💡',quiz:'🧪'};
export default function ModuleView({loadCourse,apiKey,onBack}){
  const{courseId,moduleIdx}=useParams();const mi=parseInt(moduleIdx,10);
  const[course,setCourse]=useState(null);const[loading,setLoading]=useState(true);
  const[si,setSi]=useState(0);const[answers,setAnswers]=useState({});const[popup,setPopup]=useState(false);
  useEffect(()=>{setLoading(true);setSi(0);setAnswers({});setPopup(false);loadCourse(courseId).then(d=>{setCourse(d);setLoading(false)})},[courseId,moduleIdx,loadCourse]);
  if(loading||!course)return<div style={{maxWidth:780,margin:'0 auto',padding:'60px 16px',textAlign:'center'}}><div style={{fontSize:36,animation:'pulse 1.5s infinite'}}>📜</div></div>;
  const mod=course.modules?.[mi];if(!mod)return<div style={{textAlign:'center',padding:60}}><p style={{color:C.creamD}}>Module not found</p></div>;
  const sec=si>=0?mod.sections[si]:null,tot=mod.sections.length,qKey=mod.id+'-'+si;
  const isQ=sec&&sec.type==='quiz',blocked=isQ&&answers[qKey]===undefined;
  return(
    <div style={{maxWidth:780,margin:'0 auto',padding:'24px 16px'}}>
      {popup&&<DeepDivePopup module={mod} onDeepDive={()=>{setPopup(false);setSi(-1)}} onSkip={()=>{setPopup(false);onBack(courseId)}} />}
      <button onClick={()=>onBack(courseId)} style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,background:'none',border:'none',cursor:'pointer',marginBottom:16}}>← Back to modules</button>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}><span style={{fontSize:32}}>{mod.icon}</span><h2 style={{fontFamily:fonts.serif,fontSize:26,color:C.cream,fontWeight:600}}>{mod.title}</h2></div>
      {mod.tagLabel&&<span style={{fontFamily:fonts.body,fontSize:10,padding:'3px 10px',background:C.gold+'15',border:'1px solid '+C.gold+'35',borderRadius:12,color:C.goldD,display:'inline-block',marginBottom:12}}>{mod.tagLabel}</span>}
      <div style={{display:'flex',alignItems:'center',gap:6,margin:'12px 0'}}><div style={{flex:1,height:4,background:C.bd,borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:(si>=0?((si+1)/tot)*100:100)+'%',background:'linear-gradient(90deg,'+C.gold+','+C.accent+')',borderRadius:2,transition:'width .3s'}} /></div><span style={{fontFamily:fonts.body,fontSize:11,color:C.creamF}}>{si>=0?(si+1)+'/'+tot:'Deep Dive'}</span></div>
      <div style={{display:'flex',gap:4,marginBottom:20,flexWrap:'wrap'}}>
        {mod.sections.map((s,i)=>{const icon=IC[s.type]||'📄',active=si===i,done=i<si||si===-1;return<button key={i} onClick={()=>setSi(i)} style={{fontFamily:fonts.body,fontSize:12,padding:'4px 10px',background:active?C.hover:'transparent',border:'1px solid '+(active?C.gold:done?C.green+'60':C.bd),borderRadius:6,color:active?C.gold:done?C.green:C.creamF,cursor:'pointer'}}>{icon}{done?' ✓':''}</button>})}
        <button onClick={()=>setSi(-1)} style={{fontFamily:fonts.body,fontSize:15,padding:'5px 14px',background:si===-1?C.hover:C.gold+'10',border:'1px solid '+(si===-1?C.gold:C.gold+'50'),borderRadius:8,color:si===-1?C.gold:C.goldB,cursor:'pointer',marginLeft:'auto',fontWeight:600}}>🔭 Deep Dive</button>
      </div>
      <div style={{minHeight:300}}>
        {si===-1&&<DeepDive module={mod} apiKey={apiKey}/>}
        {sec?.type==='scenario'&&<ScenarioSec sec={sec}/>}
        {sec?.type==='visual'&&<VisualSec sec={sec}/>}
        {sec?.type==='concept'&&<ConceptSec sec={sec}/>}
        {sec?.type==='insight'&&<InsightSec sec={sec}/>}
        {sec?.type==='quiz'&&<QuizSec sec={sec} qKey={qKey} answers={answers} onAnswer={(k,v)=>setAnswers(p=>({...p,[k]:v}))}/>}
      </div>
      {si>=0&&<div style={{display:'flex',justifyContent:'space-between',marginTop:20,gap:12}}>
        <button disabled={si===0} onClick={()=>setSi(si-1)} style={{fontFamily:fonts.body,fontSize:13,padding:'10px 20px',borderRadius:8,border:'1px solid '+C.bd,background:C.card,color:C.cream,cursor:si===0?'not-allowed':'pointer',opacity:si===0?.4:1}}>← Prev</button>
        <button disabled={blocked} onClick={()=>{if(si<tot-1)setSi(si+1);else setPopup(true)}} style={{fontFamily:fonts.body,fontSize:13,padding:'10px 20px',borderRadius:8,border:'none',background:blocked?C.bd:'linear-gradient(90deg,'+C.gold+','+C.accent+')',color:blocked?C.creamF:C.bg,fontWeight:600,cursor:blocked?'not-allowed':'pointer'}}>{si===tot-1?'Complete ✓':'Next →'}</button>
      </div>}
    </div>);
}
