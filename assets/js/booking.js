/* Static proposal booking flow. Requires only the local jQuery and EmailJS browser scripts. */
window.LK_BOOKING_CONFIG={
  email:{publicKey:'REMPLACEZ_PAR_VOTRE_CLE_PUBLIQUE_EMAILJS',serviceId:'VOTRE_SERVICE_ID_EMAILJS',ownerTemplateId:'VOTRE_TEMPLATE_PROPRIETAIRE',requesterTemplateId:'VOTRE_TEMPLATE_DEMANDEUR',ownerEmail:'VOTRE_EMAIL_PROPRIETAIRE'},
  maxPartySize:8,leadMinutes:60,reservationDurationMinutes:90,
  serviceWindows:{0:[],1:[['12:00','13:30'],['18:30','21:30']],2:[['12:00','13:30'],['18:30','22:00']],3:[['12:00','13:30'],['18:30','21:30']],4:[['12:00','13:30'],['18:30','22:30']],5:[['12:00','13:30'],['18:30','22:30']],6:[['18:30','22:30']]}
};

$(function(){
  const config=window.LK_BOOKING_CONFIG,$form=$('#booking-form'),$date=$('#booking-date'),$party=$('#booking-party'),$time=$('#booking-time'),$next=$('[data-next-step]'),$error=$('[data-booking-error]'),$status=$('#availability-status');
  let selectedTime='';
  const minutes=value=>{const parts=value.split(':').map(Number);return parts[0]*60+parts[1]};
  const clock=value=>`${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`;
  const toDate=value=>new Date(`${value}T12:00:00`);
  const frenchDate=value=>toDate(value).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const today=()=>new Date().toISOString().slice(0,10);
  const showError=(text,retry)=>{$error.empty().prop('hidden',!text);if(!text)return;$error.append(document.createTextNode(text));if(retry)$('<button>',{type:'button','class':'inline-retry',text:'Réessayer'}).on('click',retry).appendTo($error)};
  const setStep=step=>{$('[data-step]').prop('hidden',true);$(`[data-step="${step}"]`).prop('hidden',false);$('[data-progress]').removeClass('is-current').removeAttr('aria-current');$(`[data-progress="${step}"]`).addClass('is-current').attr('aria-current','step');showError('');};
  const slotsFor=()=>{
    const value=$date.val(),party=Number($party.val());if(!value||!party)return[];
    const day=toDate(value).getDay(),windows=config.serviceWindows[day]||[],interval=30,duration=config.reservationDurationMinutes,cutoff=new Date(Date.now()+config.leadMinutes*60000);
    return windows.flatMap(([start,end])=>{const slots=[];for(let time=minutes(start);time+duration<=minutes(end);time+=interval){const slot=clock(time),candidate=new Date(`${value}T${slot}:00`);if(candidate>=cutoff)slots.push(slot)}return slots});
  };
  const refreshTimes=()=>{
    selectedTime='';$next.prop('disabled',true);$time.empty().append(new Option('Choisir','')).prop('disabled',true);showError('');
    const slots=slotsFor();if(!slots.length){$status.text('Aucun horaire proposé pour ce moment. Choisissez une autre date.');return}
    slots.forEach(slot=>$time.append(new Option(slot,slot)));$time.prop('disabled',false);$status.text(`${slots.length} horaire(s) proposé(s) selon les heures de cuisine.`);
  };
  const initialDate=()=>{let date=new Date();for(let offset=0;offset<8;offset++){const candidate=new Date(date);candidate.setDate(date.getDate()+offset);if((config.serviceWindows[candidate.getDay()]||[]).length)return candidate.toISOString().slice(0,10)}return today()};
  $date.attr('min',today()).val(initialDate());for(let count=1;count<=config.maxPartySize;count++)$party.append(new Option(`${count} ${count===1?'personne':'personnes'}`,count,count===2,count===2));
  $date.on('change',refreshTimes);$party.on('change',refreshTimes);$time.on('change',function(){selectedTime=$(this).val();$next.prop('disabled',!selectedTime)});
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
