import { useState, useRef, useCallback } from "react";

const IMG = "https://snfjdjrhlynmadrspfbt.supabase.co/storage/v1/object/public/Estructuras%20ravichagua/mesacomedorinsutrial.png";

const projects = [
  { id: 1, title: "Mesa de comedor industrial", cat: "Mesas",       desc: "Acero + madera recuperada",        image: IMG },
  { id: 2, title: "Barra para restaurante",     cat: "Barras",      desc: "Acero inoxidable brushed",         image: IMG },
  { id: 3, title: "Entrepiso comercial",         cat: "Estructuras", desc: "Estructura 120m² con escalera",    image: null },
  { id: 4, title: "Portón corredizo",            cat: "Puertas",     desc: "Diseño minimalista con motor",     image: null },
  { id: 5, title: "Escalera tipo U",             cat: "Escaleras",   desc: "Metal + peldaños de roble",        image: null },
  { id: 6, title: "Reja ornamental",             cat: "Rejas",       desc: "Estilo moderno geométrico",        image: null },
];

const gradients = [
  "linear-gradient(135deg,#1e3a5f,#0d1b2a)",
  "linear-gradient(135deg,#1a2a1a,#0d1b0d)",
  "linear-gradient(135deg,#0a1a2e,#16213e)",
  "linear-gradient(135deg,#2d1b4e,#0f0a1e)",
  "linear-gradient(135deg,#1a1a2e,#16213e)",
  "linear-gradient(135deg,#1e1e2e,#2d2d44)",
];

