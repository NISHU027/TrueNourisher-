const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const nav=$('#nav'),menu=$('#menu');menu?.addEventListener('click',()=>nav.classList.toggle('open'));$$('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));$('#year').textContent=new Date().getFullYear();
$$('.category-row button').forEach(btn=>btn.addEventListener('click',()=>{$$('.category-row button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.product').forEach(p=>p.hidden=!(f==='all'||p.dataset.category===f))}));
/* Guided product chat. Suggestions reflect interests, not medical advice. */
(()=>{
 const widget=document.querySelector('#guideWidget'),launcher=document.querySelector('#guideLauncher'),close=document.querySelector('#guideClose'),thread=document.querySelector('#guideThread'),options=document.querySelector('#guideOptions');
 if(!widget||!launcher||!thread||!options)return;
 const products=[...document.querySelectorAll('.product[data-product]')].map(card=>{const id='guide-'+card.dataset.product.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');card.id=id;return{name:card.dataset.product,id}});
 function bubble(kind,text){const el=document.createElement('p');el.className='guide-bubble '+kind;el.textContent=text;thread.append(el);thread.scrollTop=thread.scrollHeight}
 function choices(items){options.replaceChildren();items.forEach(item=>{const b=document.createElement('button');b.type='button';b.className='guide-choice';b.textContent=item.label;b.addEventListener('click',item.action);options.append(b)})}
 function productLinks(names){const found=products.filter(p=>names.includes(p.name));found.forEach(p=>{const a=document.createElement('a');a.className='guide-product';a.href='#'+p.id;a.textContent=p.name+' — view concept →';a.addEventListener('click',()=>{widget.hidden=true;launcher.setAttribute('aria-expanded','false')});options.append(a)});if(names.length&&!found.length)bubble('guide','There is no matching product concept in the current catalogue.')}
 function result(label,text,names,source){options.replaceChildren();bubble('visitor',label);bubble('guide',text);choices([{label:'Explore another goal',action:start},{label:'Read product details',action:()=>{location.hash='science';widget.hidden=true;launcher.setAttribute('aria-expanded','false')}}]);productLinks(names);if(source){const link=document.createElement('a');link.className='guide-product';link.href=source.url;link.target='_blank';link.rel='noopener';link.textContent=source.label;options.append(link)}}
 function mental(){bubble('visitor','Mental wellbeing');bubble('guide','Which area are you exploring? I can point to ingredient concepts, but I can’t assess symptoms or recommend treatment.');choices([
  {label:'Stress & sleep',action:()=>result('Stress & sleep','Ashwagandha is a catalogue concept sometimes explored for stress and sleep. Research findings vary by preparation, and they do not establish what an unfinalized TrueNourisher formula would do.',['Ashwagandha'],{url:'https://www.nccih.nih.gov/health/ashwagandha',label:'NCCIH: evidence and safety ↗'})},
  {label:'Focus & memory',action:()=>result('Focus & memory','Brahmi is a catalogue concept sometimes explored in memory research. Evidence is limited and preparation-specific; this is not a claim about the unfinished product concept.',['Brahmi'],{url:'https://pubmed.ncbi.nlm.nih.gov/33436817/',label:'Review of Bacopa clinical evidence ↗'})},
  {label:'Back to goals',action:start}
 ])}
 function start(){thread.replaceChildren();bubble('guide','Hi! What are you looking for?');choices([
  {label:'Hair & scalp',action:()=>result('Hair & scalp','There is no hair- or scalp-focused product concept in the current catalogue, so I won’t suggest an unrelated supplement.',[],null)},
  {label:'Mental wellbeing',action:mental},
  {label:'Digestion',action:()=>result('Digestion','Triphala is a traditional three-fruit concept in the catalogue. Its final ingredients and extract specifications are not yet confirmed, so this is not a digestive health recommendation.',['Triphala'],null)},
  {label:'Everyday nourishment',action:()=>result('Everyday nourishment','Moringa is listed as a plant-based nourishment concept. The finished product and its nutritional specifications are still unconfirmed.',['Moringa Superfood'],null)},
  {label:'Turmeric / curcumin',action:()=>result('Turmeric / curcumin','Turmeric Curcumin is a catalogue concept. The curcuminoid amount, extraction method and final formula are not yet confirmed.',['Turmeric Curcumin'],{url:'https://www.nccih.nih.gov/health/turmeric',label:'NCCIH: evidence and safety ↗'})}
 ])}
 function open(){widget.hidden=false;launcher.setAttribute('aria-expanded','true');if(!thread.childElementCount)start()}
 function shut(){widget.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus()}
 launcher.addEventListener('click',()=>widget.hidden?open():shut());close?.addEventListener('click',shut);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!widget.hidden)shut()})
})();
