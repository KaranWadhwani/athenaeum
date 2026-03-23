import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { colors as C, fonts } from '../styles/theme';
export default function CourseView({ loadCourse, catalog, onSelectModule, onBack }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const entry = catalog?.courses?.find(c => c.id === courseId);
  useEffect(() => { setLoading(true); loadCourse(courseId).then(d => { setCourse(d); setLoading(false); }); }, [courseId, loadCourse]);
  if (loading) return <div style={{maxWidth:780,margin:'0 auto',padding:'60px 16px',textAlign:'center'}}><div style={{fontSize:36,animation:'pulse 1.5s infinite'}}>📜</div><p style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,marginTop:12}}>Loading...</p></div>;
  if (!course) return <div style={{maxWidth:780,margin:'0 auto',padding:'60px 16px',textAlign:'center'}}><span style={{fontSize:44}}>🚧</span><p style={{fontFamily:fonts.serif,fontSize:20,color:C.creamD,marginTop:12}}>{entry?.status==='draft'?'Coming soon!':'Not found.'}</p><button onClick={onBack} style={{fontFamily:fonts.body,fontSize:13,marginTop:20,padding:'8px 20px',background:'none',border:'1px solid '+C.bd,borderRadius:8,color:C.creamD,cursor:'pointer'}}>← Back</button></div>;
  return (
    <div style={{maxWidth:780,margin:'0 auto',padding:'28px 16px'}}>
      <button onClick={onBack} style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,background:'none',border:'none',cursor:'pointer',marginBottom:16}}>← Back</button>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:8}}><span style={{fontSize:40}}>{course.emoji}</span>
        <div><h2 style={{fontFamily:fonts.serif,fontSize:28,color:C.cream,fontWeight:600}}>{course.title}</h2><p style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,marginTop:4}}>{course.desc}</p></div></div>
      <div style={{width:60,height:2,margin:'18px 0 24px',background:'linear-gradient(90deg,'+C.gold+',transparent)'}} />
      {course.modules?.length>0?<div>
        <p style={{fontFamily:fonts.serif,fontSize:16,color:C.creamF,marginBottom:16}}>{course.modules.length} interactive modules</p>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {course.modules.map((mod,idx)=><div key={mod.id} onClick={()=>onSelectModule(courseId,idx)} style={{background:C.card,borderRadius:12,padding:'18px 20px',border:'1px solid '+C.bd,cursor:'pointer',display:'flex',alignItems:'center',gap:14}}>
            <span style={{fontSize:28,flexShrink:0}}>{mod.icon}</span>
            <div style={{flex:1}}><h3 style={{fontFamily:fonts.serif,fontSize:18,color:C.cream,fontWeight:600}}>{mod.title}</h3>
            <div style={{display:'flex',gap:4,marginTop:6}}>{mod.tagLabel&&<span style={{fontFamily:fonts.body,fontSize:10,padding:'2px 8px',background:C.gold+'12',border:'1px solid '+C.gold+'25',borderRadius:10,color:C.goldD}}>{mod.tagLabel}</span>}
            <span style={{fontFamily:fonts.body,fontSize:10,padding:'2px 8px',background:C.bg3,borderRadius:10,color:C.creamF}}>{mod.sections.length} steps</span></div></div>
            <span style={{color:C.creamF,fontSize:16}}>→</span></div>)}
        </div></div>:<div style={{textAlign:'center',padding:48}}><span style={{fontSize:44}}>🚧</span><p style={{fontFamily:fonts.serif,fontSize:20,color:C.creamD,marginTop:12}}>Modules coming soon</p></div>}
    </div>
  );
}
