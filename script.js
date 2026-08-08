// Nav scroll state
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu toggle
  var burger = document.getElementById('burger');
  var panel = document.getElementById('mobilePanel');
  burger.addEventListener('click', function(){
    var isOpen = panel.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    burger.textContent = isOpen ? '✕' : '☰';
  });
  panel.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){ panel.classList.remove('open'); burger.textContent='☰'; burger.setAttribute('aria-expanded','false'); }
  });

  // Open / closed status (Aqtobe local time, 15:00–24:00 daily)
  function updateStatus(){
    var hour;
    try{
      var parts = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Asia/Aqtobe', hour: '2-digit', hourCycle:'h23' }).formatToParts(new Date());
      var hourPart = parts.find(function(p){ return p.type === 'hour'; });
      hour = parseInt(hourPart.value, 10) % 24;
    }catch(e){
      hour = new Date().getHours();
    }
    var isOpen = hour >= 15 && hour < 24;
    var label = isOpen ? 'Открыто сейчас' : 'Сейчас закрыто · с 15:00';

    [
      ['statusPill','statusPillText'],
      [null,'heroStatusText'],
      [null,'contactsStatusText']
    ].forEach(function(pair){
      var wrapId = pair[0], textId = pair[1];
      var textEl = document.getElementById(textId);
      if(textEl) textEl.textContent = label;
      if(wrapId){
        var wrapEl = document.getElementById(wrapId);
        wrapEl.classList.toggle('is-open', isOpen);
        wrapEl.classList.toggle('is-closed', !isOpen);
      }
    });
    var contactsStatus = document.getElementById('contactsStatus');
    contactsStatus.classList.toggle('is-open', isOpen);
    contactsStatus.classList.toggle('is-closed', !isOpen);
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal on scroll
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
  }