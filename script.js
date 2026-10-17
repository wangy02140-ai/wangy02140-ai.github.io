'use strict';

const publications = [
  {year:'2025', title:'Assessing Lighting Layouts in Enclosed Cabins: Multimodal Impacts on Operators and EEG-Based Emotion Modeling.', venue:'Building and Environment', role:'First author', categories:['first','journal']},
  {year:'2024', title:'A Comprehensive Assessment Method for Manned Confined Space Layouts Taking into Account Operational Posture Comfort Supported by Artificial Intelligence Algorithm.', venue:'Journal of Building Engineering', role:'First author', categories:['first','journal']},
  {year:'2025', title:'Exploring the Impact of the Combination of Lighting Layout Types and Illuminance Levels on Operator Fatigue in Confined Spaces.', venue:'International Conference on Human-Computer Interaction', role:'First author', categories:['first']},
  {year:'2026', title:'Identifying Interaction Effects of Lighting Layout Parameters on Human Performance in Enclosed Indoor Environments.', venue:'Indoor Air 2026', role:'First author', status:'Conference contribution', categories:['first']},
  {year:'2025', title:'The Cognitive Acceptance of Generative AI Image Tools Based on TPB-TAM Model and Multi-theory Integration.', venue:'Advanced Design Research', role:'First author', categories:['first','journal']},
  {year:'In review', title:'Effects of Spatial Lighting Layout Parameters on Multimodal Human Performance in Enclosed Cabin Environments: A Response-Modeling Approach.', venue:'Manuscript under review', role:'First author', categories:['first','review']},
  {year:'In review', title:'Dynamic Cognitive Failure Risk Prediction for Manned Submersible Operations Under Thermal Environmental Stress.', venue:'Manuscript under review', role:'First author', categories:['first','review']},
  {year:'2025', title:'Evaluation of Cognitive Load and User Experience in Alternative Interaction Modes under Different Noise Degrees.', venue:'Advanced Engineering Informatics', role:'Second author', categories:['journal']},
  {year:'2025', title:'A Risk Prediction Method for Change Propagation Based on Industrial Design Network Evolution.', venue:'Journal of Computational Design and Engineering', role:'Second author', categories:['journal']},
  {year:'2024', title:'Human risk recognition and prediction in manned submersible diving tasks driven by deep learning models.', venue:'Advanced Engineering Informatics', role:'Co-author', categories:['journal']},
  {year:'2025', title:'The effect of pre-sleep lighting on melatonin, sleep and alertness of the crews in the enclosed cabins in the evening with the cumulative effect of light.', venue:'Building and Environment', role:'Co-author', categories:['journal']}
];

const list = document.querySelector('#publication-list');
for (const paper of publications) {
  const article = document.createElement('article');
  article.className = 'publication-item';
  article.dataset.categories = paper.categories.join(' ');
  const year = document.createElement('span');
  year.className = 'publication-year';
  year.textContent = paper.year;
  const body = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = paper.title;
  const meta = document.createElement('div');
  meta.className = 'publication-meta';
  const role = document.createElement('span');
  role.className = 'author-label';
  role.textContent = paper.role;
  const venue = document.createElement('span');
  venue.textContent = paper.venue;
  if (paper.categories.includes('review')) venue.className = 'review-label';
  meta.append(role, venue);
  if (paper.status) {
    const status = document.createElement('span');
    status.textContent = paper.status;
    meta.append(status);
  }
  body.append(title, meta);
  article.append(year, body);
  list.append(article);
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(other => {
      other.classList.remove('active');
      other.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('.publication-item').forEach(item => {
      const show = filter === 'all' || item.dataset.categories.split(' ').includes(filter);
      item.hidden = !show;
      if (show) count++;
    });
    document.querySelector('.publication-count').textContent = count + ' selected ' + (count === 1 ? 'item' : 'items');
  });
});

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Open navigation');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });

const projects = {
  cockpit:{role:'STUDENT PROJECT LEAD',title:'Intelligent cockpit environments',intro:'Contributed to the Aerospace Medicine and Human–Machine Intelligence subproject of a Ministry of Education pilot project.',contributions:['Led planning of the overall research roadmap and technical framework.','Coordinated interdisciplinary research on human–machine optimization for intelligent cockpits.','Investigated how spatial lighting and microenvironmental factors affect cognition, operation and task performance.','Advanced comprehensive assessment and optimization methods to support human–machine collaborative design.']},
  submersible:{role:'CORE STUDENT RESEARCHER',title:'Manned submersible design & ergonomics',intro:'Contributed to a National Key R&D Program project on transparent pressure-resistant structures and manned submersibles.',contributions:['Supported exterior styling, paint schemes, cabin layout and comfort design.','Conducted ergonomic simulations and personnel performance assessments.','Considered overall layout, structural and manufacturing constraints in design iteration.','Supported design validation and optimization for occupant comfort and operational performance.']},
  space:{role:'STUDENT PROJECT LEAD',title:'Crewed spacecraft design & prototyping',intro:'Contributed to collaborative crewed-spaceflight design projects, including a space tourism system, cabin environments and human–machine interaction design.',contributions:['Coordinated concept development and iterative design for a two-cabin suborbital crewed vehicle.','Led 3D modeling, rendering and design finalization.','Coordinated with manufacturers on engineering prototypes and scale models.','Contributed to cabin lighting simulation and control-panel layout optimization in related spacecraft projects.']}
};
const dialog = document.querySelector('#project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    lastProjectButton = button;
    document.querySelector('#dialog-role').textContent = project.role;
    document.querySelector('#dialog-title').textContent = project.title;
    const body = document.querySelector('#dialog-body');
    body.replaceChildren();
    const intro = document.createElement('p'); intro.textContent = project.intro;
    const heading = document.createElement('h3'); heading.textContent = 'My contribution';
    const ul = document.createElement('ul');
    project.contributions.forEach(text => {const li = document.createElement('li');li.textContent=text;ul.append(li);});
    const note = document.createElement('p'); note.className='dialog-note'; note.textContent='A high-level summary of my responsibilities in collaborative projects; no detailed engineering specifications are disclosed.';
    body.append(intro,heading,ul,note);
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(lastProjectButton)lastProjectButton.focus();});

const patentButton = document.querySelector('#patent-toggle');
patentButton.addEventListener('click',()=>{
  const open = patentButton.getAttribute('aria-expanded') !== 'true';
  patentButton.setAttribute('aria-expanded',String(open));
  document.querySelector('#patent-list').hidden = !open;
  patentButton.querySelector('span').textContent = open ? '−' : '＋';
});

let toastTimeout;
function toast(message) {
  const element = document.querySelector('.toast');
  element.textContent=message;
  element.classList.add('show');
  window.clearTimeout(toastTimeout);
  toastTimeout=window.setTimeout(()=>element.classList.remove('show'),3000);
}
document.querySelector('#copy-email').addEventListener('click',async()=>{
  const email='wangyao1229@mail.nwpu.edu.cn';
  try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(email);
    else{
      const input=document.createElement('textarea');input.value=email;input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();const ok=document.execCommand('copy');input.remove();if(!ok)throw new Error('Copy unavailable');
    }
    toast('Email address copied.');
  }catch{toast('Please copy: '+email);}
});

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')==='#'+entry.target.id));}});
  },{rootMargin:'-20% 0px -55% 0px',threshold:0});
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
}
