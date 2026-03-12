import { useState, useRef, useCallback } from "react";

const FOTO = "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/mesacomedorinsutrial.png";

const proyectos = [
  { id: 1, title: "Mesa de comedor industrial", cat: "Mesas",       desc: "Acero + madera recuperada", foto: FOTO },
  { id: 2, title: "Barra para restaurante",     cat: "Barras",      desc: "Acero inoxidable brushed",  foto: FOTO },
  { id: 3, title: "Entrepiso comercial",         cat: "Estructuras", desc: "120m² con escalera",        foto: null },
  { id: 4, title: "Portón corredizo",            cat: "Puertas",     desc: "Diseño minimalista",        foto: null },
  { id: 5, title: "Escalera tipo U",             cat: "Escaleras",   desc: "Metal + roble",             foto: null },
  { id: 6, title: "Reja ornamental",             cat: "Rejas",       desc: "Estilo geométrico",         foto: null },
];

// Lightbox con zoom
function Lightbox({ p, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const start = useRef(null);
  const last = useRef({ x: 0, y: 0 });

  const wheel = useCallback(e => {
    e.preventDefault();
    setZoom(z => Math.min(Math.max(z - e.deltaY * 0.003, 1), 4));
  }, []);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,0.93)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, padding:16 }}>
      {/* barra */}
      <div onClick={e=>e.stopPropagation()} style={{ display:"flex", alignItems:"center", width:"min(90vw,700px)", gap:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, color:"#60a5fa", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em" }}>{p.cat}</div>
          <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{p.title}</div>
        </div>
        <button onClick={()=>setZoom(z=>Math.min(z+0.5,4))} style={{ width:32,height:32,borderRadius:8,background:"#1e293b",border:"1px solid #334155",color:"#fff",fontSize:16,cursor:"pointer" }}>+</button>
        <span style={{ color:"#94a3b8",fontSize:12,minWidth:36,textAlign:"center" }}>{Math.round(zoom*100)}%</span>
        <button onClick={()=>{const n=Math.max(zoom-0.5,1);setZoom(n);if(n===1){setPos({x:0,y:0});last.current={x:0,y:0};}}} style={{ width:32,height:32,borderRadius:8,background:"#1e293b",border:"1px solid #334155",color:"#fff",fontSize:16,cursor:"pointer" }}>−</button>
        <button onClick={onClose} style={{ width:32,height:32,borderRadius:8,background:"#450a0a",border:"1px solid #7f1d1d",color:"#fca5a5",fontSize:14,cursor:"pointer" }}>✕</button>
      </div>
      {/* imagen */}
      <div
        onClick={e=>e.stopPropagation()}
        onWheel={wheel}
        onMouseDown={e=>{if(zoom>1){setDrag(true);start.current={x:e.clientX-last.current.x,y:e.clientY-last.current.y};}}}
        onMouseMove={e=>{if(!drag)return;const nx=e.clientX-start.current.x,ny=e.clientY-start.current.y;last.current={x:nx,y:ny};setPos({x:nx,y:ny});}}
        onMouseUp={()=>setDrag(false)}
        onMouseLeave={()=>setDrag(false)}
        onDoubleClick={()=>{if(zoom>1){setZoom(1);setPos({x:0,y:0});last.current={x:0,y:0};}else setZoom(2.5);}}
        style={{ width:"min(90vw,700px)", height:"min(55vw,480px)", overflow:"hidden", borderRadius:12, cursor:zoom>1?(drag?"grabbing":"grab"):"zoom-in" }}
      >
        <img src={p.foto} alt={p.title} draggable={false} style={{ width:"100%", height:"100%", objectFit:"cover", transform:`scale(${zoom}) translate(${pos.x/zoom}px,${pos.y/zoom}px)`, transition:drag?"none":"transform 0.2s", pointerEvents:"none", userSelect:"none" }} />
      </div>
      <div onClick={e=>e.stopPropagation()} style={{ fontSize:11, color:"#475569" }}>
        {zoom===1?"Scroll o doble clic para zoom":"Arrastra · doble clic para resetear"}
      </div>
    </div>
  );
}

