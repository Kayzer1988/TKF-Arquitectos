
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function a(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(a);})();

function bindCursor(scope){
  (scope||document).querySelectorAll('a,button,.pg-item,.plist-item,.eq-card,.py-img-wrap').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.classList.add('hov');curR.classList.add('hov');});
    el.addEventListener('mouseleave',()=>{cur.classList.remove('hov');curR.classList.remove('hov');});
  });
}
bindCursor();

window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>50));

window.addEventListener('popstate',e=>{
  const s=e.state;
  if(!s){go('home',false);return;}
  if(s.page==='proyecto'){
    openProyecto(s.id,false);
  } else if(s.page==='proyectos'){
    go('proyectos',false);
    const cat=s.cat||'todos';
    lastCat=cat;
    renderP(cat);
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    const btn=document.querySelector(`.fbtn[onclick*="${cat}"]`);
    if(btn)btn.classList.add('active');
  } else {
    go(s.page,false);
  }
});

window.addEventListener('DOMContentLoaded',()=>{
  const hash=location.hash.replace('#','');
  if(hash.startsWith('proyecto/')){
    const id=hash.replace('proyecto/','');
    openProyecto(id,false);
  } else if(hash&&document.getElementById('page-'+hash)){
    go(hash,false);
  } else {
    history.replaceState({page:'home'},'','#home');
  }
});

function go(id, pushState=true){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  scrollTo(0,0);
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const el=document.getElementById('n-'+id);
  if(el)el.classList.add('active');
  if(id==='proyectos' && pushState){
    lastCat='todos';
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    const todosBtn=document.querySelector('.fbtn[onclick*="todos"]');
    if(todosBtn)todosBtn.classList.add('active');
    renderP('todos');
  }
  if(pushState) history.pushState(id==='proyectos'?{page:id,cat:'todos'}:{page:id},'','#'+id);
  initReveal();
}

