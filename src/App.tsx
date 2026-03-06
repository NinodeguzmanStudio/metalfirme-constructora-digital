import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════
   RESPONSIVE HOOK
═══════════════════════════════════ */
function useIsMobile(){
  const [mob,setMob]=useState(()=>typeof window!=="undefined"&&window.innerWidth<768);
  useEffect(()=>{
    const fn=()=>setMob(window.innerWidth<768);
    window.addEventListener("resize",fn);
    return()=>window.removeEventListener("resize",fn);
  },[]);
  return mob;
}

/* ═══════════════════════════════════
   TOKENS
═══════════════════════════════════ */
const T = {
  bgBase:   "#0a1222",
  bgMid:    "#0f1a2e",
  bgCard:   "#111e30",
  border:   "#1a2a38",
  borderHi: "#2a4460",
  blue:     "#4a90c4",
  blueHi:   "#6aaee0",
  blueDim:  "#2a5880",
  muted:    "#3a5872",
  body:     "#4a6880",
  sub:      "#1e3048",
};
const chrome = { background:"linear-gradient(175deg,#d8eaf8 0%,#7aa8c8 40%,#b8d4e8 68%,#5888a8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };
const electric = { background:`linear-gradient(135deg,${T.blueHi} 0%,${T.blue} 50%,${T.blueDim} 100%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

/* ═══════════════════════════════════
   CURSOR — dot + trail
═══════════════════════════════════ */
let _sid=0;
function WeldingCursor() {
  const dot   = useRef(null);
  const halo  = useRef(null);
  const sparks= useRef([]);
  const trail = useRef([]); // [{x,y,life}]
  const ctr   = useRef(null);
  const trlCtr= useRef(null);
  const raf   = useRef(null);
  const m     = useRef({x:-400,y:-400});
  const lg    = useRef({x:-400,y:-400});
  const lt    = useRef(0);
  const mv    = useRef(false);
  const mt    = useRef(null);

  useEffect(()=>{
    const onM=e=>{
      m.current={x:e.clientX,y:e.clientY};
      mv.current=true;
      clearTimeout(mt.current);
      mt.current=setTimeout(()=>mv.current=false,110);
    };
    window.addEventListener("mousemove",onM);
    const tick=ts=>{
      const {x,y}=m.current;
      if(dot.current)  dot.current.style.transform =`translate(${x-3}px,${y-3}px)`;
      lg.current.x+=(x-lg.current.x)*0.08;
      lg.current.y+=(y-lg.current.y)*0.08;
      if(halo.current) halo.current.style.transform=`translate(${lg.current.x-14}px,${lg.current.y-14}px)`;

      // Trail points
      if(mv.current){
        trail.current.push({x,y,life:1});
        if(trail.current.length>28) trail.current.shift();
      }
      trail.current.forEach(p=>p.life-=0.06);
      trail.current=trail.current.filter(p=>p.life>0);
      if(trlCtr.current){
        trlCtr.current.innerHTML="";
        trail.current.forEach((p,i)=>{
          if(i===0) return;
          const prev=trail.current[i-1];
          const d=document.createElement("div");
          const op=p.life*0.35;
          const sz=p.life*3;
          d.style.cssText=`position:fixed;left:${p.x}px;top:${p.y}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${T.blue};opacity:${op};pointer-events:none;transform:translate(-50%,-50%);box-shadow:0 0 ${sz*2}px ${T.blue};`;
          trlCtr.current.appendChild(d);
        });
      }

      // Sparks
      if(mv.current && ts-lt.current>65){
        lt.current=ts;
        for(let i=0;i<Math.floor(Math.random()*2)+1;i++){
          const a=Math.random()*Math.PI*2,spd=Math.random()*1.8+0.4;
          sparks.current.push({id:_sid++,x,y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd-0.9,life:1,decay:0.045+Math.random()*0.02,sz:Math.random()*1.2+0.4});
        }
      }
      sparks.current=sparks.current.filter(s=>s.life>0);
      if(ctr.current){
        ctr.current.innerHTML="";
        sparks.current.forEach(s=>{
          s.x+=s.vx;s.y+=s.vy;s.vy+=0.07;s.vx*=0.97;s.life-=s.decay;
          const d=document.createElement("div");
          const h=200+(1-s.life)*20,l=62+s.life*28;
          d.style.cssText=`position:fixed;left:${s.x}px;top:${s.y}px;width:${s.sz}px;height:${s.sz}px;border-radius:50%;background:hsl(${h},80%,${l}%);opacity:${Math.max(0,s.life*0.85)};box-shadow:0 0 ${s.sz*2.5}px hsl(${h},90%,${l+10}%);pointer-events:none;transform:translate(-50%,-50%);`;
          ctr.current.appendChild(d);
        });
      }
      raf.current=requestAnimationFrame(tick);
    };
    raf.current=requestAnimationFrame(tick);
    return()=>{window.removeEventListener("mousemove",onM);cancelAnimationFrame(raf.current);};
  },[]);

  return(<>
    <div ref={trlCtr} style={{position:"fixed",inset:0,zIndex:9996,pointerEvents:"none"}}/>
    <div ref={ctr}    style={{position:"fixed",inset:0,zIndex:9997,pointerEvents:"none"}}/>
    <div ref={halo}   style={{position:"fixed",top:0,left:0,zIndex:9999,pointerEvents:"none",width:28,height:28,borderRadius:"50%",background:`radial-gradient(circle,${T.blue}18 0%,transparent 70%)`,filter:"blur(5px)"}}/>
    <div ref={dot}    style={{position:"fixed",top:0,left:0,zIndex:9999,pointerEvents:"none",width:6,height:6,borderRadius:"50%",background:"hsl(210,90%,92%)",boxShadow:`0 0 4px 1px ${T.blue},0 0 8px 3px ${T.blueDim}88`}}/>
  </>);
}

/* ═══════════════════════════════════
   WELD LINE
═══════════════════════════════════ */
function WeldLine({delay=0,onDone,width="100%"}){
  const lineEl  = useRef(null);
  const heatEl  = useRef(null);
  const ctrEl   = useRef(null);
  const sparks  = useRef([]);
  const arcX    = useRef(0);
  const arcY    = useRef(0);
  const done    = useRef(false);
  const arcOpacity = useRef(1);
  let _id = 0;

  useEffect(()=>{
    const t=setTimeout(()=>{
      const dur=1400, start=performance.now();
      const W=lineEl.current?.parentElement?.offsetWidth||460;

      const tick=now=>{
        const p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,3), px=e*W;
        const lineTop = lineEl.current?.getBoundingClientRect().top ?? 0;
        const lineLeft= lineEl.current?.getBoundingClientRect().left ?? 0;

        if(lineEl.current) lineEl.current.style.width=`${px}px`;
        if(heatEl.current){const gw=Math.min(px,80);heatEl.current.style.width=`${gw}px`;heatEl.current.style.left=`${Math.max(0,px-gw)}px`;}

        // Track arc position in container coords
        arcX.current = px;

        // Spawn sparks while moving
        if(p<1 && p>0.02 && Math.random()<0.7){
          const angle = -Math.PI/2 + (Math.random()-0.5)*2.2;
          const spd   = Math.random()*2.8+1;
          sparks.current.push({
            id:_id++,
            x:px, y:1,
            vx:Math.cos(angle)*spd,
            vy:Math.sin(angle)*spd,
            life:1,
            decay:0.055+Math.random()*0.04,
            sz:Math.random()*1.8+0.5,
          });
        }

        // At finish — fade arc point
        if(p>=1 && !done.current){
          done.current=true;
          // Spawn a burst of sparks
          for(let i=0;i<8;i++){
            const a=Math.random()*Math.PI*2, spd=Math.random()*3+1;
            sparks.current.push({id:_id++,x:W,y:1,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd-1,life:1,decay:0.04+Math.random()*0.03,sz:Math.random()*2+0.8});
          }
          // Fade out arc glow
          const fadeStart=performance.now();
          const fade=fn=>{
            const fp=Math.min((fn-fadeStart)/600,1);
            arcOpacity.current=1-fp;
            if(fp<1) requestAnimationFrame(fade);
            else { arcOpacity.current=0; onDone?.(); }
          };
          requestAnimationFrame(fade);
        }

        // Update sparks
        sparks.current=sparks.current.filter(s=>s.life>0);
        sparks.current.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=0.12;s.vx*=0.95;s.life-=s.decay;});

        // Render into canvas-like div
        if(ctrEl.current){
          ctrEl.current.innerHTML="";

          // Arc point (only while not done fading)
          if(arcOpacity.current>0){
            const arc=document.createElement("div");
            arc.style.cssText=`position:absolute;left:${arcX.current}px;top:50%;transform:translate(-50%,-50%);width:8px;height:8px;border-radius:50%;background:hsl(205,100%,94%);box-shadow:0 0 3px 1px hsl(205,100%,85%),0 0 8px 3px ${T.blue},0 0 16px 5px ${T.blueDim}80;z-index:2;pointer-events:none;opacity:${arcOpacity.current};`;
            ctrEl.current.appendChild(arc);
          }

          // Sparks
          sparks.current.forEach(s=>{
            const d=document.createElement("div");
            const h=200+(1-s.life)*20, l=62+s.life*28;
            d.style.cssText=`position:absolute;left:${s.x}px;top:calc(50% + ${s.y}px);transform:translate(-50%,-50%);width:${s.sz}px;height:${s.sz}px;border-radius:50%;background:hsl(${h},85%,${l}%);opacity:${Math.max(0,s.life*0.9)};box-shadow:0 0 ${s.sz*2}px hsl(${h},90%,${l+10}%);pointer-events:none;`;
            ctrEl.current.appendChild(d);
          });
        }

        if(p<1 || sparks.current.length>0 || arcOpacity.current>0) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },delay);
    return()=>clearTimeout(t);
  },[]);

  return(
    <div style={{position:"relative",height:20,width}}>
      {/* Ghost track */}
      <div style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:0,right:0,height:2,background:"rgba(255,255,255,.022)",borderRadius:2}}/>
      {/* Heat trail */}
      <div ref={heatEl} style={{position:"absolute",top:"calc(50% - 4px)",height:8,background:`linear-gradient(90deg,transparent,${T.blueDim}30)`,borderRadius:4,pointerEvents:"none"}}/>
      {/* Bead */}
      <div ref={lineEl} style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:0,height:2,width:0,background:`linear-gradient(90deg,${T.sub},${T.blueDim},${T.blue})`,borderRadius:2,boxShadow:`0 0 5px ${T.blueDim}80`}}/>
      {/* Arc + sparks container */}
      <div ref={ctrEl} style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"visible"}}/>
    </div>
  );
}

/* Solo la chispa viajando, sin cordón */
function WeldSparkOnly({delay=0}){
  const ctrEl=useRef(null);
  const sparks=useRef([]);
  const arcOpacity=useRef(1);
  const done=useRef(false);
  let _id=0;

  useEffect(()=>{
    const t=setTimeout(()=>{
      const dur=1400,start=performance.now();
      const W=ctrEl.current?.offsetWidth||200;
      const tick=now=>{
        const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3),px=e*W;
        if(p<1&&p>0.02&&Math.random()<0.65){
          const angle=-Math.PI/2+(Math.random()-0.5)*2.2,spd=Math.random()*2.5+0.8;
          sparks.current.push({id:_id++,x:px,y:0,vx:Math.cos(angle)*spd,vy:Math.sin(angle)*spd,life:1,decay:0.055+Math.random()*0.04,sz:Math.random()*1.6+0.5});
        }
        if(p>=1&&!done.current){
          done.current=true;
          for(let i=0;i<7;i++){const a=Math.random()*Math.PI*2,spd=Math.random()*2.5+1;sparks.current.push({id:_id++,x:W,y:0,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd-1,life:1,decay:0.045+Math.random()*0.03,sz:Math.random()*1.8+0.6});}
          const fs=performance.now();
          const fade=fn=>{const fp=Math.min((fn-fs)/500,1);arcOpacity.current=1-fp;if(fp<1)requestAnimationFrame(fade);else arcOpacity.current=0;};
          requestAnimationFrame(fade);
        }
        sparks.current=sparks.current.filter(s=>s.life>0);
        sparks.current.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=0.1;s.vx*=0.96;s.life-=s.decay;});
        if(ctrEl.current){
          ctrEl.current.innerHTML="";
          if(arcOpacity.current>0){
            const arc=document.createElement("div");
            arc.style.cssText=`position:absolute;left:${px}px;top:50%;transform:translate(-50%,-50%);width:7px;height:7px;border-radius:50%;background:hsl(205,100%,94%);box-shadow:0 0 3px 1px hsl(205,100%,85%),0 0 8px 3px ${T.blue},0 0 14px 5px ${T.blueDim}80;z-index:2;pointer-events:none;opacity:${arcOpacity.current};`;
            ctrEl.current.appendChild(arc);
          }
          sparks.current.forEach(s=>{
            const d=document.createElement("div");
            const h=200+(1-s.life)*20,l=62+s.life*28;
            d.style.cssText=`position:absolute;left:${s.x}px;top:calc(50% + ${s.y}px);transform:translate(-50%,-50%);width:${s.sz}px;height:${s.sz}px;border-radius:50%;background:hsl(${h},85%,${l}%);opacity:${Math.max(0,s.life*0.85)};box-shadow:0 0 ${s.sz*2}px hsl(${h},90%,${l+10}%);pointer-events:none;`;
            ctrEl.current.appendChild(d);
          });
        }
        if(p<1||sparks.current.length>0||arcOpacity.current>0) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },delay);
    return()=>clearTimeout(t);
  },[]);

  return(
    <div style={{position:"relative",height:20,width:"100%"}}>
      {/* Ghost track — invisible, just for reference */}
      <div style={{position:"absolute",top:"50%",left:0,right:0,height:0,transform:"translateY(-50%)"}}/>
      <div ref={ctrEl} style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"visible"}}/>
    </div>
  );
}

/* ═══════════════════════════════════
   DIAGONAL DIVIDER
═══════════════════════════════════ */
function DiagDivider({flip=false}){
  return(
    <div style={{position:"relative",height:60,overflow:"hidden",pointerEvents:"none"}}>
      <div style={{position:"absolute",inset:0,background:T.bgBase,clipPath:flip?"polygon(0 0,100% 40%,100% 100%,0 100%)":"polygon(0 40%,100% 0,100% 100%,0 100%)"}}/>
      <div style={{position:"absolute",top:flip?"38%":"36%",left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${T.blue}40,${T.blue}70,${T.blue}40,transparent)`,transform:flip?"rotate(-1.8deg)":"rotate(1.8deg)"}}/>
    </div>
  );
}