export default function Galeria() {
  const [modo, setModo] = useState("A");
  const [abierto, setAbierto] = useState(null);
  const actual = proyectos.find(p=>p.id===abierto);

  return (
    <div style={{ minHeight:"100vh", background:"#0f172a", padding:"28px 16px", fontFamily:"system-ui,sans-serif", color:"#fff" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>

        {/* Toggle */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <p style={{ fontSize:11, color:"#60a5fa", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:10 }}>Elige estilo</p>
          <div style={{ display:"inline-flex", background:"#1e293b", borderRadius:10, padding:3, gap:3 }}>
            {["A","B"].map(op=>(
              <button key={op} onClick={()=>setModo(op)} style={{ padding:"8px 22px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:modo===op?"#3b82f6":"transparent", color:modo===op?"#fff":"#64748b", transition:"all 0.2s" }}>
                {op==="A" ? "A — Hover zoom" : "B — Click zoom"}
              </button>
            ))}
          </div>
          <p style={{ fontSize:11, color:"#475569", marginTop:8 }}>
            {modo==="A" ? "Pasa el mouse encima de la tarjeta" : "Haz click en la tarjeta con foto"}
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {proyectos.map((p,i) => {
            const colores = ["#0f2a4a","#0a2010","#1a0a30","#0a1a2e","#1a1a0a","#0a2020"];
            return (
              <TarjetaConFoto
                key={p.id}
                p={p}
                modo={modo}
                fondo={colores[i]}
                onClick={()=>{ if(p.foto) setAbierto(p.id); }}
              />
            );
          })}
        </div>

        <div style={{ marginTop:16, background:"#1e293b", borderRadius:10, padding:"12px 16px", fontSize:12, color:"#64748b" }}>
          {modo==="A" ? "✦ Opción A — hover hace zoom suave. Click abre la foto en modal." : "✦ Opción B — click abre foto a pantalla completa con zoom interactivo (scroll, arrastrar, doble clic)."}
        </div>
      </div>

      {/* Lightbox */}
      {actual?.foto && <Lightbox p={actual} onClose={()=>setAbierto(null)} />}
    </div>
  );
}

function TarjetaConFoto({ p, modo, fondo, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        position:"relative", aspectRatio:"1/1", borderRadius:14,
        overflow:"hidden", cursor: p.foto ? "pointer" : "default",
        background: fondo,
        border: hover ? "1px solid #3b82f6" : "1px solid #1e293b",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition:"all 0.25s",
      }}
    >
      {/* FOTO — sin overlay encima */}
      {p.foto && (
        <img
          src={p.foto}
          alt={p.title}
          draggable={false}
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover",
            transform: modo==="A" && hover ? "scale(1.1)" : "scale(1)",
            transition:"transform 0.5s ease",
          }}
        />
      )}

      {/* Badge categoría — esquina superior izquierda */}
      <div style={{
        position:"absolute", top:8, left:8,
        background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)",
        borderRadius:6, padding:"2px 7px",
        fontSize:9, fontWeight:700, color:"#60a5fa",
        letterSpacing:"0.12em", textTransform:"uppercase",
        zIndex:2,
      }}>{p.cat}</div>

      {/* Hint zoom (solo modo B con foto) */}
      {modo==="B" && p.foto && hover && (
        <div style={{ position:"absolute", top:8, right:8, background:"rgba(59,130,246,0.9)", borderRadius:6, padding:"2px 7px", fontSize:9, fontWeight:700, color:"#fff", zIndex:2 }}>
          🔍 zoom
        </div>
      )}

      {/* Texto abajo — con su propio fondo, NO overlay sobre la foto */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
        padding:"20px 12px 12px",
        zIndex:2,
      }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{p.title}</div>
        <div style={{
          fontSize:10, color:"#93c5fd",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(3px)",
          transition:"all 0.25s",
        }}>{p.desc}</div>
      </div>
    </div>
  );
}