// ── PROYECTOS REALES ──
const projects=[
  {
    id:'brevant',num:'001',name:'Brevant',
    rubro:'Agroquímicos',programa:'Pabellón Expo agro',
    year:'2019',m2:225,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'otros',
    cover:'images/otros/brevant/1.png',
    gallery:['images/otros/brevant/1.png','images/otros/brevant/2.jpg','images/otros/brevant/3.jpg','images/otros/brevant/4.jpg','images/otros/brevant/5.jpg','images/otros/brevant/6.jpg','images/otros/brevant/7.jpg','images/otros/brevant/8.jpg']
  },
  {
    id:'corteva',num:'002',name:'Corteva',
    rubro:'Agroquímicos',programa:'Pabellón Expo agro',
    year:'2020',m2:150,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'otros',
    cover:'images/otros/corteva/1.jpg',
    gallery:['images/otros/corteva/1.jpg','images/otros/corteva/2.jpg','images/otros/corteva/3.jpg','images/otros/corteva/4.jpg','images/otros/corteva/5.jpg','images/otros/corteva/6.jpg','images/otros/corteva/7.jpg']
  },
  {
    id:'momentum',num:'003',name:'Momentum Capital Investment',
    rubro:'Sociedad de bolsa',programa:'Oficinas corporativas',
    year:'2024',m2:350,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:'Arq. Clara Gimenez Zapiola',
    cat:'comercial',
    cover:'images/comercial/momentum-capital-investment/01.jpg',
    gallery:['images/comercial/momentum-capital-investment/01.jpg','images/comercial/momentum-capital-investment/02.jpg','images/comercial/momentum-capital-investment/03.jpg','images/comercial/momentum-capital-investment/04.jpg','images/comercial/momentum-capital-investment/05.jpg','images/comercial/momentum-capital-investment/06.jpg','images/comercial/momentum-capital-investment/07.jpg','images/comercial/momentum-capital-investment/08.jpg','images/comercial/momentum-capital-investment/09.jpg','images/comercial/momentum-capital-investment/10.jpg','images/comercial/momentum-capital-investment/11.jpg']
  },
  {
    id:'xonica',num:'004',name:'Xónica Argentina',
    rubro:'Medios y comunicación',programa:'Oficinas corporativas',
    year:'2024',m2:350,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:'Arq. Clara Gimenez Zapiola',
    cat:'comercial',
    cover:'images/comercial/xonica-argentina/cover.jpg',
    gallery:['images/comercial/xonica-argentina/01.jpg','images/comercial/xonica-argentina/02.jpg','images/comercial/xonica-argentina/03.jpg','images/comercial/xonica-argentina/04.jpg','images/comercial/xonica-argentina/05.jpg','images/comercial/xonica-argentina/06.jpg','images/comercial/xonica-argentina/07.jpg','images/comercial/xonica-argentina/08.jpg','images/comercial/xonica-argentina/09.jpg','images/comercial/xonica-argentina/10.jpg']
  },
  {
    id:'aiwa',num:'006',name:'Aiwa, Tivoli y San Up',
    rubro:'Tecnología, retail, Salud y medical devices',programa:'Oficinas corporativas',
    year:'2025',m2:400,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'comercial',
    cover:'images/comercial/aiwa-tivoli-y-san-up/1.png',
    gallery:['images/comercial/aiwa-tivoli-y-san-up/1.png','images/comercial/aiwa-tivoli-y-san-up/2.png','images/comercial/aiwa-tivoli-y-san-up/4.png','images/comercial/aiwa-tivoli-y-san-up/5.png','images/comercial/aiwa-tivoli-y-san-up/6.png','images/comercial/aiwa-tivoli-y-san-up/7.png','images/comercial/aiwa-tivoli-y-san-up/8.png','images/comercial/aiwa-tivoli-y-san-up/9.jpg','images/comercial/aiwa-tivoli-y-san-up/10.jpg','images/comercial/aiwa-tivoli-y-san-up/11.jpg','images/comercial/aiwa-tivoli-y-san-up/12.jpg','images/comercial/aiwa-tivoli-y-san-up/13.jpg']
  },
  {
    id:'sigma-wellness',num:'007',name:'Sigma Agro',
    rubro:'Agroquímicos',programa:'Wellness & Recreation + Parking privado',
    year:'2025',m2:800,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'comercial',
    cover:'images/comercial/sigma-agro/1.jpeg',
    gallery:['images/comercial/sigma-agro/1.jpeg','images/comercial/sigma-agro/2.jpeg','images/comercial/sigma-agro/3.jpeg','images/comercial/sigma-agro/4.jpeg','images/comercial/sigma-agro/5.jpeg']
  },
  {
    id:'tau',num:'008',name:'TAU Operaciones Logísticas',
    rubro:'Logística integral y supply chain',programa:'Oficinas corporativas',
    year:'2025',m2:210,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'otros',
    cover:'images/otros/tau-operaciones-logisticas/1.jpg',
    gallery:['images/otros/tau-operaciones-logisticas/1.jpg','images/otros/tau-operaciones-logisticas/2.jpeg','images/otros/tau-operaciones-logisticas/3.jpeg','images/otros/tau-operaciones-logisticas/4.jpeg','images/otros/tau-operaciones-logisticas/5.jpeg']
  },
  {
    id:'milkaut',num:'009',name:'Milkaut',
    rubro:'Agroindustria e industria láctea',programa:'Pabellón expo alimentaria',
    year:'2025',m2:90,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'otros',
    cover:'images/otros/milkaut/1.jpeg',
    gallery:['images/otros/milkaut/1.jpeg','images/otros/milkaut/2.jpeg','images/otros/milkaut/3.jpg']
  },
  {
    id:'corteva-stand-rural',num:'024',name:'Corteva Stand Rural',
    rubro:'Exposición',programa:'Instalación La Rural',
    year:'2026',m2:75,estado:'Proyecto',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'otros',
    cover:'images/otros/corteva-stand-rural/1.PNG',gallery:['images/otros/corteva-stand-rural/1.PNG','images/otros/corteva-stand-rural/2.JPG','images/otros/corteva-stand-rural/3.JPG']
  },
  {
    id:'sigma-tecnica',num:'010',name:'Sigma Agro — Área Técnica y Marketing',
    rubro:'Agroquímicos',programa:'Oficinas corporativas área Desarrollo Técnica + Marketing',
    year:'2026',m2:300,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'comercial',
    cover:'images/comercial/sigma-agro-area-tecnica-y-area-marketing/1.jpeg',
    gallery:['images/comercial/sigma-agro-area-tecnica-y-area-marketing/1.jpeg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/2.jpeg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/3.jpeg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/4.jpeg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/5.jpeg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/6.jpg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/7.jpg','images/comercial/sigma-agro-area-tecnica-y-area-marketing/8.png']
  },
  {
    id:'sigma-gerenciales',num:'011',name:'Sigma Agro — Gerenciales',
    rubro:'Agroquímicos',programa:'Oficinas Directores, gerenciales y sectores administrativos + supply chain + Comex + RRHH + Tesorería + Finanzas',
    year:'2026',m2:580,estado:'Construido',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'comercial',
    cover:'images/comercial/sigma-agro-gerenciales/1.jpeg',
    gallery:['images/comercial/sigma-agro-gerenciales/1.jpeg','images/comercial/sigma-agro-gerenciales/2.jpeg']
  },
  {
    id:'consultorios-del-carmen',num:'023',name:'Consultorios Del Carmen',
    rubro:'Salud',programa:'Consultorios médicos',
    year:'2026',m2:136,estado:'Proyecto',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'comercial',
    cover:'images/comercial/consultorios-del-carmen/1.jpeg',
    gallery:['images/comercial/consultorios-del-carmen/1.jpeg','images/comercial/consultorios-del-carmen/2.jpeg','images/comercial/consultorios-del-carmen/3.jpeg','images/comercial/consultorios-del-carmen/4.jpeg']
  },
  // ── VIVIENDAS ──
  {
    id:'casa-de-los-abuelos-ayres-del-pilar',num:'012',name:'Casa De Los Abuelos',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'La Cañada, Ayres del Pilar',
    year:'2017',m2:240,m2semi:40,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-de-los-abuelos-ayres-del-pilar/1.jpg',
    gallery:['images/viviendas/casa-de-los-abuelos-ayres-del-pilar/1.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/2.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/3.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/4.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/5.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/6.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/7.jpg','images/viviendas/casa-de-los-abuelos-ayres-del-pilar/8.jpg']
  },
  {
    id:'casa-jm',num:'013',name:'Casa J.M',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'C11, Ayres Plaza',
    year:'2021',m2:246,m2semi:72,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-jm/1.jpg',
    gallery:['images/viviendas/casa-jm/1.jpg','images/viviendas/casa-jm/2.jpg','images/viviendas/casa-jm/3.jpg','images/viviendas/casa-jm/4.jpg','images/viviendas/casa-jm/5.jpg','images/viviendas/casa-jm/6.jpg','images/viviendas/casa-jm/7.jpg']
  },
  {
    id:'casa-cm',num:'014',name:'Casa C.M',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Ayres Plaza',
    year:'2022',m2:246,m2semi:72,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-cm/1.jpg',
    gallery:['images/viviendas/casa-cm/1.jpg','images/viviendas/casa-cm/2.jpg','images/viviendas/casa-cm/3.jpg','images/viviendas/casa-cm/4.jpg','images/viviendas/casa-cm/5.jpg','images/viviendas/casa-cm/6.jpg']
  },
  {
    id:'casa-vm',num:'015',name:'Casa V.M',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'C10, Ayres Plaza',
    year:'2025',m2:268,m2semi:56,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-vm/1.jpg',
    gallery:['images/viviendas/casa-vm/1.jpg','images/viviendas/casa-vm/2.jpg','images/viviendas/casa-vm/3.jpg','images/viviendas/casa-vm/4.png','images/viviendas/casa-vm/5.jpg','images/viviendas/casa-vm/6.png','images/viviendas/casa-vm/7.png']
  },
  {
    id:'casa-canada-ayres-del-pilar',num:'016',name:'Casa Cañada',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'La Cañada, Ayres del Pilar',
    year:'2025',m2:275,m2semi:28,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:'Galpón 8',
    cat:'residencial',
    cover:'images/viviendas/casa-canada-ayres-del-pilar/1.jpg',
    gallery:['images/viviendas/casa-canada-ayres-del-pilar/1.jpg','images/viviendas/casa-canada-ayres-del-pilar/2.jpg','images/viviendas/casa-canada-ayres-del-pilar/3.jpg','images/viviendas/casa-canada-ayres-del-pilar/4.jpg','images/viviendas/casa-canada-ayres-del-pilar/5.jpg']
  },
  {
    id:'casa-costa',num:'017',name:'Casa Costa',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Costa Esmeralda',
    year:'2022',m2:209,m2semi:55,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-costa/1.jpg',
    gallery:['images/viviendas/casa-costa/1.jpg','images/viviendas/casa-costa/2.jpg','images/viviendas/casa-costa/3.jpg','images/viviendas/casa-costa/4.jpg','images/viviendas/casa-costa/5.jpg','images/viviendas/casa-costa/6.jpg']
  },
  {
    id:'casa-highland',num:'018',name:'Casa Highland',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Albino, Highland Park',
    year:'2026',m2:181,m2semi:63,estado:'Construida',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-highland/1.jpg',gallery:['images/viviendas/casa-highland/1.jpg']
  },
  {
    id:'casa-grillo',num:'019',name:'Casa Grillo',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Cardenal del monte, General Rodriguez',
    year:'2026',m2:165,m2semi:42,estado:'En ejecución',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-grillo/1.jpg',
    gallery:['images/viviendas/casa-grillo/1.jpg','images/viviendas/casa-grillo/2.png']
  },
  {
    id:'casa-a-v',num:'020',name:'Casa A.V',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Cardos de Pilar',
    year:'2026',m2:219,m2semi:34,estado:'En ejecución',
    autores:'TKF ARQUITECTOS',colaboradores:'Arq. Clara Gimenez Zapiola',
    cat:'residencial',
    cover:'images/viviendas/casa-a-v/1.jpg',
    gallery:['images/viviendas/casa-a-v/1.jpg','images/viviendas/casa-a-v/1.png','images/viviendas/casa-a-v/2.jpeg']
  },
  {
    id:'casa-l-o',num:'021',name:'Casa L.O',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Cardos de Pilar',
    year:'2026',m2:205,m2semi:79,estado:'En ejecución',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-l-o/1.jpg',
    gallery:['images/viviendas/casa-l-o/1.jpg','images/viviendas/casa-l-o/1.png','images/viviendas/casa-l-o/2.png']
  },
  {
    id:'casa-robles',num:'022',name:'Casa Robles',
    rubro:'Residencial unifamiliar',programa:'Residencial',ubicacion:'Parada Robles',
    year:'2026',m2:104,m2semi:23,estado:'En ejecución',
    autores:'TKF ARQUITECTOS',colaboradores:null,
    cat:'residencial',
    cover:'images/viviendas/casa-robles/1.jpg',
    gallery:['images/viviendas/casa-robles/1.jpg','images/viviendas/casa-robles/2.jpg','images/viviendas/casa-robles/3.jpg']
  }
];