/* ═══════════════════════════════════
   COUNTING NUMBER
═══════════════════════════════════ */
function CountUp({target,suffix="",duration=1600}){
  const [val,setVal]=useState(0);
  const started=useRef(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && !started.current){
        started.current=true;
        const start=performance.now();
        const num=parseInt(target);
        const tick=now=>{
          const p=Math.min((now-start)/duration,1);
          const e=1-Math.pow(1-p,3);
          setVal(Math.floor(e*num));
          if(p<1) requestAnimationFrame(tick);
          else setVal(num);
        };
        requestAnimationFrame(tick);
      }
    },{threshold:.5});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════
   SVG ICONS
═══════════════════════════════════ */
const Ico={
  furniture:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="2"/><rect x="5" y="12" width="14" height="6" rx="1"/><line x1="7" y1="18" x2="7" y2="21"/><line x1="17" y1="18" x2="17" y2="21"/><rect x="4" y="5" width="16" height="5" rx="1"/></svg>),
  structure:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="12,3 22,20 2,20"/><line x1="12" y1="10" x2="12" y2="20"/><line x1="7" y1="16" x2="17" y2="16"/></svg>),
  door:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="4" y="2" width="16" height="20" rx="1"/><circle cx="15.5" cy="12" r="1"/><line x1="4" y1="22" x2="20" y2="22"/></svg>),
  fence:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/><line x1="6" y1="6" x2="6" y2="9"/><polygon points="6,4 4,6 8,6"/><line x1="12" y1="6" x2="12" y2="9"/><polygon points="12,4 10,6 14,6"/><line x1="18" y1="6" x2="18" y2="9"/><polygon points="18,4 16,6 20,6"/><line x1="6" y1="15" x2="6" y2="20"/><line x1="12" y1="15" x2="12" y2="20"/><line x1="18" y1="15" x2="18" y2="20"/></svg>),
  weld:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 20 L10 8"/><path d="M10 8 L17 20"/><line x1="6" y1="14" x2="14" y2="14"/><circle cx="20" cy="6" r="2"/><line x1="21.4" y1="4.6" x2="23" y2="3"/><line x1="20" y1="4" x2="20" y2="2"/><line x1="18.6" y1="4.6" x2="17" y2="3"/></svg>),
  stairs:(<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="2,20 2,16 8,16 8,12 14,12 14,8 20,8 20,4"/><line x1="2" y1="20" x2="20" y2="20"/></svg>),
};

