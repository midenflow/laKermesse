/* Static proposal booking flow. Requires only the local jQuery and EmailJS browser scripts. */
window.LK_BOOKING_CONFIG={
  email:{publicKey:'REMPLACEZ_PAR_VOTRE_CLE_PUBLIQUE_EMAILJS',serviceId:'VOTRE_SERVICE_ID_EMAILJS',ownerTemplateId:'VOTRE_TEMPLATE_PROPRIETAIRE',requesterTemplateId:'VOTRE_TEMPLATE_DEMANDEUR',ownerEmail:'VOTRE_EMAIL_PROPRIETAIRE'},
  defaultStandardPartySize:2,maxStandardPartySize:14,leadMinutes:60,
  /* Each pair is [first seating, last bookable seating], not kitchen closing time. */
  bookingWindows:{0:[],1:[['12:00','12:00'],['18:30','20:00']],2:[['12:00','12:00'],['18:30','20:30']],3:[['12:00','12:00'],['18:30','20:00']],4:[['12:00','12:00'],['18:30','20:30']],5:[['12:00','12:00'],['18:30','21:00']],6:[['18:30','21:00']]}
};

$(function(){
  const config=window.LK_BOOKING_CONFIG,$form=$('#booking-form'),$date=$('#booking-date'),$party=$('#booking-party'),$time=$('#booking-time'),$next=$('[data-next-step]'),$error=$('[data-booking-error]'),$status=$('#availability-status');
  let selectedTime='';
  const minutes=value=>{const parts=value.split(':').map(Number);return parts[0]*60+parts[1]};
  const clock=value=>`${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`;
  const toDate=value=>new Date(`${value}T12:00:00`);
  const frenchDate=value=>toDate(value).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const dateKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const today=()=>dateKey(new Date());
  const showError=(text,retry)=>{$error.empty().prop('hidden',!text);if(!text)return;$error.append(document.createTextNode(text));if(retry)$('<button>',{type:'button','class':'inline-retry',text:'Réessayer'}).on('click',retry).appendTo($error)};
  const setStep=step=>{const $active=$(`[data-step="${step}"]`);$('[data-step]').prop('hidden',true);$active.prop('hidden',false);$('[data-progress]').removeClass('is-current').removeAttr('aria-current');$(`[data-progress="${step}"]`).addClass('is-current').attr('aria-current','step');showError('');const $heading=$active.find('h2');if($heading.length)$heading.attr('tabindex','-1').trigger('focus');};
  const slotsForDate=(value,partySize)=>{
    if(!value||!partySize)return[];
    const day=toDate(value).getDay(),windows=config.bookingWindows[day]||[],interval=30,cutoff=new Date(Date.now()+config.leadMinutes*60000);
    return windows.flatMap(([start,lastSeating])=>{const slots=[];for(let time=minutes(start);time<=minutes(lastSeating);time+=interval){const slot=clock(time),candidate=new Date(`${value}T${slot}:00`);if(candidate>=cutoff)slots.push(slot)}return slots});
  };
  const slotsFor=()=>slotsForDate($date.val(),Number($party.val()));
  const refreshTimes=()=>{
    selectedTime='';$next.prop('disabled',true);$time.empty().append(new Option('Choisir','')).prop('disabled',true);showError('');
    const slots=slotsFor();if(!slots.length){$status.text('Aucun horaire proposé pour ce moment. Choisissez une autre date.');return}
    slots.forEach(slot=>$time.append(new Option(slot,slot)));$time.prop('disabled',false);$status.text(`${slots.length} horaire(s) proposé(s) selon les heures de cuisine.`);
  };
  const initialDate=()=>{const date=new Date();for(let offset=0;offset<31;offset++){const candidate=new Date(date);candidate.setDate(date.getDate()+offset);const value=dateKey(candidate);if(slotsForDate(value,config.defaultStandardPartySize).length)return value}return today()};
  $date.attr('min',today()).val(initialDate());for(let count=1;count<=config.maxStandardPartySize;count++)$party.append(new Option(`${count} ${count===1?'personne':'personnes'}`,count,count===config.defaultStandardPartySize,count===config.defaultStandardPartySize));$party.append(new Option(`${config.maxStandardPartySize+1} personnes ou +`,`${config.maxStandardPartySize+1}+`));
  $date.on('change',refreshTimes);$party.on('change',function(){if($(this).val()===`${config.maxStandardPartySize+1}+`){$('[data-open-privatisation]').trigger('click');return}refreshTimes()});$time.on('change',function(){selectedTime=$(this).val();$next.prop('disabled',!selectedTime)});
  $next.on('click',()=>{if(!selectedTime)return;$('[data-booking-summary]').html(`<div><span>Date</span>${frenchDate($date.val())}</div><div><span>Heure</span>${selectedTime}</div><div><span>Convives</span>${$party.val()}</div>`);setStep(2)});
  $('[data-back-step]').on('click',()=>setStep(1));
  const configured=()=>!Object.values(config.email).some(value=>!value||value.includes('VOTRE_')||value.includes('REMPLACEZ_'));
  const emailData=(guest,recipient)=>({to_email:recipient,reservation_date:frenchDate($date.val()),reservation_time:selectedTime,party_size:$party.val(),first_name:guest.firstName,last_name:guest.lastName,reply_to:guest.email,phone:guest.phone,message:guest.message||'—'});
  const sendMail=(templateId,data)=>window.emailjs.send(config.email.serviceId,templateId,data);
  $form.on('submit',async function(event){
    event.preventDefault();showError('');if(!this.checkValidity()){this.reportValidity();return}if(!selectedTime){showError('Choisissez un horaire avant d’envoyer votre demande.');setStep(1);return}if(!configured()){showError('Configurez d’abord les cinq valeurs EmailJS dans assets/js/booking.js. Aucune demande n’a été envoyée.');return}if(!window.emailjs){showError('Le relais e-mail est indisponible. Vérifiez votre connexion puis réessayez.');return}
    const guest=Object.fromEntries(new FormData(this));const $submit=$('[data-submit-booking]').prop('disabled',true).text('Envoi en cours…');
    try{window.emailjs.init({publicKey:config.email.publicKey});await Promise.all([sendMail(config.email.ownerTemplateId,emailData(guest,config.email.ownerEmail)),sendMail(config.email.requesterTemplateId,emailData(guest,guest.email))]);$('[data-result-reference]').text(`Demande envoyée — ${$date.val()} · ${selectedTime}`);$('[data-result-title]').text('Votre demande est envoyée.');$('[data-result-copy]').text('Une confirmation a été envoyée au restaurant et à votre adresse e-mail.');setStep(3)}catch(error){$submit.prop('disabled',false).html('Envoyer ma demande <span aria-hidden="true">→</span>');showError(error.message||'L’e-mail n’a pas pu être envoyé. Réessayez après avoir vérifié les réglages EmailJS.')}
  });
  refreshTimes();
});