// ── CAROUSEL (imágenes de carpeta carrousel) ──
(function initCarousel(){
  const section=document.getElementById('heroSection');
  const overlay=section.querySelector('.hero-overlay');

  const carImages=[
    'images/carrousel/1.jpg',
    'images/carrousel/2.jpg',
    'images/carrousel/3.jpg',
    'images/carrousel/4.jpg',
    'images/carrousel/5.png',
    'images/carrousel/6.jpg',
    'images/carrousel/7.jpg',
    'images/carrousel/8.jpg'
  ];

  carImages.forEach((img,i)=>{
    const d=document.createElement('div');
    d.className='slide'+(i===0?' active':'');
    d.style.backgroundImage="url('"+img+"')";
    section.insertBefore(d,overlay);
  });
})();

const slides=document.querySelectorAll('.slide');
const dotsEl=document.getElementById('carDots');
let carIdx=0,carTimer;
slides.forEach((_,i)=>{
  const d=document.createElement('button');
  d.className='dot'+(i===0?' active':'');
  d.onclick=()=>{clearInterval(carTimer);carGo(i);carTimer=setInterval(()=>carGo((carIdx+1)%slides.length),5000);};
  dotsEl.appendChild(d);
});
function carGo(idx){
  slides[carIdx].classList.remove('active');document.querySelectorAll('.dot')[carIdx].classList.remove('active');
  carIdx=idx;slides[carIdx].classList.add('active');document.querySelectorAll('.dot')[carIdx].classList.add('active');
}
function carMove(dir){clearInterval(carTimer);carGo((carIdx+dir+slides.length)%slides.length);carTimer=setInterval(()=>carGo((carIdx+1)%slides.length),5000);}
carTimer=setInterval(()=>carGo((carIdx+1)%slides.length),5000);
let touchX=0;
document.getElementById('heroSection').addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});
document.getElementById('heroSection').addEventListener('touchend',e=>{const diff=touchX-e.changedTouches[0].clientX;if(Math.abs(diff)>50)carMove(diff>0?1:-1);});