/* ═══════════════════════════════════
   NAV
═══════════════════════════════════ */
const NAVLINKS=["Inicio","Servicios","Materiales","Proceso","Proyectos","Testimonios"];
function Nav({active,setActive}){
  const mob=useIsMobile();
  const [open,setOpen]=useState(false);
  const Logo=()=>(
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:2,height:28,background:`linear-gradient(180deg,${T.blueHi},${T.blueDim})`,borderRadius:2,boxShadow:`0 0 8px ${T.blue}80`}}/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"stretch",lineHeight:1}}>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:mob?18:22,letterSpacing:4,...chrome}}>ESTRUCTURAS</span>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:mob?9:11,letterSpacing:7,color:T.blue,textTransform:"uppercase",marginTop:1}}>RAVICHAGUA</span>
        </div>
      </div>
    </div>
  );
  if(mob) return(
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:`${T.bgBase}f8`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56}}>
        <Logo/>
        <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:5,padding:"6px 10px",cursor:"pointer",display:"flex",flexDirection:"column",gap:4}}>
          {[0,1,2].map(i=><div key={i} style={{width:20,height:1.5,background:T.muted}}/>)}
        </button>
      </nav>
      {open&&(
        <div style={{position:"fixed",top:56,left:0,right:0,zIndex:99,background:`${T.bgBase}fc`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,padding:"16px 20px 20px",display:"flex",flexDirection:"column",gap:2}}>
          {NAVLINKS.map(l=>(
            <button key={l} onClick={()=>{setActive(l);setOpen(false);}} style={{background:"none",border:"none",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:15,letterSpacing:2.5,color:active===l?T.blue:T.muted,cursor:"pointer",textTransform:"uppercase",textAlign:"left",padding:"10px 4px",borderBottom:`1px solid ${T.border}22`}}>{l}</button>
          ))}
          <button style={{marginTop:12,background:`linear-gradient(135deg,${T.blue},${T.blueDim})`,color:"#fff",border:"none",borderRadius:5,padding:"12px",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,textTransform:"uppercase"}}>Cotizar</button>
        </div>
      )}
    </>
  );
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:`${T.bgBase}f2`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,padding:"0 44px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56}}>
      <Logo/>
      <div style={{display:"flex",gap:18,alignItems:"center"}}>
        {NAVLINKS.map(l=>(
          <button key={l} onClick={()=>setActive(l)} style={{background:"none",border:"none",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:12,letterSpacing:2.5,color:active===l?T.blue:T.muted,cursor:"none",transition:"color .2s",textTransform:"uppercase"}}>{l}</button>
        ))}
        <button style={{background:`linear-gradient(135deg,${T.blue},${T.blueDim})`,color:"#fff",border:"none",borderRadius:5,padding:"8px 18px",fontSize:11,fontWeight:800,cursor:"none",fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,boxShadow:`0 0 14px ${T.blueDim}60`,textTransform:"uppercase"}}>Cotizar</button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════
   SECTION TITLE
