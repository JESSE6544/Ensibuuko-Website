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

// Hide navbar on scroll
let lastScroll = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  let current = window.scrollY;
  if(current > lastScroll && current > 50){ 
    header.style.transform = 'translateY(-100%)'; 
  } else { 
    header.style.transform = 'translateY(0)'; 
  }
  lastScroll = current;
});
