'use strict';

const publications = [
  {year:'2025', title:'Assessing lighting layouts in enclosed cabins: Multimodal impacts on operators and EEG-based emotion modeling.', venue:'Building and Environment', role:'First author', categories:['first','journal']},
  {year:'2024', title:'A comprehensive assessment method for manned confined space layouts taking into account operational posture comfort supported by artificial intelligence algorithm.', venue:'Journal of Building Engineering', role:'First author', categories:['first','journal']},
  {year:'2025', title:'Exploring the impact of the combination of lighting layout types and illuminance levels on operator fatigue in confined spaces.', venue:'International Conference on Human-Computer Interaction', role:'First author', categories:['first']},
  {year:'2026', title:'Identifying interaction effects of lighting layout parameters on human performance in enclosed indoor environments.', venue:'Indoor Air 2026', role:'First author', categories:['first']},
  {year:'2025', title:'The cognitive acceptance of generative AI image tools based on TPB-TAM model and multi-theory integration.', venue:'Advanced Design Research', role:'First author', categories:['first','journal']},
  {year:'2024', title:'A review of artificial intelligence-driven generation of visual communication works.', venue:'Packaging Engineering (in Chinese)', role:'First author', categories:['first','journal']},
  {year:'2023', title:'A DELMIA-based method for virtual maintenance simulation and evaluation of civil aircraft interiors.', venue:'Packaging Engineering (in Chinese)', role:'Second author', categories:['journal']},
  {year:'2025', title:'Evaluation of cognitive load and user experience in alternative interaction modes under different noise degrees.', venue:'Advanced Engineering Informatics', role:'Second author', categories:['journal']},
  {year:'2025', title:'A risk prediction method for change propagation based on industrial design network evolution.', venue:'Journal of Computational Design and Engineering', role:'Second author', categories:['journal']},
  {year:'2024', title:'Research on influencing factors of users’ intention to use personalized generated virtual digital humans in financial apps based on TAM.', venue:'2024 5th International Conference on Intelligent Design (ICID)', role:'Second author', categories:[]},
  {year:'2025', title:'The effect of pre-sleep lighting on melatonin, sleep and alertness of the crews in the enclosed cabins in the evening with the cumulative effect of light.', venue:'Building and Environment', role:'Co-author', categories:['journal']},
  {year:'2024', title:'Human risk recognition and prediction in manned submersible diving tasks driven by deep learning models.', venue:'Advanced Engineering Informatics', role:'Co-author', categories:['journal']},
  {year:'2025', title:'A theoretical model for evaluation of non-visual effects of lighting based on human performance: Comprehensive research ideas.', venue:'Displays', role:'Co-author', categories:['journal']},
  {year:'2026', title:'Biophilic design in closed cabins: A scoping review of habitability countermeasure pathways under isolated, confined, and extreme conditions.', venue:'Acta Astronautica', role:'Co-author', categories:['journal']}
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
  meta.append(role, venue);
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
    document.querySelector('.publication-count').textContent = count + ' ' + (count === 1 ? 'item' : 'items');
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
