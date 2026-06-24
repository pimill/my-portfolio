import { useState } from "react";

// ─────────────── DATA ───────────────
const WORKS = [
  {
    id: 1, year: 2025, title: "蛇來運轉", subtitle: "2025 蛇年海報設計",
    category: "節慶海報設計",
    intro: "為蛇年新春創作的賀歲海報，以紅黑配色搭配同心圓紋與蛇形線條，呈現「時來運轉」的吉慶氛圍。",
    concept: "將生肖蛇的形體簡化為流動的白色線條，與層疊的同心圓圖案交織，呼應傳統紋樣中「圓滿」與「循環」的意象；四角的簽刻印章式圖形強化節慶感與東方識別。",
    specs: { size: "A4（210 × 297 mm）", dpi: "150 dpi", color: "RGB", format: "直式海報" },
    // 只保留海報上真正出現的三個主色
    palette: ["#000000", "#E61A17", "#FFFFFF"],
    bgColor: "#E61A17", fgColor: "#000000", accentColor: "#FFFFFF",
    cornerChars: ["蛇","來","運","轉"],
    clusters: [
      { cx: 138, cy: 182, r0: 118 },
      { cx: 305, cy: 152, r0: 92 },
      { cx: 88,  cy: 398, r0: 108 },
      { cx: 312, cy: 348, r0: 112 },
    ],
    snakePath: "M200,48 Q272,142 154,226 Q32,312 186,402 Q318,488 168,566",
    contact: ["IG @r_yobiii_618", "Behance", "fpizzayz2@gmail.com", "0925-367-291"],
  },
  {
    id: 2, year: 2024, title: "龍騰四海", subtitle: "2024 龍年海報設計",
    category: "節慶海報設計",
    intro: "龍年賀歲海報，以深藍金色搭配展現龍的磅礴氣勢，以「騰躍」為主題概念。",
    concept: "以傳統龍鱗紋幾何化，與大幅弧線構成動感旋渦，象徵龍騰之勢；四角飾以印章框，呼應東方識別語彙。",
    specs: { size: "A4（210 × 297 mm）", dpi: "150 dpi", color: "RGB", format: "直式海報" },
    palette: ["#1A2357", "#C8A84B", "#F0E8C8"],
    bgColor: "#1A2357", fgColor: "#C8A84B", accentColor: "#F0E8C8",
    cornerChars: ["龍","騰","四","海"],
    clusters: [
      { cx: 122, cy: 188, r0: 112 },
      { cx: 308, cy: 252, r0: 102 },
      { cx: 178, cy: 422, r0: 90 },
    ],
    snakePath: "M210,52 Q282,162 146,262 Q14,362 192,456 Q352,532 186,566",
    contact: [],
  },
  {
    id: 3, year: 2023, title: "兔躍新程", subtitle: "2023 兔年海報設計",
    category: "節慶海報設計",
    intro: "兔年賀歲海報，清新典雅，洋溢春日氣息，以「躍動」為主題。",
    concept: "兔形簡化為流動弧線，結合同心圓圖騰，輕盈活潑的線條感受呼應兔年特質。",
    specs: { size: "A4（210 × 297 mm）", dpi: "150 dpi", color: "RGB", format: "直式海報" },
    palette: ["#7B1E42", "#E8D5A3", "#2D6E3E"],
    bgColor: "#7B1E42", fgColor: "#2D6E3E", accentColor: "#E8D5A3",
    cornerChars: ["兔","躍","新","程"],
    clusters: [
      { cx: 132, cy: 196, r0: 106 },
      { cx: 298, cy: 318, r0: 96 },
      { cx: 168, cy: 436, r0: 84 },
    ],
    snakePath: "M190,56 Q256,166 142,266 Q26,362 196,452 Q352,526 186,576",
    contact: [],
  },
  {
    id: 4, year: 2022, title: "虎虎生風", subtitle: "2022 虎年海報設計",
    category: "節慶海報設計",
    intro: "虎年賀歲海報，橙金配色傳遞虎年活力，以「生威」為主題。",
    concept: "虎紋幾何化轉化為放射狀紋路，與動態弧線交疊，呈現虎虎生風的霸氣。",
    specs: { size: "A4（210 × 297 mm）", dpi: "150 dpi", color: "RGB", format: "直式海報" },
    palette: ["#1C1C1C", "#F0A500", "#FFF8E8"],
    bgColor: "#F0A500", fgColor: "#1C1C1C", accentColor: "#FFF8E8",
    cornerChars: ["虎","虎","生","風"],
    clusters: [
      { cx: 148, cy: 212, r0: 110 },
      { cx: 288, cy: 298, r0: 98 },
      { cx: 158, cy: 448, r0: 86 },
    ],
    snakePath: "M216,49 Q292,152 152,256 Q8,356 206,452 Q378,532 202,576",
    contact: [],
  },
  {
    id: 5, year: 2021, title: "牛轉乾坤", subtitle: "2021 牛年海報設計",
    category: "節慶海報設計",
    intro: "牛年賀歲海報，穩重大氣，以「踏實前行」為主題意象。",
    concept: "牛角形態幾何化，融入圖騰式構成，厚重線條傳遞牛年特有的沉穩力量。",
    specs: { size: "A4（210 × 297 mm）", dpi: "150 dpi", color: "RGB", format: "直式海報" },
    palette: ["#2C3E50", "#C0392B", "#F5CBA7"],
    bgColor: "#2C3E50", fgColor: "#C0392B", accentColor: "#F5CBA7",
    cornerChars: ["牛","轉","乾","坤"],
    clusters: [
      { cx: 116, cy: 180, r0: 102 },
      { cx: 310, cy: 270, r0: 92 },
      { cx: 182, cy: 422, r0: 82 },
    ],
    snakePath: "M202,56 Q266,156 146,256 Q32,356 202,446 Q362,526 202,572",
    contact: [],
  },
  {
    id: 6, year: 2020, title: "鼠報新春", subtitle: "2020 鼠年海報設計",
    category: "節慶海報設計",
    intro: "鼠年賀歲海報，靈動活潑，以「靈氣充盈」為設計概念。",
    concept: "以圓點韻律構成鼠形印象，配合流動曲線，傳遞鼠年的機敏與靈動氣質。",
    specs: { size: "A4（210 × 297 mm）", dpi: "150 dpi", color: "RGB", format: "直式海報" },
    palette: ["#2C2C2C", "#E74C3C", "#E8E8E8"],
    bgColor: "#E8E8E8", fgColor: "#2C2C2C", accentColor: "#E74C3C",
    cornerChars: ["鼠","報","新","春"],
    clusters: [
      { cx: 122, cy: 200, r0: 105 },
      { cx: 304, cy: 294, r0: 95 },
      { cx: 166, cy: 440, r0: 82 },
    ],
    snakePath: "M196,52 Q264,156 136,260 Q12,360 202,454 Q370,534 200,579",
    contact: [],
  },
];

