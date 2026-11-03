const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const nav=$('#nav'),menu=$('#menu');menu?.addEventListener('click',()=>nav.classList.toggle('open'));$$('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));$('#year').textContent=new Date().getFullYear();
$$('.category-row button').forEach(btn=>btn.addEventListener('click',()=>{$$('.category-row button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.product').forEach(p=>p.hidden=!(f==='all'||p.dataset.category===f))}));
/* Interest-based product finder. This is a deterministic guide, not medical advice. */
(()=>{
  const widget=document.querySelector('#guideWidget');
  const launcher=document.querySelector('#guideLauncher');
  const close=document.querySelector('#guideClose');
  const thread=document.querySelector('#guideThread');
  const options=document.querySelector('#guideOptions');
  if(!widget||!launcher||!thread||!options)return;

  const catalog=[...document.querySelectorAll('.product[data-product]')];
  const products=catalog.map(card=>{
    const id='guide-'+card.dataset.product.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    card.id=id;
    return {name:card.dataset.product,id,card};
  });
  const groups={
    botanicals:['Ashwagandha','Triphala','Brahmi'],
    turmeric:['Turmeric Curcumin'],
    nourishment:['Moringa Superfood'],
    browse:['Ashwagandha','Turmeric Curcumin','Triphala','Brahmi','Moringa Superfood']
  };
  const labels={
    botanicals:'traditional botanical extracts',
    turmeric:'turmeric and curcumin',
    nourishment:'plant-based everyday nourishment',
    browse:'the named concept catalogue'
  };

  function bubble(kind,text){
    const el=document.createElement('p');
    el.className='guide-bubble '+kind;
    el.textContent=text;
    thread.append(el);
    thread.scrollTop=thread.scrollHeight;
  }
  function choices(items){
    options.replaceChildren();
    items.forEach(item=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='guide-choice';
      button.textContent=item.label;
      button.addEventListener('click',()=>item.action());
      options.append(button);
    });
  }
  function start(){
    thread.replaceChildren();
    bubble('guide','Hi. What would you like to explore?');
    choices([
      {label:'Traditional botanical extracts',action:()=>recommend('botanicals')},
      {label:'Turmeric / curcumin',action:()=>recommend('turmeric')},
      {label:'Plant-based everyday nourishment',action:()=>recommend('nourishment')},
      {label:'Browse the named products',action:()=>recommend('browse')}
    ]);
  }
  function recommend(key){
    options.replaceChildren();
    bubble('visitor',labels[key]);
    bubble('guide','Based on that interest, these catalogue concepts may be worth exploring:');
    const matches=products.filter(product=>groups[key].includes(product.name));
    matches.forEach(product=>{
      const row=document.createElement('a');
      row.className='guide-product';
      row.href='#'+product.id;
      row.textContent=product.name+'  →';
      row.addEventListener('click',()=>{widget.hidden=true;launcher.setAttribute('aria-expanded','false')});
      options.append(row);
    });
    bubble('guide','The “Ayurvedic Supplement” concept is not included because its ingredients are not specified. Product details, extract specifications, and availability still need verification.');
    choices([
      {label:'Read ingredient and evidence notes',action:()=>{location.hash='science';widget.hidden=true;launcher.setAttribute('aria-expanded','false')}},
      {label:'Explore another interest',action:start}
    ]);
  }
  function open(){
    widget.hidden=false;
    launcher.setAttribute('aria-expanded','true');
    if(!thread.childElementCount)start();
  }
  function shut(){
    widget.hidden=true;
    launcher.setAttribute('aria-expanded','false');
    launcher.focus();
  }
  launcher.addEventListener('click',()=>widget.hidden?open():shut());
  close?.addEventListener('click',shut);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!widget.hidden)shut()});
})();