// ── HOME PROJ GRID ──
function renderHomeGrid(){
  const grid=document.querySelector('.proj-grid');
  if(!grid)return;
  const featuredIds=['momentum','xonica','aiwa','casa-de-los-abuelos-ayres-del-pilar','casa-vm'];
  const top=featuredIds.map(id=>projects.find(p=>p.id===id)).filter(Boolean);
  grid.innerHTML=top.map((p,i)=>`
    <div class="pg-item${i===0?' tall':''}" onclick="openProyecto('${p.id}')">
      <div class="pg-photo" style="background-image:url('${p.cover}')">
        <img class="bg-fallback-img" src="${p.cover}" alt="${p.name}" decoding="async">
        <div class="pg-ov"><div>
          <div class="pg-num">${p.num}</div>
          <div class="pg-name">${p.name}</div>
          <div class="pg-tag">${p.rubro} · ${p.year}</div>
        </div></div>
      </div>
    </div>`).join('');
  bindCursor(grid);
}
window.addEventListener('DOMContentLoaded',renderHomeGrid);

// ── LISTA DE PROYECTOS ──
function renderP(cat){
  const catOrder={comercial:0,residencial:1,otros:2};
  const f=(cat==='todos'?projects:projects.filter(p=>p.cat===cat)).slice().sort((a,b)=>{
    if(cat==='todos'){
      const co=catOrder[a.cat]-catOrder[b.cat];
      if(co!==0)return co;
    }
    return parseInt(a.num)-parseInt(b.num);
  });
  document.getElementById('plist-dark').innerHTML=f.map((p,i)=>`
    <div class="plist-item" onclick="openProyecto('${p.id}')">
      <div class="pl-num">${String(i+1).padStart(3,'0')}</div>
      <div class="pl-thumb" style="background-image:url('${p.cover}')">
        <img class="bg-fallback-img" src="${p.cover}" alt="${p.name}" decoding="async">
      </div>
      <div class="pl-info">
        <div class="pl-name">${p.name}</div>
        <div class="pl-cat">${p.programa}</div>
        <div class="pl-meta">
          <span class="pl-rubro">${p.rubro}</span>
          ${p.m2?`<span class="pl-m2">${p.m2} m²</span>`:''}
          <span class="pl-estado ${p.estado==='Construido'||p.estado==='Construida'?'estado-construido':'estado-proyecto'}">${p.estado}</span>
        </div>
      </div>
      <div class="pl-autores">${p.autores}${p.colaboradores?'<span class="pl-colab"><span class="pl-colab-label">Colaboradora</span>'+p.colaboradores+'</span>':''}</div>
    </div>`).join('');
  bindCursor(document.getElementById('plist-dark'));
}
let lastCat='todos';
function fp(btn,cat){
  document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  lastCat=cat;
  renderP(cat);
  history.replaceState({page:'proyectos',cat},'','#proyectos');
}
function goBack(){
  const cat=lastCat;
  go('proyectos');
  if(cat!=='todos'){
    renderP(cat);
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    const btn=document.querySelector(`.fbtn[onclick*="${cat}"]`);
    if(btn)btn.classList.add('active');
  }
}