// ─────────────── POSTER SVG ───────────────
function PosterSVG({ work, uid = "x" }) {
  const cid = `clip-${work.id}-${uid}`;
  const { bgColor, fgColor, accentColor, clusters, snakePath, cornerChars, title, year } = work;

  return (
    <svg
      viewBox="0 0 420 594"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", display: "block" }}
    >
      <defs>
        <clipPath id={cid}>
          <rect width="420" height="594" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="420" height="594" fill={bgColor} />

      {/* Concentric-circle clusters */}
      <g clipPath={`url(#${cid})`}>
        {clusters.flatMap((c, ci) =>
          [...Array(9)].map((_, i) => {
            const r = c.r0 - i * 12;
            return r > 0 ? (
              <circle
                key={`${ci}-${i}`}
                cx={c.cx} cy={c.cy} r={r}
                fill="none" stroke={fgColor} strokeWidth="9"
              />
            ) : null;
          })
        )}
      </g>

      {/* Animal / flowing line */}
      <path
        d={snakePath}
        fill="none" stroke={accentColor}
        strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Corner stamps */}
      {[[18, 18], [372, 18], [18, 548], [372, 548]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="30" height="28" rx="2"
            fill="none" stroke={fgColor} strokeWidth="1.5" />
          <circle cx={x + 15} cy={y + 14} r="9"
            fill="none" stroke={fgColor} strokeWidth="1" />
          <text x={x + 15} y={y + 19} textAnchor="middle"
            fill={accentColor} fontSize="13" fontFamily="serif">
            {cornerChars[i]}
          </text>
        </g>
      ))}

      {/* Typography */}
      <text x="210" y="33" textAnchor="middle" fill={accentColor}
        fontSize="15" fontFamily="Georgia,serif" letterSpacing="4">
        Auspicious
      </text>
      <text x="210" y="583" textAnchor="middle" fill={accentColor}
        fontSize="15" fontFamily="Georgia,serif" letterSpacing="4">
        Interwork
      </text>
      <text x="29" y="297" textAnchor="middle" fill={accentColor}
        fontSize="13" fontFamily="sans-serif" transform="rotate(-90,29,297)">
        {title}
      </text>
      <text x="391" y="297" textAnchor="middle" fill={accentColor}
        fontSize="12" fontFamily="sans-serif" transform="rotate(90,391,297)">
        {year}
      </text>
    </svg>
  );
}

