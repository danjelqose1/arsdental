// === Language translations ===
const translations = {
  en:{nav_services:"Services",nav_doctors:"Doctors",nav_reviews:"Reviews",nav_contact:"Contact",
      hero_title:"Top-rated dental care in Durrës",
      hero_sub:"Implants, orthodontics, Invisalign, cosmetic dentistry and full-service care for local and international patients.",
      cta_book:"Book on WhatsApp",cta_call:"Call the clinic",kpi_1:"5.0★ rating",kpi_2:"81+ reviews",kpi_3:"Modern clinic",
      services_title:"Our Services",services_intro:"Comprehensive treatments delivered by experienced doctors using advanced technology.",
      doctors_title:"Our Doctors",reviews_title:"Patient Reviews",contact_title:"Contact & Location",hours_title:"Opening Hours",
      form_title:"Quick message",form_btn:"Send message"},
  sq:{nav_services:"Shërbimet",nav_doctors:"Mjekët",nav_reviews:"Vlerësimet",nav_contact:"Kontakt",
      hero_title:"Kujdes dentar me vlerësim të lartë në Durrës",
      hero_sub:"Implante, ortodonci, Invisalign, estetikë dentare dhe shërbime të plota për pacientët vendas dhe ndërkombëtarë.",
      cta_book:"Rezervo në WhatsApp",cta_call:"Telefono klinikën",kpi_1:"Vlerësim 5.0★",kpi_2:"81+ komente",kpi_3:"Klinikë moderne",
      services_title:"Shërbimet tona",services_intro:"Trajtime të plota të kryera nga mjekë me përvojë dhe teknologji të avancuar.",
      doctors_title:"Mjekët tanë",reviews_title:"Vlerësimet e pacientëve",contact_title:"Kontakt & Adresa",hours_title:"Orari",
      form_title:"Mesazh i shpejtë",form_btn:"Dërgo mesazhin"},
  it:{nav_services:"Servizi",nav_doctors:"Medici",nav_reviews:"Recensioni",nav_contact:"Contatti",
      hero_title:"Cure dentali al top a Durazzo",
      hero_sub:"Impianti, ortodonzia, Invisalign, odontoiatria estetica e assistenza completa per pazienti locali e internazionali.",
      cta_book:"Prenota su WhatsApp",cta_call:"Chiama la clinica",kpi_1:"Valutazione 5.0★",kpi_2:"81+ recensioni",kpi_3:"Clinica moderna",
      services_title:"I nostri servizi",services_intro:"Trattamenti completi eseguiti da medici esperti con tecnologia avanzata.",
      doctors_title:"I nostri medici",reviews_title:"Recensioni dei pazienti",contact_title:"Contatti & Posizione",hours_title:"Orari",
      form_title:"Messaggio rapido",form_btn:"Invia messaggio"}
};

function setLang(lang='en'){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    el.textContent=(translations[lang]&&translations[lang][k])||translations.en[k]||el.textContent;
  });
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  document.documentElement.lang=lang;
}
window.addEventListener('DOMContentLoaded',()=>setLang('en'));

// === WhatsApp form handler ===
const form=document.getElementById('quick-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.name.value.trim()||'a patient';
    const msg=form.message.value.trim();
    const text=encodeURIComponent(`Hello, I'm ${name} and I would like to book an appointment.${msg?'\n\nMessage: '+msg:''}`);
    window.open('https://wa.me/355699490443?text='+text,'_blank');
  });
}

// === Google Places Reviews ===
function initPlaces() {
  const wrap = document.getElementById('g-reviews');
  if (!wrap) return;

  const svc = new google.maps.places.PlacesService(document.createElement('div'));
  const req = {
    placeId: 'ChIJ38ZjtQXbTxMRvbaNBIbZgUg', // Ars Dental
    fields: ['name','url','rating','user_ratings_total','reviews']
  };

  svc.getDetails(req, (place, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
      console.error('Places error:', status);
      wrap.innerHTML = '<div class="card"><p class="small">Couldn’t load Google reviews right now.</p></div>';
      return;
    }

    wrap.innerHTML = '';
    (place.reviews || []).slice(0,6).forEach(r=>{
      const card=document.createElement('div');
      card.className='card review-card';

      const avatar=document.createElement('img');
      avatar.src=r.profile_photo_url||'';
      avatar.alt=r.author_name||'User';
      card.appendChild(avatar);

      const body=document.createElement('div');
      body.className='review-body';

      const name=document.createElement('strong');
      name.textContent=r.author_name||'Patient';
      body.appendChild(name);

      const stars=document.createElement('div');
      stars.className='stars';
      const rating=Math.round(r.rating||0);
      stars.innerHTML=Array.from({length:5}).map((_,i)=>`<span class="star ${i<rating?'on':''}">★</span>`).join('');
      body.appendChild(stars);

      const meta=document.createElement('div');
      meta.className='review-meta';
      meta.textContent=r.relative_time_description||'';
      body.appendChild(meta);

      const text=document.createElement('div');
      text.className='review-text';
      text.textContent=r.text||'';
      body.appendChild(text);

      card.appendChild(body);
      wrap.appendChild(card);
    });

    const link=document.getElementById('g-place-link');
    if (link && place.url) {
      link.href=place.url;
      document.getElementById('g-reviews-cta').style.display='block';
    }
  });
}
function toggleMenu(force) {
  const open = (typeof force === 'boolean') ? force : !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  const btn = document.querySelector('.menu-btn');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}