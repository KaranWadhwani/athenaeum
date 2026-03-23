import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { colors as C, fonts } from '../styles/theme';
export default function SearchResults({ searchFn, onSelectCourse, onHome }) {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const results = useMemo(() => searchFn(query), [query, searchFn]);
  return (
    <div style={{maxWidth:780,margin:'0 auto',padding:'28px 16px'}}>
      <button onClick={onHome} style={{fontFamily:fonts.body,fontSize:13,color:C.creamD,background:'none',border:'none',cursor:'pointer',marginBottom:16}}>← New search</button>
      <h2 style={{fontFamily:fonts.serif,fontSize:24,color:C.cream,marginBottom:4}}>Results for "<span style={{color:C.gold}}>{query}</span>"</h2>
      <p style={{fontFamily:fonts.body,fontSize:13,color:C.creamF,marginBottom:24}}>{results.length} course(s) found</p>
      {results.length===0?<div style={{textAlign:'center',padding:48}}><span style={{fontSize:44}}>📭</span><p style={{fontFamily:fonts.serif,fontSize:18,color:C.creamD,marginTop:12}}>No courses match yet.</p></div>
      :<div style={{display:'flex',flexDirection:'column',gap:12}}>{results.map(c=>
        <div key={c.id} onClick={()=>onSelectCourse(c.id)} style={{background:C.card,borderRadius:12,padding:20,border:'1px solid '+C.bd,cursor:'pointer'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}><span style={{fontSize:32}}>{c.emoji}</span>
          <div><h3 style={{fontFamily:fonts.serif,fontSize:20,color:C.cream}}>{c.title}</h3>
          <p style={{fontFamily:fonts.body,fontSize:12,color:C.creamD,marginTop:3}}>{c.desc}</p></div></div>
        </div>)}</div>}
    </div>
  );
}