═══════════════════════════════════ */
function SectionTitle({line1,accent,sub}){
  const [k]=useState(()=>Math.random());
  return(
    <div style={{textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:8}}>
        <div style={{flex:1,maxWidth:60,height:1,background:`linear-gradient(90deg,transparent,${T.border})`}}/>
        <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:10,letterSpacing:5,color:T.border,textTransform:"uppercase"}}>Estructuras Ravichagua</span>
        <div style={{flex:1,maxWidth:60,height:1,background:`linear-gradient(90deg,${T.border},transparent)`}}/>
      </div>
      <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"clamp(36px,5vw,76px)",lineHeight:1,margin:0}}>
        <span style={chrome}>{line1} </span>
        <span style={electric}>{accent}</span>
      </h2>
      <div style={{display:"flex",justifyContent:"center",marginTop:10}}>
        <div style={{width:200}}><WeldLine key={k} delay={250}/></div>
      </div>
      {sub&&<p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:15,color:T.body,marginTop:18}}>{sub}</p>}
    </div>
  );
}

/* Solo chispa, sin línea inferior */
function SectionTitleSpark({line1,accent,sub}){
  const [k]=useState(()=>Math.random());
  return(
    <div style={{textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:8}}>
        <div style={{flex:1,maxWidth:60,height:1,background:`linear-gradient(90deg,transparent,${T.border})`}}/>
        <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:10,letterSpacing:5,color:T.border,textTransform:"uppercase"}}>Estructuras Ravichagua</span>
        <div style={{flex:1,maxWidth:60,height:1,background:`linear-gradient(90deg,${T.border},transparent)`}}/>
      </div>
      <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"clamp(36px,5vw,76px)",lineHeight:1,margin:0}}>
        <span style={chrome}>{line1} </span>
        <span style={electric}>{accent}</span>
      </h2>
      {/* Solo el punto-chispa que recorre sin dejar línea */}
      <div style={{display:"flex",justifyContent:"center",marginTop:10}}>
        <div style={{width:200}}><WeldSparkOnly key={k} delay={250}/></div>
      </div>
      {sub&&<p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:15,color:T.body,marginTop:18}}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════
   HERO  — split layout + bg numbers + counters
