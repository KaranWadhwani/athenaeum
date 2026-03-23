import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { colors as C, fonts } from './styles/theme';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import CourseView from './pages/CourseView';
import ModuleView from './pages/ModuleView';
const BASE = '/athenaeum/';
export default function App() {
  const [catalog, setCatalog] = useState(null);
  const [courseCache, setCourseCache] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { fetch(BASE+'courses/index.json').then(r=>r.json()).then(setCatalog).catch(console.error); }, []);
  const loadCourse = useCallback(async (id) => {
    if (courseCache[id]) return courseCache[id];
    const entry = catalog?.courses?.find(c => c.id === id);
    if (!entry) return null;
    try { const d = await fetch(BASE+'courses/'+entry.file).then(r=>r.json()); setCourseCache(p=>({...p,[id]:d})); return d; } catch { return null; }
  }, [catalog, courseCache]);
  const searchCourses = useCallback((q) => {
    if (!catalog) return []; const t = q.toLowerCase().trim();
    return catalog.courses.filter(c => c.title.toLowerCase().includes(t) || c.desc.toLowerCase().includes(t) || c.tags.some(tag => tag.includes(t) || t.includes(tag)));
  }, [catalog]);
  if (!catalog) return (<div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:16}}>📜</div><p style={{fontFamily:fonts.serif,fontSize:20,color:C.gold}}>Loading Athenaeum...</p></div></div>);
  return (
    <div style={{minHeight:'100vh',background:C.bg,color:C.cream}}>
      <Header onHome={()=>navigate('/')} apiKey={apiKey} setApiKey={setApiKey} showKey={showKey} setShowKey={setShowKey} />
      <Routes>
        <Route path="/" element={<HomePage catalog={catalog} onSearch={q=>navigate('/search?q='+encodeURIComponent(q))} onSelectCourse={id=>navigate('/course/'+id)} />} />
        <Route path="/search" element={<SearchResults searchFn={searchCourses} onSelectCourse={id=>navigate('/course/'+id)} onHome={()=>navigate('/')} />} />
        <Route path="/course/:courseId" element={<CourseView loadCourse={loadCourse} catalog={catalog} onSelectModule={(cid,mi)=>navigate('/course/'+cid+'/module/'+mi)} onBack={()=>navigate('/')} />} />
        <Route path="/course/:courseId/module/:moduleIdx" element={<ModuleView loadCourse={loadCourse} apiKey={apiKey} onBack={cid=>navigate('/course/'+cid)} />} />
      </Routes>
    </div>
  );
}
