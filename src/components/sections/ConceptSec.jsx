import React from 'react';
import { colors as C, fonts } from '../../styles/theme';
export default function ConceptSec({ sec }) {
  return <div style={{background:C.card,borderRadius:12,padding:22,border:'1px solid '+C.bd}}>
    <p style={{fontFamily:fonts.body,fontSize:10,fontWeight:700,color:C.green,textTransform:'uppercase',letterSpacing:1.2,marginBottom:10}}>📘 Deep Dive</p>
    <h3 style={{fontFamily:fonts.serif,fontSize:20,color:C.cream,fontWeight:600,marginBottom:14}}>{sec.title}</h3>
    <p style={{fontFamily:fonts.body,fontSize:14,color:C.creamD,lineHeight:1.8,whiteSpace:'pre-wrap'}}>{sec.content}</p>
    {sec.analogy&&<div style={{background:C.bg3,borderRadius:8,padding:14,marginTop:14,borderLeft:'4px solid '+C.gold,fontFamily:fonts.body,fontSize:13,color:C.creamD,lineHeight:1.7}} dangerouslySetInnerHTML={{__html:sec.analogy.replace(/\n/g,'<br/>')}} />}
  </div>;
}