// ── DETALLE DE PROYECTO ──
let lbImages=[],lbIdx=0;

function openProyecto(id, pushState=true){
  const p=projects.find(x=>x.id===id);
  if(!p)return;
  if(pushState) history.pushState({page:'proyecto',id},'','#proyecto/'+id);
  const page=document.getElementById('page-proyecto');
  page.innerHTML=`
    <div class="py-wrap">
      <button class="py-back" onclick="goBack()">&#8592; Volver a proyectos</button>
      <div class="py-header reveal">
        <h1 class="py-title">${p.name}</h1>
        <div class="py-ficha">
          <div class="py-campo"><span class="py-label">Rubro</span><span class="py-val">${p.rubro}</span></div>
          ${p.ubicacion?`<div class="py-campo"><span class="py-label">Ubicación</span><span class="py-val">${p.ubicacion}</span></div>`:`<div class="py-campo"><span class="py-label">Programa</span><span class="py-val">${p.programa}</span></div>`}
          ${p.m2?`<div class="py-campo"><span class="py-label">${p.m2semi?'Sup. cubierta':'Superficie'}</span><span class="py-val">${p.m2} m²</span></div>`:''}
          ${p.m2semi?`<div class="py-campo"><span class="py-label">Sup. semicubierta</span><span class="py-val">${p.m2semi} m²</span></div>`:''}
          <div class="py-campo"><span class="py-label">Estado</span><span class="py-val"><span class="py-estado ${p.estado==='Construido'||p.estado==='Construida'?'estado-construido':'estado-proyecto'}">${p.estado}</span></span></div>
          <div class="py-campo">
            <span class="py-label">Autores</span>
            <span class="py-val">${p.autores}</span>
          </div>
          ${p.colaboradores?'<div class="py-campo py-colab-campo"><span class="py-label">Colaboradores</span><span class="py-val py-colab-nombre">'+p.colaboradores+'</span></div>':''}
        </div>
      </div>
      <div class="py-galeria reveal">
        ${p.gallery.map((img,i)=>`<div class="py-img-wrap" onclick="openLb(${i})"><img src="${img}" alt="${p.name} — ${i+1}" loading="lazy" decoding="async"></div>`).join('')}
      </div>
    </div>
    <div class="py-lightbox" id="pyLb">
      <button class="py-lb-close" onclick="closeLb()">&#10005;</button>
      <button class="py-lb-prev" onclick="lbNav(-1)">&#8592;</button>
      <img class="py-lb-img" id="pyLbImg" src="" alt="">
      <button class="py-lb-next" onclick="lbNav(1)">&#8594;</button>
    </div>
    <footer><span class="fc">&#169; 2025 TKFarquitectos&#174;</span><a href="https://instagram.com/tkf.arquitectos" target="_blank" class="fig">tkf.arquitectos</a></footer>
  `;
  lbImages=p.gallery;
  bindCursor(page);
  go('proyecto', false);
}