═══════════════════════════════════ */
function HeroSection(){
  const mob=useIsMobile();
  const [phase,setPhase]=useState(0);
  const [lineDone,setLineDone]=useState(false);
  const w1=["Estructuras","y","muebles","metálicos"];
  const w2=["a","medida"];
  useEffect(()=>{
    let i=0;
    const t=setInterval(()=>{i++;setPhase(i);if(i>=w1.length+w2.length+6)clearInterval(t);},100);
    return()=>clearInterval(t);
  },[]);
  const titleDone=phase>=w1.length+w2.length;

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:T.bgBase}}>
      {/* ── FOTO DE FONDO SOLDADURA — primer elemento, todo lo demás va encima ── */}
      <img src="https://wrzammhherzgdxtrfhmk.supabase.co/storage/v1/object/public/ravichagua/Gemini_Generated_Image_n4d47qn4d47qn4d4.jfif" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.55,pointerEvents:"none",userSelect:"none",zIndex:0}}/>

      {/* Overlay oscuro MUY ligero — solo para legibilidad del texto */}
      <div style={{position:"absolute",inset:0,background:`rgba(10,18,34,.55)`,pointerEvents:"none",zIndex:1}}/>
      {/* Grid blueprint sutil */}
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${T.border}22 1px,transparent 1px),linear-gradient(90deg,${T.border}22 1px,transparent 1px)`,backgroundSize:"88px 88px",pointerEvents:"none",zIndex:2}}/>
      {/* Esquinas verdes */}
      <div style={{position:"absolute",top:0,left:0,width:"55%",height:"55%",background:"radial-gradient(ellipse at 0% 0%,rgba(40,90,60,.18) 0%,transparent 70%)",pointerEvents:"none",zIndex:2}}/>
      <div style={{position:"absolute",bottom:0,right:0,width:"55%",height:"55%",background:"radial-gradient(ellipse at 100% 100%,rgba(40,90,60,.18) 0%,transparent 70%)",pointerEvents:"none",zIndex:2}}/>
      {!mob&&<div style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"38vw",lineHeight:1,color:"transparent",WebkitTextStroke:`1px ${T.border}`,opacity:.08,pointerEvents:"none",userSelect:"none"}}>10</div>}
      {[[28,28],[28,"calc(100% - 28px)"],["calc(100% - 28px)",28],["calc(100% - 28px)","calc(100% - 28px)"]].map(([tp,lf],i)=>(
        <div key={i} style={{position:"absolute",top:tp,left:lf,width:6,height:6,borderRadius:"50%",background:`radial-gradient(circle at 35% 35%,${T.muted},${T.bgCard})`,boxShadow:"inset 0 1px 2px rgba(0,0,0,.9),0 1px 1px rgba(255,255,255,.05)"}}/>
      ))}

      <div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1200,margin:"0 auto",padding:mob?"100px 22px 60px":"140px 52px 80px",display:"grid",gridTemplateColumns:mob?"1fr":"1fr 380px",gap:mob?40:60,alignItems:"center"}}>

        {/* LEFT — headline */}
        <div>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:mob?28:40,opacity:phase>0?1:0,transition:"opacity .5s"}}>
            <div style={{height:1,width:36,background:`linear-gradient(90deg,transparent,${T.blue})`}}/>
            <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:10,fontWeight:700,letterSpacing:4,color:T.blue,textTransform:"uppercase"}}>Fabricación metálica profesional</span>
            <div style={{height:1,flex:1,background:`linear-gradient(90deg,${T.blue},${T.blue}05)`}}/>
          </div>

          <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:mob?"clamp(48px,13vw,72px)":"clamp(56px,6.5vw,104px)",lineHeight:1,margin:0}}>
            <div style={{display:"block",marginBottom:6}}>
              {w1.map((w,i)=>(
                <span key={w+i} style={{display:"inline-block",marginRight:"0.16em",...chrome,opacity:phase>i?1:0,transform:phase>i?"translateY(0)":"translateY(60px)",transition:`all .5s cubic-bezier(.22,1,.36,1) ${i*.04}s`}}>{w}</span>
              ))}
            </div>
            <div style={{display:"block"}}>
              {w2.map((w,i)=>(
                <span key={w+i} style={{display:"inline-block",marginRight:"0.16em",...electric,opacity:phase>w1.length+i?1:0,transform:phase>w1.length+i?"translateY(0)":"translateY(60px)",transition:`all .5s cubic-bezier(.22,1,.36,1) ${(w1.length+i)*.04}s`}}>{w}</span>
              ))}
            </div>
          </h1>

          <div style={{maxWidth:510,marginTop:10,opacity:titleDone?1:0,transition:"opacity .2s"}}>
            {titleDone&&<WeldLine delay={80} onDone={()=>setLineDone(true)}/>}
          </div>
          <div style={{marginTop:10,height:24,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:8,transform:lineDone?"translateX(0)":"translateX(-24px)",opacity:lineDone?1:0,transition:"all .7s ease-out"}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,letterSpacing:3,...chrome}}>ESTRUCTURAS</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:10,letterSpacing:6,color:`${T.blue}88`,textTransform:"uppercase"}}>RAVICHAGUA</span>
            </div>
          </div>

          <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:mob?16:18,fontWeight:500,color:T.body,maxWidth:460,lineHeight:1.68,margin:`${mob?24:32}px 0 ${mob?24:34}px`,opacity:lineDone?1:0,transform:lineDone?"translateY(0)":"translateY(12px)",transition:"all .5s .15s"}}>
            Más de 10&nbsp;años fabricando mesas, barras y estructuras metálicas con acabados profesionales.
          </p>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",opacity:lineDone?1:0,transition:"all .5s .45s"}}>
            <HeroBtn primary label="Cotizar por WhatsApp"/>
            <HeroBtn label="Ver proyectos →"/>
          </div>
        </div>

        {/* RIGHT — glass panel (hidden on mobile unless lineDone) */}
        {(!mob||lineDone)&&(
        <div style={{opacity:lineDone?1:0,transform:lineDone?"translateX(0)":"translateX(40px)",transition:"all .7s .6s"}}>
          <div style={{background:`linear-gradient(145deg,${T.bgCard}cc,${T.bgMid}cc)`,border:`1px solid ${T.borderHi}`,borderRadius:14,padding:mob?20:32,backdropFilter:"blur(12px)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${T.blue}60,transparent)`}}/>
            <div style={{position:"absolute",top:0,left:"20%",width:"60%",height:"40%",background:`radial-gradient(ellipse,${T.blue}08 0%,transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:10,letterSpacing:4,color:T.muted,textTransform:"uppercase",marginBottom:mob?16:28}}>Resultados</div>
            <div style={{display:mob?"flex":"block",gap:mob?16:0,justifyContent:mob?"space-between":"flex-start"}}>
            {[{v:"500",s:"+",l:"Proyectos entregados"},{v:"10",s:"+",l:"Años de experiencia"},{v:"100",s:"%",l:"Trabajos a medida"}].map((st,i)=>(
              <div key={st.l} style={{marginBottom:mob?0:i<2?24:0,flex:mob?"1":undefined}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:mob?36:56,lineHeight:1,...electric}}>
                  <CountUp target={st.v} suffix={st.s} duration={1800}/>
                </div>
                <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:mob?11:13,color:T.body,letterSpacing:.5}}>{st.l}</div>
                {!mob&&i<2&&<div style={{height:1,background:T.border,marginTop:20}}/>}
              </div>
            ))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:mob?16:28}}>
              {["MIG/TIG","Inox","Carbono","Aluminio"].map(c=>(
                <span key={c} style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:10,letterSpacing:2,color:T.muted,border:`1px solid ${T.border}`,borderRadius:3,padding:"4px 10px",textTransform:"uppercase"}}>{c}</span>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
      <CornerBracket style={{bottom:22,left:22}}/>
      <CornerBracket style={{bottom:22,right:22}} flip/>
    </div>
  );
}

function CornerBracket({style,flip}){
  return(
    <div style={{position:"absolute",...style,width:26,height:26,pointerEvents:"none",opacity:.25,transform:flip?"scaleX(-1)":"none"}}>
      <div style={{position:"absolute",bottom:0,left:0,width:"100%",height:1,background:T.blue}}/>
      <div style={{position:"absolute",bottom:0,left:0,width:1,height:"100%",background:T.blue}}/>
    </div>
  );
}

function HeroBtn({label,primary}){
  const [h,setH]=useState(false);
  return(
    <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{position:"relative",overflow:"hidden",background:primary?`linear-gradient(135deg,${T.blue},${T.blueDim})`:"transparent",color:primary?"#fff":T.muted,border:primary?"none":`1px solid ${T.borderHi}`,borderRadius:5,padding:"13px 28px",fontSize:13,fontWeight:800,fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,cursor:"none",transform:h?"scale(1.04)":"scale(1)",transition:"transform .2s",boxShadow:primary&&h?`0 0 26px ${T.blue}60`:primary?`0 0 14px ${T.blueDim}50`:"none",textTransform:"uppercase"}}>
      {primary&&<div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)",transform:`translateX(${h?"200%":"-100%"}) skewX(-12deg)`,transition:"transform .5s"}}/>}
      <span style={{position:"relative",zIndex:1}}>{label}</span>
    </button>
  );
}

/* ═══════════════════════════════════
   SERVICES — big bg number C
═══════════════════════════════════ */
const services=[
  {icon:Ico.furniture,title:"Muebles metálicos",     desc:"Mesas de comedor, barras, estantes y repisas industriales.",detail:"Acero al carbono, inoxidable y combinaciones con madera a medida."},
  {icon:Ico.structure,title:"Estructuras metálicas", desc:"Entrepisos, techos, columnas y refuerzos estructurales.",   detail:"MIG/TIG. Entrega con planos y certificado."},
  {icon:Ico.door,     title:"Puertas y portones",    desc:"Enrollables, batientes, corredizas y automatizados.",       detail:"Electrostática o galvanizado. Instalación incluida."},
  {icon:Ico.fence,    title:"Rejas y cerramientos",  desc:"Rejas de seguridad, barandas y cercos perimétricos.",       detail:"Diseños minimalistas y ornamentales."},
  {icon:Ico.weld,     title:"Soldadura especializada",desc:"Reparaciones MIG, TIG y arco eléctrico.",                  detail:"Taller y domicilio. Todos los metales."},
  {icon:Ico.stairs,   title:"Escaleras metálicas",   desc:"Rectas, caracol, tipo U y L con barandas.",                detail:"Metal + vidrio o madera. Cálculo estructural."},
];

function ServicesSection(){
  const mob=useIsMobile();
  const [open,setOpen]=useState(null);
  return(
    <div style={{background:T.bgBase,position:"relative",overflow:"hidden"}}>
      <DiagDivider/>
      <div style={{position:"absolute",left:"-3%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"32vw",lineHeight:1,color:"transparent",WebkitTextStroke:`1px ${T.border}`,opacity:.05,pointerEvents:"none",userSelect:"none"}}>06</div>
      <div style={{padding:mob?"60px 20px 80px":"80px 52px 100px",maxWidth:1120,margin:"0 auto",position:"relative"}}>
        <SectionTitle line1="Nuestros" accent="servicios" sub="Soluciones metálicas completas para hogares, negocios y proyectos industriales."/>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(auto-fill,minmax(310px,1fr))",gap:14,marginTop:44}}>
          {services.map((s,i)=><SvcCard key={s.title} s={s} expanded={open===i} toggle={()=>setOpen(open===i?null:i)}/>)}
        </div>
      </div>
      <DiagDivider flip/>
    </div>
  );
}

function SvcCard({s,expanded,toggle}){
  const [h,setH]=useState(false);
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:`linear-gradient(150deg,${T.bgCard},${T.bgMid})`,border:`1px solid ${T.border}`,borderRadius:8,padding:26,transform:h?"translateY(-5px)":"translateY(0)",transition:"transform .3s cubic-bezier(.22,1,.36,1)"}}>
      <div style={{width:44,height:44,borderRadius:8,background:`linear-gradient(135deg,${T.bgBase},${T.bgMid})`,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,color:T.muted}}>
        {s.icon}
      </div>
      <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:26,...chrome,margin:"0 0 8px"}}>{s.title}</h3>
      <p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:14,color:T.body,lineHeight:1.65,margin:0}}>{s.desc}</p>
      <div style={{overflow:"hidden",maxHeight:expanded?"120px":"0",opacity:expanded?1:0,transition:"max-height .35s ease,opacity .3s ease",marginTop:expanded?12:0}}>
        <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:13,color:T.muted,lineHeight:1.65,margin:0}}>{s.detail}</p>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:18}}>
        <button onClick={toggle} style={{background:"none",border:"none",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:11,letterSpacing:2,color:T.border,cursor:"none",textTransform:"uppercase"}}>{expanded?"▲ Menos":"▼ Más info"}</button>
        <button style={{background:`${T.blue}12`,border:`1px solid ${T.blue}38`,color:T.blue,borderRadius:4,padding:"5px 13px",fontSize:10,fontWeight:800,cursor:"none",fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,textTransform:"uppercase"}}>Cotizar</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MATERIALS SELECTOR — F
   3 materials, bg tint shifts
═══════════════════════════════════ */
const MATERIALS=[
  {id:"carbono", label:"Acero al carbono", tint:"rgba(50,70,90,.25)",  accent:"#6a9ab8", desc:"El más versátil y económico. Ideal para estructuras, muebles y elementos decorativos. Alta resistencia mecánica, fácil de soldar y pintar.", props:["Alta resistencia","Fácil soldadura","Pintura electrostática","Económico"]},
  {id:"inox",    label:"Acero inoxidable", tint:"rgba(80,110,130,.3)", accent:"#8cc4d8", desc:"Resistencia a la corrosión y aspecto premium. Perfecto para barras, cocinas industriales y ambientes húmedos. Acabado brushed o pulido.", props:["Anticorrosión","Acabado pulido","Apto alimentario","Alta durabilidad"]},
  {id:"alum",    label:"Aluminio",          tint:"rgba(40,80,120,.2)", accent:"#5a90c0", desc:"Ligero y resistente a la vez. Ideal para fachadas, estructuras en altura y proyectos donde el peso es crítico. Anodizado o en bruto.", props:["Liviano","Anticorrosión natural","Anodizado","Estructuras en altura"]},
];

function MaterialsSection(){
  const mob=useIsMobile();
  const [active,setActive]=useState(0);
  const mat=MATERIALS[active];
  return(
    <div style={{background:T.bgBase,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:mat.tint,transition:"background 1s ease",pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"30vw",lineHeight:1,color:"transparent",WebkitTextStroke:`1px ${T.border}`,opacity:.06,pointerEvents:"none",userSelect:"none"}}>03</div>
      <div style={{padding:mob?"60px 20px 80px":"80px 52px",maxWidth:1120,margin:"0 auto",position:"relative"}}>
        <SectionTitleSpark line1="Nuestros" accent="materiales"/>
        <div style={{display:"flex",justifyContent:"center",gap:0,marginTop:44,border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden",maxWidth:mob?"100%":520,margin:"44px auto 0",flexDirection:mob?"column":"row"}}>
          {MATERIALS.map((m,i)=>(
            <button key={m.id} onClick={()=>setActive(i)} style={{flex:1,background:active===i?`linear-gradient(135deg,${T.blue},${T.blueDim})`:"transparent",color:active===i?"#fff":T.muted,border:"none",borderRight:!mob&&i<2?`1px solid ${T.border}`:"none",borderBottom:mob&&i<2?`1px solid ${T.border}`:"none",padding:mob?"14px":"12px 8px",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:1.5,textTransform:"uppercase",transition:"all .3s"}}>{m.label}</button>
          ))}
        </div>
        <div style={{marginTop:mob?32:48,display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?24:40,alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{width:3,height:32,background:`linear-gradient(180deg,${mat.accent},${T.blueDim})`,borderRadius:2}}/>
              <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:mob?28:36,...chrome,margin:0}}>{mat.label}</h3>
            </div>
            <p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:mob?15:16,color:T.body,lineHeight:1.7,margin:"0 0 28px"}}>{mat.desc}</p>
            <WeldLine delay={0}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {mat.props.map((p,i)=>(
              <div key={p} style={{background:`linear-gradient(135deg,${T.bgCard},${T.bgMid})`,border:`1px solid ${T.border}`,borderRadius:8,padding:"14px 14px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:mat.accent,flexShrink:0,boxShadow:`0 0 6px ${mat.accent}`}}/>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:12,color:T.body,letterSpacing:.5}}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DiagDivider/>
    </div>
  );
}

/* ═══════════════════════════════════
   PROCESS TIMELINE — G
   Horizontal rail, weld arc advances
═══════════════════════════════════ */
const STEPS=[
  {n:1,icon:Ico.weld,    title:"Consulta",    desc:"Cuéntanos tu idea. Presupuesto en 24h sin compromiso."},
  {n:2,icon:Ico.stairs,  title:"Diseño",      desc:"Medidas, acabados y render para tu aprobación."},
  {n:3,icon:Ico.structure,title:"Fabricación",desc:"Taller propio. Control de calidad en cada etapa."},
  {n:4,icon:Ico.door,    title:"Entrega",     desc:"Instalamos en Lima. Envíos a provincias."},
];

function ProcessSection(){
  const mob=useIsMobile();
  const [active,setActive]=useState(0);
  const [lineW,setLineW]=useState(0);
  const railRef=useRef(null);

  const goTo=useCallback((i)=>{
    setActive(i);
    if(!railRef.current) return;
    const pct=i/(STEPS.length-1);
    const start=performance.now(), from=lineW, to=pct*100, dur=600;
    const tick=now=>{
      const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);
      setLineW(from+(to-from)*e);
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[lineW]);

  return(
    <div style={{background:T.bgBase,position:"relative",overflow:"hidden"}}>
      <DiagDivider flip/>
      <div style={{position:"absolute",left:"-2%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"30vw",lineHeight:1,color:"transparent",WebkitTextStroke:`1px ${T.border}`,opacity:.05,pointerEvents:"none",userSelect:"none"}}>04</div>
      <div style={{padding:mob?"60px 20px 80px":"80px 52px 100px",maxWidth:1120,margin:"0 auto",position:"relative"}}>
        <SectionTitle line1="Cómo" accent="trabajamos" sub="Un proceso simple y transparente de inicio a fin."/>

        {mob?(
          /* MOBILE: vertical stepper */
          <div style={{marginTop:44,display:"flex",flexDirection:"column",gap:0}}>
            {STEPS.map((s,i)=>(
              <div key={s.title} onClick={()=>goTo(i)} style={{display:"flex",gap:16,cursor:"pointer",paddingBottom:i<STEPS.length-1?28:0,position:"relative"}}>
                {/* Vertical line */}
                {i<STEPS.length-1&&<div style={{position:"absolute",left:32,top:66,bottom:0,width:2,background:active>i?`linear-gradient(180deg,${T.blue},${T.border})`:`${T.border}44`}}/>}
                <div style={{position:"relative",width:66,height:66,flexShrink:0,borderRadius:12,background:`linear-gradient(150deg,${T.bgCard},${T.bgMid})`,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.muted}}>
                  {s.icon}
                  <div style={{position:"absolute",top:-8,right:-8,width:20,height:20,borderRadius:"50%",background:`linear-gradient(135deg,${T.blue},${T.blueDim})`,color:"#fff",fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif"}}>{s.n}</div>
                </div>
                <div style={{paddingTop:8}}>
                  <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:22,...chrome,margin:"0 0 6px",textTransform:"uppercase",letterSpacing:1.5}}>{s.title}</h3>
                  <p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:13,color:T.muted,lineHeight:1.6,margin:0}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ):(
          /* DESKTOP: horizontal rail */
          <div ref={railRef} style={{position:"relative",marginTop:64}}>
            <div style={{position:"absolute",top:33,left:"6%",right:"6%",height:2,background:T.border,borderRadius:2}}/>
            <div style={{position:"absolute",top:33,left:"6%",height:2,borderRadius:2,width:`calc(${lineW}% * 0.88)`,background:`linear-gradient(90deg,${T.sub},${T.blueDim},${T.blue})`,boxShadow:`0 0 6px ${T.blue}60`,transition:"none"}}/>
            <div style={{position:"absolute",top:33,left:`calc(6% + ${lineW * 0.88}%)`,transform:"translate(-50%,-50%)",width:10,height:10,borderRadius:"50%",background:"hsl(205,100%,92%)",boxShadow:`0 0 4px 2px ${T.blue},0 0 12px 4px ${T.blueDim}`,zIndex:2,transition:"none"}}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
              {STEPS.map((s,i)=>(
                <div key={s.title} onClick={()=>goTo(i)} style={{textAlign:"center",cursor:"none"}}>
                  <div style={{position:"relative",width:66,height:66,borderRadius:12,background:`linear-gradient(150deg,${T.bgCard},${T.bgMid})`,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",color:T.muted}}>
                    {s.icon}
                    <div style={{position:"absolute",top:-8,right:-8,width:20,height:20,borderRadius:"50%",background:`linear-gradient(135deg,${T.blue},${T.blueDim})`,color:"#fff",fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif"}}>{s.n}</div>
                  </div>
                  <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:22,...chrome,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:1.5}}>{s.title}</h3>
                  <p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:13,color:T.muted,lineHeight:1.6,maxWidth:180,margin:"0 auto"}}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:44}}>
          <button onClick={()=>goTo(Math.max(0,active-1))} style={{background:T.bgCard,border:`1px solid ${T.border}`,color:T.muted,borderRadius:5,padding:"10px 24px",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,textTransform:"uppercase"}}>← Anterior</button>
          <button onClick={()=>goTo(Math.min(STEPS.length-1,active+1))} style={{background:`linear-gradient(135deg,${T.blue},${T.blueDim})`,border:"none",color:"#fff",borderRadius:5,padding:"10px 24px",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,textTransform:"uppercase",boxShadow:`0 0 14px ${T.blue}50`}}>Siguiente →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   GALLERY
═══════════════════════════════════ */
const cats=["Todos","Mesas","Barras","Estructuras","Puertas","Escaleras"];
const projs=[
  {id:1,title:"Mesa comedor industrial",cat:"Mesas",      g:`150deg,#151008,${T.bgBase}`},
  {id:2,title:"Barra para restaurante", cat:"Barras",     g:`150deg,#0c1826,${T.bgBase}`},
  {id:3,title:"Entrepiso comercial",    cat:"Estructuras",g:`150deg,#101a28,${T.bgBase}`},
  {id:4,title:"Portón corredizo",       cat:"Puertas",    g:`150deg,#141218,${T.bgBase}`},
  {id:5,title:"Escalera tipo U",        cat:"Escaleras",  g:`150deg,#180e08,${T.bgBase}`},
  {id:6,title:"Reja ornamental",        cat:"Estructuras",g:`150deg,#0c1830,${T.bgBase}`},
  {id:7,title:"Mesa de centro",         cat:"Mesas",      g:`150deg,#081c20,${T.bgBase}`},
  {id:8,title:"Barra cervecera",        cat:"Barras",     g:`150deg,#161008,${T.bgBase}`},
];

function GallerySection(){
  const mob=useIsMobile();
  const [f,setF]=useState("Todos");
  const filtered=f==="Todos"?projs:projs.filter(p=>p.cat===f);
  return(
    <div style={{background:T.bgBase,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:"-2%",top:"40%",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"28vw",lineHeight:1,color:"transparent",WebkitTextStroke:`1px ${T.border}`,opacity:.05,pointerEvents:"none",userSelect:"none"}}>08</div>
      <div style={{padding:mob?"60px 20px 80px":"80px 52px 100px",maxWidth:1120,margin:"0 auto",position:"relative"}}>
        <SectionTitle line1="Proyectos" accent="destacados" sub="Más de 500 proyectos entregados en Lima y provincias."/>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"36px 0 22px",justifyContent:"center"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setF(c)} style={{background:f===c?`linear-gradient(135deg,${T.blue},${T.blueDim})`:T.bgCard,color:f===c?"#fff":T.muted,border:f===c?"none":`1px solid ${T.border}`,borderRadius:4,padding:"7px 14px",fontSize:10,fontWeight:800,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:2,textTransform:"uppercase",transition:"all .2s"}}>{c}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(auto-fill,minmax(215px,1fr))",gap:10}}>
          {filtered.map(p=><ProjCard key={p.id} p={p}/>)}
        </div>
      </div>
      <DiagDivider flip/>
    </div>
  );
}

