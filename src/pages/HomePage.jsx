import React, { useState } from 'react';
import { colors as C, fonts } from '../styles/theme';
export default function HomePage({ catalog, onSearch, onSelectCourse }) {
  const [query, setQuery] = useState('');
  const go = () => { if (query.trim()) onSearch(query.trim()); };
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'64px 16px 48px'}}>
      <div style={{textAlign:'center',marginBottom:40}}>
        <span style={{fontSize:48,display:'block',marginBottom:12}}>📜</span>
        <h1 style={{fontFamily:fonts.serif,fontSize:42,fontWeight:700,color:C.cream,lineHeight:1.1,marginBottom:10}}>The Tech <span style={{color:C.gold}}>Athenaeum</span></h1>
        <p style={{fontFamily:fonts.body,fontSize:15,color:C.creamD,maxWidth:500,lineHeight:1.6,margin:'0 auto'}}>An open initiative for aspiring technologists. Scenario-driven, visual-first interactive learning.</p>
      </div>
      <div style={{position:'relative',width:'100%',maxWidth:560,marginBottom:40}}>
        <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')go()}} placeholder="Search a topic to upskill in..."
          style={{width:'100%',padding:'14px 50px 14px 18px',fontFamily:fonts.body,fontSize:15,background:C.input,border:'1px solid '+C.bd,borderRadius:10,color:C.cream,outline:'none'}}
          onFocus={e=>{e.target.style.borderColor=C.gold}} onBlur={e=>{e.target.style.borderColor=C.bd}} />
        <button onClick={go} style={{position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',background:C.gold,border:'none',borderRadius:7,width:34,height:34,cursor:'pointer',fontSize:16}}>🔍</button>
      </div>
      <div style={{width:'100%',maxWidth:660,marginBottom:48}}>
        <p style={{fontFamily:fonts.serif,fontSize:14,color:C.creamF,marginBottom:12,textAlign:'center',letterSpacing:1}}>— Trending Topics —</p>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:8}}>
          {catalog.trending.map(t=><button key={t} onClick={()=>onSearch(t)} style={{fontFamily:fonts.body,fontSize:12,padding:'8px 18px',background:C.card,border:'1px solid '+C.bd,borderRadius:20,color:C.creamD,cursor:'pointer'}}>{t}</button>)}
        </div>
      </div>
      <div style={{width:'100%',maxWidth:880}}>
        <p style={{fontFamily:fonts.serif,fontSize:14,color:C.creamF,marginBottom:16,textAlign:'center',letterSpacing:1}}>— Browse All Courses —</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:14}}>
          {catalog.courses.map(c=><div key={c.id} onClick={()=>onSelectCourse(c.id)} style={{background:C.card,borderRadius:12,padding:18,border:'1px solid '+C.bd,cursor:'pointer',transition:'all .25s',opacity:c.status==='draft'?.6:1}}>
            <span style={{fontSize:28}}>{c.emoji}</span>
            <h3 style={{fontFamily:fonts.serif,fontSize:16,color:C.cream,margin:'8px 0 4px'}}>{c.title}</h3>
            <p style={{fontFamily:fonts.body,fontSize:11,color:C.creamF,lineHeight:1.5}}>{c.desc}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
              <span style={{fontFamily:fonts.body,fontSize:10,color:C.goldD}}>{c.status==='published'?c.moduleCount+' modules':'Coming soon'}</span>
              <span style={{fontFamily:fonts.body,fontSize:10,padding:'2px 8px',background:C.gold+'12',border:'1px solid '+C.gold+'25',borderRadius:10,color:C.goldD}}>{c.tag}</span>
            </div>
          </div>)}
        </div>
      </div>
      <footer style={{marginTop:64,textAlign:'center',padding:'16px 0'}}><p style={{fontFamily:fonts.body,fontSize:10,color:C.creamF}}>Open-source initiative | Host free on GitHub Pages</p></footer>
    </div>
  );
}