function openLb(i){
  lbIdx=i;
  const lb=document.getElementById('pyLb');
  document.getElementById('pyLbImg').src=lbImages[i];
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLb(){
  const lb=document.getElementById('pyLb');
  if(lb)lb.classList.remove('open');
  document.body.style.overflow='';
}
function lbNav(dir){
  lbIdx=(lbIdx+dir+lbImages.length)%lbImages.length;
  const img=document.getElementById('pyLbImg');
  img.style.opacity='0';
  setTimeout(()=>{img.src=lbImages[lbIdx];img.style.opacity='1';},180);
}
// ── FORMULARIO DE CONTACTO ──
const ctForm=document.getElementById('ct-form');
if(ctForm){
  ctForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=ctForm.querySelector('.f-btn');
    btn.textContent='Enviando...';
    btn.disabled=true;
    try{
      const res=await fetch(ctForm.action,{method:'POST',body:new FormData(ctForm),headers:{'Accept':'application/json'}});
      if(res.ok){
        ctForm.reset();
        document.getElementById('f-success').style.display='block';
        document.getElementById('f-error').style.display='none';
        btn.textContent='Enviar consulta →';
        btn.disabled=false;
      } else {
        throw new Error();
      }
    } catch {
      document.getElementById('f-error').style.display='block';
      document.getElementById('f-success').style.display='none';
      btn.textContent='Enviar consulta →';
      btn.disabled=false;
    }
  });
}

document.addEventListener('keydown',e=>{
  const lb=document.getElementById('pyLb');
  if(!lb||!lb.classList.contains('open'))return;
  if(e.key==='ArrowLeft')lbNav(-1);
  else if(e.key==='ArrowRight')lbNav(1);
  else if(e.key==='Escape')closeLb();
});

// ── NAV ──
function navToggle(){
  const h=document.getElementById('hamburger'),m=document.getElementById('mobMenu'),o=document.getElementById('mobOverlay');
  if(m.classList.contains('open'))navClose();
  else{h.classList.add('open');m.classList.add('open');o.classList.add('show');document.body.style.overflow='hidden';}
}
function navClose(){document.getElementById('hamburger').classList.remove('open');document.getElementById('mobMenu').classList.remove('open');document.getElementById('mobOverlay').classList.remove('show');document.body.style.overflow='';}

function initReveal(){
  setTimeout(()=>{
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.08});
    document.querySelectorAll('.page.active .reveal').forEach(el=>{el.classList.remove('visible');obs.observe(el);});
  },50);
}
initReveal();