// ── OPCIÓN A: Hover zoom en tarjeta ──────────────────────────────────────────
function CardA({ p, idx, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative", aspectRatio: "1/1", borderRadius: 16,
        overflow: "hidden", cursor: "pointer",
        background: gradients[idx % gradients.length],
        border: hovered ? "1px solid rgba(100,160,255,0.5)" : "1px solid rgba(100,160,255,0.15)",
        transition: "border-color 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {p.image && (
        <img src={p.image} alt={p.title} draggable={false} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }} />
      )}
      {/* overlay solo abajo para texto */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
      {/* tinte hover */}
      {p.image && <div style={{ position: "absolute", inset: 0, background: "rgba(50,100,220,0.12)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />}

      <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", borderRadius: 7, padding: "3px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6eb3ff", border: "1px solid rgba(100,160,255,0.25)" }}>
        {p.cat}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{p.title}</div>
        <div style={{ fontSize: 11, color: "#8ab4d8", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(4px)", transition: "all 0.3s" }}>{p.desc}</div>
      </div>

      <div style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: 7, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.6)", transition: "all 0.3s" }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    </div>
  );
}

// ── OPCIÓN B: Click → Lightbox con zoom ──────────────────────────────────────
function CardB({ p, idx, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative", aspectRatio: "1/1", borderRadius: 16,
        overflow: "hidden", cursor: "pointer",
        background: gradients[idx % gradients.length],
        border: "1px solid rgba(100,160,255,0.15)",
        transition: "transform 0.25s, border-color 0.3s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(100,160,255,0.5)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(100,160,255,0.15)"; }}
    >
      {p.image && (
        <img src={p.image} alt={p.title} draggable={false} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.4s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />

      <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", borderRadius: 7, padding: "3px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6eb3ff", border: "1px solid rgba(100,160,255,0.25)" }}>
        {p.cat}
      </div>

      {p.image && (
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(30,80,200,0.85)", borderRadius: 7, padding: "3px 8px", fontSize: 9, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
          🔍 Zoom
        </div>
      )}

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{p.title}</div>
        <div style={{ fontSize: 11, color: "#8ab4d8" }}>{p.desc}</div>
      </div>
    </div>
  );
}

// ── Lightbox con zoom (Opción B) ─────────────────────────────────────────────
function ZoomLightbox({ project, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const clamp = z => Math.min(Math.max(z, 1), 4);

  const handleWheel = useCallback(e => {
    e.preventDefault();
    setZoom(z => clamp(z - e.deltaY * 0.003));
  }, []);

  const onMouseDown = e => {
    if (zoom <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX - lastPos.current.x, y: e.clientY - lastPos.current.y };
  };
  const onMouseMove = e => {
    if (!dragging) return;
    const nx = e.clientX - dragStart.current.x;
    const ny = e.clientY - dragStart.current.y;
    lastPos.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  };
  const onMouseUp = () => setDragging(false);
  const onDblClick = () => {
    if (zoom > 1) { setZoom(1); setPos({ x: 0, y: 0 }); lastPos.current = { x: 0, y: 0 }; }
    else setZoom(2.5);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,10,20,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
      {/* Header */}
      <div onClick={e => e.stopPropagation()} style={{ display: "flex", alignItems: "center", width: "min(92vw,720px)", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6eb3ff", letterSpacing: "0.2em", textTransform: "uppercase" }}>{project.cat}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{project.title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => setZoom(z => clamp(z + 0.5))} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 17, cursor: "pointer" }}>+</button>
          <span style={{ fontSize: 12, color: "#8ab4d8", minWidth: 38, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => { setZoom(z => clamp(z - 0.5)); if (zoom <= 1.5) { setPos({ x: 0, y: 0 }); lastPos.current = { x: 0, y: 0 }; } }} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 17, cursor: "pointer" }}>−</button>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,60,60,0.2)", border: "1px solid rgba(255,60,60,0.35)", color: "#ff6b6b", fontSize: 15, cursor: "pointer" }}>✕</button>
        </div>
      </div>

      {/* Imagen */}
      <div onClick={e => e.stopPropagation()} onWheel={handleWheel} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onDoubleClick={onDblClick}
        style={{ width: "min(92vw,720px)", height: "min(55vw,500px)", overflow: "hidden", borderRadius: 14, border: "1px solid rgba(100,160,255,0.2)", cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}>
        <img src={project.image} alt={project.title} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`, transition: dragging ? "none" : "transform 0.25s ease", userSelect: "none", pointerEvents: "none" }} />
      </div>

      <div onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: "#3a5a7a" }}>
        {zoom === 1 ? "Scroll o doble clic para zoom · botones + −" : "Arrastra para moverte · doble clic para resetear"}
      </div>
    </div>
  );
}

// ── Lightbox modal simple (Opción A) ─────────────────────────────────────────
function SimpleLightbox({ project, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,10,20,0.92)", backdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "min(92vw,640px)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(100,160,255,0.2)" }}>
        {project.image
          ? <img src={project.image} alt={project.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg,#1e3a5f,#0d1b2a)" }} />
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 8, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 14, cursor: "pointer" }}>✕</button>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px 24px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6eb3ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>{project.cat}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{project.title}</div>
          <div style={{ fontSize: 13, color: "#8ab4d8", marginBottom: 16 }}>{project.desc}</div>
          <a href={`https://wa.me/51999999999?text=Hola, quiero algo similar a: ${project.title}`} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#3b82f6", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            💬 Quiero uno similar →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── DEMO PRINCIPAL ────────────────────────────────────────────────────────────
export default function GalleryDemo() {
  const [estilo, setEstilo] = useState("A");
  const [lightbox, setLightbox] = useState(null);
  const current = projects.find(p => p.id === lightbox);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#060d18 0%,#0a1628 100%)", padding: "28px 20px", fontFamily: "system-ui,sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Toggle */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6eb3ff", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 10 }}>Elige el estilo</div>
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 4, gap: 4, border: "1px solid rgba(255,255,255,0.1)" }}>
            <button onClick={() => setEstilo("A")} style={{ padding: "8px 24px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.25s", background: estilo === "A" ? "#3b82f6" : "transparent", color: estilo === "A" ? "#fff" : "#6b8aaa" }}>
              A — Hover zoom
            </button>
            <button onClick={() => setEstilo("B")} style={{ padding: "8px 24px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.25s", background: estilo === "B" ? "#3b82f6" : "transparent", color: estilo === "B" ? "#fff" : "#6b8aaa" }}>
              B — Click + Zoom real
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#3a5a7a", marginTop: 8 }}>
            {estilo === "A" ? "Pasa el mouse sobre la tarjeta · Click abre modal" : "Click en la tarjeta con foto para ver el zoom completo"}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {projects.map((p, i) =>
            estilo === "A"
              ? <CardA key={p.id} p={p} idx={i} onClick={() => setLightbox(p.id)} />
              : <CardB key={p.id} p={p} idx={i} onClick={() => p.image ? setLightbox(p.id) : null} />
          )}
        </div>

        <div style={{ marginTop: 20, background: "rgba(30,50,80,0.35)", border: "1px solid rgba(100,160,255,0.12)", borderRadius: 12, padding: "14px 18px", fontSize: 12, color: "#5a7a9a" }}>
          {estilo === "A"
            ? "✦ Opción A — El zoom ocurre dentro de la tarjeta al pasar el mouse. Click abre un modal con foto grande + botón WhatsApp."
            : "✦ Opción B — Click en la foto abre pantalla completa. Scroll = zoom, arrastra para moverte, doble clic = resetear, botones + / −."}
        </div>
      </div>

      {/* Lightboxes */}
      {current && estilo === "A" && <SimpleLightbox project={current} onClose={() => setLightbox(null)} />}
      {current && estilo === "B" && current.image && <ZoomLightbox project={current} onClose={() => setLightbox(null)} />}
    </div>
  );
}
