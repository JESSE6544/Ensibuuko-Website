  // Small page scripts (clean, no unterminated comments)
  document.getElementById('year').textContent = new Date().getFullYear();

  function switchTab(tab){
    document.querySelectorAll('.product-tab').forEach(t=>t.classList.remove('active-tab'));
    document.querySelectorAll('.product-card').forEach(c=>c.style.display='none');
    const tabBtn = document.querySelector(`[onclick="switchTab('${tab}')"]`);
    if(tabBtn) tabBtn.classList.add('active-tab');
    const card = document.getElementById(`tab-${tab}`);
    if(card) card.style.display='flex';
  }

  function subscribeForm(){
    // placeholder - replace with real API call
    alert('Thanks for subscribing — (simulated)');
  }

  // Card hover animation
  document.querySelectorAll('section div[style*="box-shadow"]').forEach(card=>{
    card.addEventListener('mouseenter',()=>{card.style.transform='translateY(-6px)';});
    card.addEventListener('mouseleave',()=>{card.style.transform='translateY(0)';});
  });

  // Impact counters and reveal using IntersectionObserver
  (function(){
    const counters = [
      {id:'impact-users',target:250, suffix:'K+'},
      {id:'impact-loans',target:780, prefix:'$', suffix:'K+'},
      {id:'impact-districts',target:145, suffix:'+'},
      {id:'impact-partners',target:50, suffix:'+'}
    ];

    function runCounter(el, target, speed=18, prefix='', suffix=''){
      let count = 0;
      const step = Math.max(1, Math.floor(target / (1000 / speed)));
      const timer = setInterval(()=>{
        count += step;
        if(count >= target){ count = target; clearInterval(timer); }
        el.textContent = prefix + count.toLocaleString() + (suffix || '');
      }, speed);
    }

    const obs = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          counters.forEach(c=>{
            const el = document.getElementById(c.id);
            if(el && !el.dataset.started){
              runCounter(el, c.target, 12, c.prefix || '', c.suffix || '');
              el.dataset.started = '1';
            }
          });
          observer.disconnect();
        }
      });
    },{threshold:0.5});

    const impactSection = document.getElementById('impact');
    if(impactSection) obs.observe(impactSection);
  })();

  // Pause partners animation on hover is handled via CSS
  // Scroll reveal logic
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('visible'); }
    });
  },{threshold:0.15});
  revealElements.forEach(el=>revealObserver.observe(el));
// Testimonial slider
  (function(){
    const track = document.querySelector('.testimonials-track');
    if(!track) return;

    let index = 0;
    const slides = track.children.length;

    function moveSlider(){
      index = (index + 1) % slides;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(moveSlider, 4500);
  })();


/// Hide navbar on scroll (active on all pages)
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;

  // Only hide when past 50px from top
  if (window.scrollY > 50) {
    // scrolling down → hide
    if (window.scrollY > lastScrollY) {
      header.classList.add("hide");
    }
    // scrolling up → show
    else {
      header.classList.remove("hide");
    }
  } else {
    // Always show near top
    header.classList.remove("hide");
  }

  lastScrollY = window.scrollY;
});

// Mobile nav toggle with accessibility improvements
(function(){
  const toggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if(!toggle || !siteNav) return;

  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
    if(!expanded) siteNav.setAttribute('aria-hidden', 'false');
    else siteNav.setAttribute('aria-hidden', 'true');
  });

  // Close mobile menu when a link is clicked
  siteNav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      siteNav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      siteNav.setAttribute('aria-hidden', 'true');
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && siteNav.classList.contains('open')){
      siteNav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      siteNav.setAttribute('aria-hidden', 'true');
      toggle.focus();
    }
  });

  // Focus trap: keep focus within nav when open
  const focusableElements = siteNav.querySelectorAll('a, button');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Tab' && siteNav.classList.contains('open')){
      if(e.shiftKey){
        if(document.activeElement === firstFocusable){
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if(document.activeElement === lastFocusable){
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
})();