function ProjCard({p}){
  const [h,setH]=useState(false);
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{aspectRatio:"1",borderRadius:8,background:`linear-gradient(${p.g})`,border:`1px solid ${h?T.borderHi:T.border}`,position:"relative",overflow:"hidden",transform:h?"scale(1.035)":"scale(1)",boxShadow:h?`0 0 24px ${T.blueDim}40`:"none",transition:"all .3s cubic-bezier(.22,1,.36,1)",cursor:"none"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(255,255,255,.007) 5px,rgba(255,255,255,.007) 6px)"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(45deg,rgba(255,255,255,.009) 0,rgba(255,255,255,.009) 1px,transparent 1px,transparent 20px)"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:14,background:`linear-gradient(transparent,${T.bgBase}e0)`}}>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:9,color:T.blue,letterSpacing:3.5,textTransform:"uppercase",marginBottom:3}}>{p.cat}</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:18,...chrome}}>{p.title}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════ */
const tesis=[
  {name:"Carlos M.", district:"Miraflores",project:"Mesa de comedor",   text:"Excelente calidad y acabado. La mesa quedó perfecta, exactamente como la pedimos."},
  {name:"Ana R.",    district:"San Borja",  project:"Entrepiso metálico",text:"Cumplieron con el plazo y el presupuesto. El entrepiso quedó sólido y bien terminado."},
  {name:"Roberto L.",district:"La Molina",  project:"Reja perimetral",   text:"Diseño moderno y elegante. Los vecinos me preguntan quién lo hizo."},
];

