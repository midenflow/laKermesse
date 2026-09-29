(()=>{
  const q=s=>document.querySelector(s);
  const form=q('#booking-form'),date=q('#booking-date'),party=q('#booking-party'),time=q('#booking-time');
  const next=q('[data-next-step]'),error=q('[data-booking-error]'),status=q('#availability-status');
  let config,selectedTime='',controller,requestId=0,attemptKey='';
  const requestJson=async(endpoint,options)=>{
    if(location.protocol==='file:')throw Error('Cette page a été ouverte directement. Lancez « npm start » puis ouvrez http://localhost:3000/reservation.html.');
    let response;
    try{response=await fetch(endpoint,options)}catch{throw Error('Le serveur de réservation est inaccessible depuis cette page. Lancez « npm start » puis ouvrez http://localhost:3000/reservation.html.')}
    if(!response.ok)throw Error(`Le serveur de réservation a répondu ${response.status}. Réessayez dans un instant.`);
    try{return await response.json()}catch{throw Error('La réponse du serveur de réservation est invalide. Réessayez dans un instant.')}
  };

  const message=(text,retry)=>{
    error.hidden=!text; error.replaceChildren();
    if(!text)return;
    error.append(document.createTextNode(text));
    if(retry){const button=document.createElement('button');button.type='button';button.className='inline-retry';button.textContent='Réessayer';button.onclick=retry;error.append(' ',button)}
  };
  const setStep=number=>{
    document.querySelectorAll('[data-step]').forEach(item=>item.hidden=Number(item.dataset.step)!==number);
    document.querySelectorAll('[data-progress]').forEach(item=>{const current=Number(item.dataset.progress)===number;item.classList.toggle('is-current',current);item.toggleAttribute('aria-current',current)});
    message(''); const heading=q(`[data-step="${number}"] h2`)||q('[data-step="3"] h2'); heading.tabIndex=-1;heading.focus({preventScroll:true});heading.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  };
  const setSlots=(slots,helpText)=>{
    selectedTime=''; next.disabled=true; time.replaceChildren(new Option(helpText||'Choisir', ''));
    time.disabled=!slots?.length;
    (slots||[]).forEach(slot=>time.add(new Option(slot,slot)));
  };
  const availability=async()=>{
    const id=++requestId; if(controller)controller.abort();controller=new AbortController();message('');
    if(!date.value||!party.value){setSlots([], 'Choisir');status.textContent='Choisissez une date et le nombre de convives pour voir les disponibilités.';return}
    setSlots([], 'Recherche…');status.textContent='Recherche des disponibilités…';
    const wantedDate=date.value,wantedParty=party.value;
    try{
      const data=await requestJson(`/api/availability?date=${encodeURIComponent(wantedDate)}&partySize=${encodeURIComponent(wantedParty)}`,{signal:controller.signal});
      if(id!==requestId||date.value!==wantedDate||party.value!==wantedParty||!Array.isArray(data.slots))return;
      setSlots(data.slots,data.slots.length?'Choisir':'Indisponible');
      status.textContent=data.slots.length?`${data.slots.length} créneau(x) disponible(s) — horaires de cuisine.`:'Aucun créneau disponible. Essayez une autre date ou un autre nombre de convives.';
    }catch(exception){
      if(exception.name==='AbortError'||id!==requestId)return;
      setSlots([], 'Indisponible');status.textContent='';message(exception.message||'La disponibilité n’a pas pu être chargée.',availability);
    }
  };
  const load=async()=>{
    try{
      config=await requestJson('/api/public/config');
      if(!config||!Number.isInteger(config.maxPartySize)||!config.minDate)throw Error('La configuration de réservation est incomplète. Réessayez dans un instant.');
      q('[data-demo-notice]').hidden=!config.demoMode;date.min=config.minDate;
      const maximum=new Date(`${config.minDate}T12:00:00`);maximum.setDate(maximum.getDate()+config.maxAdvanceDays);date.max=maximum.toISOString().slice(0,10);date.value=config.minDate;
      party.replaceChildren();for(let count=1;count<=config.maxPartySize;count++)party.add(new Option(`${count} ${count===1?'personne':'personnes'}`,count,count===2,count===2));
      q('[data-submit-booking]').innerHTML=config.bookingMode==='AUTO_CONFIRM'?'Confirmer ma réservation <span aria-hidden="true">→</span>':'Envoyer une demande <span aria-hidden="true">→</span>';
      availability();
    }catch(exception){setSlots([], 'Indisponible');message(exception.message||'Impossible de charger les réglages de réservation.',load)}
  };
  date.onchange=availability;party.onchange=availability;
  time.onchange=()=>{selectedTime=time.value;next.disabled=!selectedTime};
  next.onclick=()=>{
    if(!selectedTime)return;attemptKey=crypto.randomUUID();
    q('[data-booking-summary]').innerHTML=`<div><span>Date</span>${date.value.split('-').reverse().join('/')}</div><div><span>Heure</span>${selectedTime}</div><div><span>Convives</span>${party.value}</div>`;setStep(2);
  };
  q('[data-back-step]').onclick=()=>setStep(1);
  form.onsubmit=async event=>{
    event.preventDefault();message('');if(!form.reportValidity())return;
    const submit=q('[data-submit-booking]'),data=Object.fromEntries(new FormData(form));
    Object.assign(data,{date:date.value,time:selectedTime,partySize:Number(party.value),idempotencyKey:attemptKey||crypto.randomUUID()});attemptKey=data.idempotencyKey;submit.disabled=true;submit.textContent='Envoi en cours…';
    try{
      const out=await requestJson('/api/reservations',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
      q('[data-result-reference]').textContent=out.reference;q('[data-result-title]').textContent=out.status==='confirmed'?'Votre table est confirmée.':'Votre demande est en attente.';q('[data-result-copy]').textContent=out.status==='confirmed'?'Votre réservation a été enregistrée.':'L’équipe validera votre demande selon les disponibilités.';setStep(3);attemptKey='';
    }catch(exception){submit.disabled=false;submit.innerHTML=config.bookingMode==='AUTO_CONFIRM'?'Confirmer ma réservation <span aria-hidden="true">→</span>':'Envoyer une demande <span aria-hidden="true">→</span>';message(exception.message||'Nous n’avons pas pu confirmer l’envoi. Vérifiez votre connexion puis réessayez : votre demande ne sera pas dupliquée.')}
  };
  load();
})();