// ─────────────── APP ───────────────
export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const [hov, setHov] = useState(null);

  const close = () => setSelected(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "#ddd",
      fontFamily: "system-ui,'Noto Sans TC',sans-serif",
    }}>

      {/* ── Header ── */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 36px", borderBottom: "1px solid #1e1e1e",
        position: "sticky", top: 0, background: "#111", zIndex: 10,
      }}>
        <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff", letterSpacing: "3px" }}>
          YOBI DESIGN
        </span>
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["關於", "專案", "聯絡"].map(t => (
            <span key={t} style={{ color: "#444", fontSize: "13px", cursor: "pointer" }}>{t}</span>
          ))}
          {/* 精選作品 → 歷年作品 */}
          <span style={{
            color: "#fff", fontSize: "13px", fontWeight: 700,
            borderBottom: "2px solid #E61A17", paddingBottom: "2px", cursor: "pointer",
          }}>
            歷年作品
          </span>
        </nav>
      </header>

      {/* ── Main grid ── */}
      <main style={{ padding: "36px 36px 64px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "baseline", marginBottom: "28px",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: 0 }}>
            歷年作品
          </h2>
          <span style={{ fontSize: "12px", color: "#444" }}>{WORKS.length} 件作品</span>
        </div>

        {/* Grid — thumbnail 不被裁切：SVG 有固定 viewBox，width:100% 自然維持比例 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))",
          gap: "18px",
        }}>
          {WORKS.map(w => (
            <div
              key={w.id}
              onClick={() => setSelected(w)}
              onMouseEnter={() => setHov(w.id)}
              onMouseLeave={() => setHov(null)}
              style={{
                cursor: "pointer",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#1a1a1a",
                transform: hov === w.id ? "translateY(-5px)" : "none",
                boxShadow: hov === w.id ? "0 14px 32px rgba(0,0,0,0.6)" : "none",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              {/* 預覽圖不裁切，SVG 自動維持 210:297 比例 */}
              <PosterSVG work={w} uid={`g${w.id}`} />
              <div style={{ padding: "10px 14px 13px" }}>
                <div style={{ fontSize: "11px", color: "#E61A17", fontWeight: 700, marginBottom: "3px" }}>
                  {w.year}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{w.title}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Modal 彈出 ── */}
      {selected && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0,
            /* 鎖定純黑，不受後方紅色海報影響 */
            background: "rgba(0,0,0,0.84)",
            backdropFilter: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "20px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "14px",
              maxWidth: "780px",
              width: "100%",
              maxHeight: "88vh",
              overflow: "hidden",
              display: "flex",
              position: "relative",
            }}
          >
            {/* ← 左側：海報縮圖（小、無邊框） */}
            <div style={{
              width: "196px",
              flexShrink: 0,
              background: "#181818",
              padding: "22px 18px",
              display: "flex",
              alignItems: "flex-start",
              borderRadius: "14px 0 0 14px",
            }}>
              {/* 圖片不加任何 border，直接呈現 SVG */}
              <PosterSVG work={selected} uid="modal" />
            </div>

            {/* → 右側：資訊 */}
            <div style={{
              flex: 1,
              padding: "28px 32px 32px 24px",
              overflowY: "auto",
              color: "#111",
            }}>
              {/* Close button */}
              <button
                onClick={close}
                style={{
                  position: "absolute", top: 13, right: 13,
                  width: 30, height: 30, borderRadius: "50%",
                  border: "none", background: "#EBEBEB",
                  cursor: "pointer", fontSize: 17, color: "#555",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 0, lineHeight: 1,
                }}
              >×</button>

              {/* Category tag */}
              <div style={{
                fontSize: "11px", color: "#E61A17", fontWeight: 700,
                marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px",
              }}>
                <span style={{ fontSize: "7px", verticalAlign: "middle" }}>●</span>
                {selected.category}
              </div>

              {/* Title — 拆成兩行避免過長換行 */}
              <div style={{ margin: "0 0 18px 0" }}>
                <div style={{ fontSize: "12px", color: "#999", fontWeight: 500, marginBottom: "5px", letterSpacing: "0.3px" }}>
                  {selected.subtitle}
                </div>
                <div style={{ fontSize: "26px", fontWeight: 900, color: "#111", lineHeight: 1.15, whiteSpace: "nowrap" }}>
                  {selected.title}
                </div>
              </div>

              {/* 專案簡介 */}
              <div style={{ fontSize: "13px", color: "#E61A17", fontWeight: 700, marginBottom: "5px" }}>
                專案簡介
              </div>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: 1.8, margin: "0 0 4px" }}>
                {selected.intro}
              </p>

              {/* 設計概念 */}
              <div style={{
                fontSize: "11px", color: "#AAA", fontWeight: 600,
                letterSpacing: "0.5px", marginTop: "14px", marginBottom: "5px",
              }}>
                設計概念
              </div>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.75, margin: "0 0 18px" }}>
                {selected.concept}
              </p>

              {/* 設計規格 + 色彩計畫 */}
              <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>

                <div>
                  <div style={{ fontSize: "13px", color: "#E61A17", fontWeight: 700, marginBottom: "8px" }}>
                    設計規格
                  </div>
                  {[
                    ["尺寸", selected.specs.size],
                    ["解析度", selected.specs.dpi],
                    ["色彩模式", selected.specs.color],
                    ["格式", selected.specs.format],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: "10px", marginBottom: "3px" }}>
                      <span style={{ fontSize: "11px", color: "#AAA", minWidth: "48px" }}>{k}</span>
                      <span style={{ fontSize: "12px", color: "#333" }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: "13px", color: "#E61A17", fontWeight: 700, marginBottom: "8px" }}>
                    色彩計畫
                  </div>
                  {/* 只顯示海報上出現的主要色彩 */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    {selected.palette.map(c => (
                      <div key={c} style={{
                        display: "flex", flexDirection: "column",
                        alignItems: "center", gap: "5px",
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: c,
                          boxShadow: c.toUpperCase() === "#FFFFFF"
                            ? "inset 0 0 0 1px #D0D0D0" : "none",
                        }} />
                        <span style={{ fontSize: "9px", color: "#888", letterSpacing: "0.3px" }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 聯絡 — 有資料就顯示 */}
              {selected.contact && selected.contact.length > 0 && (
                <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1px solid #F0F0F0" }}>
                  <div style={{
                    fontSize: "13px", color: "#E61A17", fontWeight: 700,
                    marginBottom: "10px",
                  }}>聯絡</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {selected.contact.map((v, i) => (
                      <span key={i} style={{
                        padding: "5px 13px",
                        background: "#F5F5F5",
                        borderRadius: "20px",
                        fontSize: "12px",
                        color: "#333",
                        border: "1px solid #E8E8E8",
                      }}>{v}</span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