function TestimonialsSection(){
  const mob=useIsMobile();
  return(
    <div style={{background:T.bgBase,position:"relative"}}>
      <div style={{padding:mob?"60px 20px 80px":"80px 52px 100px",maxWidth:1120,margin:"0 auto"}}>
        <SectionTitle line1="Lo que dicen" accent="nuestros clientes"/>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(auto-fill,minmax(290px,1fr))",gap:14,marginTop:44}}>
          {tesis.map(t=><TestiCard key={t.name} t={t}/>)}
        </div>
      </div>
    </div>
  );
}

function TestiCard({t}){
  const [h,setH]=useState(false);
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:`linear-gradient(150deg,${T.bgCard},${T.bgMid})`,border:`1px solid ${h?T.borderHi:T.border}`,borderRadius:8,padding:24,transform:h?"translateY(-4px)":"translateY(0)",transition:"transform .3s"}}>
      <div style={{display:"flex",gap:3,marginBottom:14}}>
        {[...Array(5)].map((_,j)=>(
          <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill={T.blue} stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        ))}
      </div>
      <p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:500,fontSize:15,color:T.body,lineHeight:1.68,fontStyle:"italic",margin:"0 0 20px"}}>"{t.text}"</p>
      <div style={{borderTop:`1px solid ${T.border}`,paddingTop:14}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:18,...chrome}}>{t.name}</div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:10,letterSpacing:2.5,color:T.sub,textTransform:"uppercase",marginTop:2}}>{t.project} · {t.district}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   FOOTER
