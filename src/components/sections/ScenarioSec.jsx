import React from 'react';
import { colors as C, fonts } from '../../styles/theme';
export default function ScenarioSec({ sec }) {
  return <div style={{background:C.gold+'08',borderRadius:12,padding:22,border:'1px solid '+C.gold+'30'}}>
    <p style={{fontFamily:fonts.body,fontSize:10,fontWeight:700,color:C.gold,textTransform:'uppercase',letterSpacing:1.2,marginBottom:10}}>🎬 The Scenario</p>
    <h3 style={{fontFamily:fonts.serif,fontSize:20,color:C.cream,fontWeight:600,marginBottom:14}}>{sec.title}</h3>
    <p style={{fontFamily:fonts.body,fontSize:14,color:C.creamD,lineHeight:1.8,whiteSpace:'pre-wrap'}}>{sec.content}</p>
  </div>;
}