$(function(){
  const config=window.LK_BOOKING_CONFIG,$standard=$('#booking-form'),$progress=$('.booking-progress'),$view=$('[data-privatisation]'),$result=$('[data-privatisation-result]'),$form=$('#privatisation-form'),$error=$('[data-privatisation-error]'),$date=$form.find('[name="eventDate"]'),$count=$form.find('[name="guestCount"]');
  const today=new Date().toISOString().slice(0,10),friendly=value=>new Date(`${value}T12:00:00`).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
  const message=(text,retry)=>{$error.empty().prop('hidden',!text);if(!text)return;$error.append(document.createTextNode(text));if(retry)$('<button>',{type:'button','class':'inline-retry',text:'Réessayer'}).on('click',retry).appendTo($error)};
  const configured=()=>!Object.values(config.email).some(value=>!value||value.includes('VOTRE_')||value.includes('REMPLACEZ_'));
  const open=()=>{$standard.prop('hidden',true);$progress.prop('hidden',true);$view.prop('hidden',false);$result.prop('hidden',true);history.replaceState(null,'','reservation.html?mode=privatisation');$view.find('h2').attr('tabindex','-1').trigger('focus');};
  const close=()=>{$view.prop('hidden',true);$result.prop('hidden',true);$standard.prop('hidden',false);$progress.prop('hidden',false);history.replaceState(null,'','reservation.html');$('[data-open-privatisation]').trigger('focus');};
  $date.attr('min',today);$('[data-open-privatisation]').on('click',open);$('[data-close-privatisation]').on('click',close);$('[data-new-privatisation]').on('click',()=>{$form[0].reset();message('');open()});
  $count.on('input',function(){$('[data-over-thirty]').prop('hidden',Number(this.value)<=30)});
  if(new URLSearchParams(location.search).get('mode')==='privatisation')open();
  $form.on('submit',async function(event){
    event.preventDefault();message('');if(!this.checkValidity()){this.reportValidity();return}if(!configured()){message('Configurez d’abord les cinq valeurs EmailJS dans assets/js/booking.js. Aucune demande n’a été envoyée.');return}if(!window.emailjs){message('Votre demande n’a pas pu être envoyée. Vérifiez votre connexion puis réessayez.',()=>this.requestSubmit());return}
    const data=Object.fromEntries(new FormData(this)),button=$('[data-submit-privatisation]').prop('disabled',true).text('Envoi en cours…');
    const payload={request_type:'Privatisation',to_email:config.email.ownerEmail,guest_count:data.guestCount,event_date:friendly(data.eventDate),first_name:data.firstName,last_name:data.lastName,reply_to:data.email,phone:data.phone,event_type:data.eventType,budget:data.budget||'Non précisé',organisation:data.organisation||'Non précisée',moment:data.moment,audience:data.audience,message:data.details,request_timestamp:new Date().toLocaleString('fr-FR')};
    try{window.emailjs.init({publicKey:config.email.publicKey});await Promise.all([window.emailjs.send(config.email.serviceId,config.email.ownerTemplateId,payload),window.emailjs.send(config.email.serviceId,config.email.requesterTemplateId,{...payload,to_email:data.email})]);$view.prop('hidden',true);$result.prop('hidden',false);$('[data-privatisation-summary]').html(`<span>Date souhaitée</span><strong>${payload.event_date} · ${data.guestCount} personnes · ${data.eventType}</strong>`)}catch(error){button.prop('disabled',false).html('Envoyer ma demande <span aria-hidden="true">→</span>');message('Votre demande n’a pas pu être envoyée. Vérifiez votre connexion puis réessayez.',()=>this.requestSubmit())}
  });
});