═══════════════════════════════════ */
function Footer(){
  const mob=useIsMobile();
  return(
    <footer style={{borderTop:`1px solid ${T.border}`,padding:mob?"20px":"30px 52px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,background:`${T.bgBase}cc`,paddingLeft:mob?20:52,paddingRight:mob?20:52}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:2,height:20,background:`linear-gradient(180deg,${T.blueHi},${T.blueDim})`,borderRadius:2}}/>
        <div style={{display:"flex",flexDirection:"column",lineHeight:1}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,letterSpacing:4,...chrome}}>ESTRUCTURAS</span>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:9,letterSpacing:6,color:T.blue,marginTop:1}}>RAVICHAGUA</span>
          </div>
        </div>
      </div>
      <p style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:600,fontSize:9,letterSpacing:2,color:T.border,textTransform:"uppercase",margin:0}}>
        © {new Date().getFullYear()} Estructuras Ravichagua · Lima · Perú
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════
   APP
═══════════════════════════════════ */
const SECTIONS={
  Inicio:      <HeroSection/>,
  Servicios:   <ServicesSection/>,
  Materiales:  <MaterialsSection/>,
  Proceso:     <ProcessSection/>,
  Proyectos:   <GallerySection/>,
  Testimonios: <TestimonialsSection/>,
};

export default function App(){
  const [active,setActive]=useState("Inicio");
  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;cursor:none!important;}
        body{background:${T.bgBase};color:#c0d4e8;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${T.bgBase};}
        ::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px;}
        ::-webkit-scrollbar-thumb:hover{background:${T.borderHi};}
      `}</style>
      <WeldingCursor/>
      <div style={{background:T.bgBase,minHeight:"100vh"}}>
        <Nav active={active} setActive={setActive}/>
        <div style={{paddingTop:56}}>{SECTIONS[active]}</div>
        <Footer/>
      </div>
    </>
  );
}
