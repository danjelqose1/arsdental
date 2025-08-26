
const translations = {"en": {"nav_services": "Services", "nav_doctors": "Doctors", "nav_reviews": "Reviews", "nav_contact": "Contact", "hero_title": "Top‑rated dental care in Durrës", "hero_sub": "Implants, orthodontics, Invisalign, cosmetic dentistry and full‑service care for local and international patients.", "cta_book": "Book on WhatsApp", "cta_call": "Call the clinic", "kpi_1": "5.0★ rating", "kpi_2": "81+ reviews", "kpi_3": "Modern clinic", "services_title": "Our Services", "services_intro": "Comprehensive treatments delivered by experienced doctors using advanced technology.", "doctors_title": "Our Doctors", "reviews_title": "Patient Reviews", "contact_title": "Contact & Location", "hours_title": "Opening Hours", "form_title": "Quick message", "form_btn": "Send message"}, "sq": {"nav_services": "Shërbimet", "nav_doctors": "Mjekët", "nav_reviews": "Vlerësimet", "nav_contact": "Kontakt", "hero_title": "Kujdes dentar me vlerësim të lartë në Durrës", "hero_sub": "Implante, ortodonci, Invisalign, estetikë dentare dhe shërbime të plota për pacientët vendas dhe ndërkombëtarë.", "cta_book": "Rezervo në WhatsApp", "cta_call": "Telefono klinikën", "kpi_1": "Vlerësim 5.0★", "kpi_2": "81+ komente", "kpi_3": "Klinikë moderne", "services_title": "Shërbimet tona", "services_intro": "Trajtime të plota të kryera nga mjekë me përvojë dhe teknologji të avancuar.", "doctors_title": "Mjekët tanë", "reviews_title": "Vlerësimet e pacientëve", "contact_title": "Kontakt & Adresa", "hours_title": "Orari", "form_title": "Mesazh i shpejtë", "form_btn": "Dërgo mesazhin"}, "it": {"nav_services": "Servizi", "nav_doctors": "Medici", "nav_reviews": "Recensioni", "nav_contact": "Contatti", "hero_title": "Cure dentali al top a Durazzo", "hero_sub": "Impianti, ortodonzia, Invisalign, odontoiatria estetica e assistenza completa per pazienti locali e internazionali.", "cta_book": "Prenota su WhatsApp", "cta_call": "Chiama la clinica", "kpi_1": "Valutazione 5.0★", "kpi_2": "81+ recensioni", "kpi_3": "Clinica moderna", "services_title": "I nostri servizi", "services_intro": "Trattamenti completi eseguiti da medici esperti con tecnologia avanzata.", "doctors_title": "I nostri medici", "reviews_title": "Recensioni dei pazienti", "contact_title": "Contatti & Posizione", "hours_title": "Orari", "form_title": "Messaggio rapido", "form_btn": "Invia messaggio"}};

let currentLang = 'en';
function setLang(lang) { 
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = (translations[lang] && translations[lang][key]) || translations['en'][key] || el.textContent;
  });
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  document.documentElement.setAttribute('lang', lang);
}
window.addEventListener('DOMContentLoaded', () => { setLang('en'); });

const form = document.getElementById('quick-form');
if (form) { 
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const msg = form.message.value.trim();
    const n = name || 'a patient';
    const extra = msg ? ('\n\nMessage: ' + msg) : '';
    const text = encodeURIComponent(`Hello, I'm ${n} and I would like to book an appointment.${extra}`);
    window.open('https://wa.me/355699490443' + '?text=' + text, '_blank');
  });
}
