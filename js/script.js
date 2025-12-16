// === base / existing helpers (kept & merged) ===
(function () {
  // Auto year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // switchTab (keeps earlier behavior)
  window.switchTab = function(tab){
    document.querySelectorAll('.product-tab').forEach(t=>t.classList.remove('active-tab'));
    document.querySelectorAll('.product-card').forEach(c=>c.style.display='none');
    const tabBtn = document.querySelector(`[onclick="switchTab('${tab}')"]`);
    if(tabBtn) tabBtn.classList.add('active-tab');
    const card = document.getElementById(`tab-${tab}`);
    if(card) card.style.display='flex';
  };

  // subscribeForm placeholder
  window.subscribeForm = function(){
    alert('Thanks for subscribing — (simulated)');
  };

  // small hover effect preserved
  document.querySelectorAll('section div[style*="box-shadow"]').forEach(card=>{
    card.addEventListener('mouseenter',()=>{card.style.transform='translateY(-6px)';});
    card.addEventListener('mouseleave',()=>{card.style.transform='translateY(0)';});
  });

  // Testimonial slider (simple)
  (function(){
    const track = document.querySelector('.testimonials-track');
    if(!track) return;
    let index = 0;
    const slides = track.children.length;
    function moveSlider(){ index = (index + 1) % slides; track.style.transform = `translateX(-${index * 100}%)`; }
    setInterval(moveSlider, 4500);
  })();

  // Hide navbar on scroll (unchanged)
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;
    if (window.scrollY > 50) {
      if (window.scrollY > lastScrollY) header.classList.add("hide");
      else header.classList.remove("hide");
    } else header.classList.remove("hide");
    lastScrollY = window.scrollY;
  });

  // Mobile nav toggle (preserved + small fix)
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

    // when any normal link clicked — close menu (dropdown toggles are handled below)
   siteNav.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    if (a.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
      e.preventDefault();
      return; 
    }
    siteNav.classList.remove('open');
  });
});


    // focus trap (keeps previous behavior but guarded)
    const focusableElements = Array.from(siteNav.querySelectorAll('a, button'));
    if(focusableElements.length){
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      document.addEventListener('keydown', (e)=>{
        if(e.key === 'Tab' && siteNav.classList.contains('open')){
          if(e.shiftKey && document.activeElement === firstFocusable){ e.preventDefault(); lastFocusable.focus(); }
          else if(!e.shiftKey && document.activeElement === lastFocusable){ e.preventDefault(); firstFocusable.focus(); }
        }
      });
    }
  })();
  // ✅ SINGLE SOURCE: Mobile Products Dropdown
(function(){
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth > 768) return;

      e.preventDefault();
      e.stopPropagation();

      const menu = toggle.nextElementSibling;
      if (!menu) return;

      // Close other dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m !== menu) m.style.display = 'none';
      });

      menu.style.display = menu.style.display === 'block'
        ? 'none'
        : 'block';
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.style.display = 'none';
      });
    }
  });
})();



// === NEW: parallax background + smooth-scroll momentum + reveal animations + section progress ===

(function(){
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ------ Parallax background (desktop only) ------ */
  const hero = document.querySelector('.parallax-hero');
  function parallaxTick(){
    if(!hero) return;
    const speed = parseFloat(hero.getAttribute('data-speed') || '0.4');
    const rect = hero.getBoundingClientRect();
    const mid = window.innerHeight / 2;
    // translate value proportional to hero center distance
    const diff = (rect.top + rect.height/2) - mid;
    const translateY = -diff * speed * 0.08;
    hero.style.transform = `translateY(${translateY}px)`;
  }
  if(!isTouch){
    window.addEventListener('scroll', parallaxTick, {passive:true});
    window.addEventListener('resize', parallaxTick);
    parallaxTick();
  }

  /* ------ Smooth scroll momentum (desktop only) ------ */
  // Gentle lerp smoothing — disabled on touch devices
  if(!isTouch){
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let ticking = false;

    window.addEventListener('wheel', (e)=>{
      // prevent default only when not using modifier keys
      if(e.ctrlKey || e.metaKey || e.altKey) return;
      targetScroll += e.deltaY * 0.6; // reduce sensitivity
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
      if(!ticking){
        requestAnimationFrame(smoothScrollLoop);
        ticking = true;
      }
      e.preventDefault();
    }, {passive:false});

    function smoothScrollLoop(){
      currentScroll += (targetScroll - currentScroll) * 0.12; // lerp
      window.scrollTo(0, currentScroll);
      if(Math.abs(targetScroll - currentScroll) > 0.5){
        requestAnimationFrame(smoothScrollLoop);
      } else {
        ticking = false;
      }
    }

    // sync target when user uses scrollbars / keyboard
    window.addEventListener('scroll', ()=> { if(!ticking) { currentScroll = window.scrollY; targetScroll = window.scrollY; } }, {passive:true});
  }

  /* ------ Reveal animations using IntersectionObserver ------ */
  const revealEls = document.querySelectorAll('.reveal, .slide-left, .slide-right, .product-card, .testimonial, .pattern-content');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});

  revealEls.forEach(el => revealObserver.observe(el));

  /* ------ Section progress indicator ------ */
  const sections = Array.from(document.querySelectorAll('section, #products-wrapper, main > section')).filter(s=>s.offsetHeight > 200);
  const total = Math.max(1, sections.length);
  const totalEl = document.getElementById('total-sections');
  if(totalEl) totalEl.textContent = String(total).padStart(2,'0');

  const currentEl = document.getElementById('current-section');
  function updateSectionProgress(){
    let currentIndex = 0;
    sections.forEach((s,i)=>{
      const rect = s.getBoundingClientRect();
      // section counted as active if its top enters viewport 30% from top
      if(rect.top <= window.innerHeight * 0.35 && rect.bottom > window.innerHeight * 0.15){
        currentIndex = i;
      }
    });
    if(currentEl) currentEl.textContent = String(currentIndex+1).padStart(2,'0');
  }
  window.addEventListener('scroll', updateSectionProgress, {passive:true});
  window.addEventListener('resize', updateSectionProgress);
  updateSectionProgress();

  /* ------ Floating menu highlight (basic) ------ */
  const floatMenu = document.getElementById('floating-menu');
  if(floatMenu){
    const floatLinks = Array.from(floatMenu.querySelectorAll('a'));
    window.addEventListener('scroll', ()=>{
      const scTop = window.scrollY + (window.innerHeight/2);
      floatLinks.forEach(a=>{
        const target = document.querySelector(a.getAttribute('href'));
        if(!target) return;
        const rect = target.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        if(scTop >= top && scTop < bottom) a.classList.add('active'); else a.classList.remove('active');
      });
    }, {passive:true});
  }

})();

// === NEW: Random scattered hero image layout ===
// document.addEventListener("DOMContentLoaded", () => {
//   const images = document.querySelectorAll(".hero-img");
//   const heroRight = document.querySelector(".hero-right");

//   if (!heroRight || images.length === 0) return;

//   function scatterImages() {
//     const heroWidth = heroRight.offsetWidth;
//     const heroHeight = heroRight.offsetHeight;

//     images.forEach((img, i) => {
//       const left = Math.random() * (heroWidth - img.offsetWidth - 40);
//       const top = Math.random() * (heroHeight - img.offsetHeight - 40);

//       img.style.left = left + "px";
//       img.style.top = top + "px";

//       img.style.opacity = "1";
//       img.style.animationDelay = `${0.3 + i * 0.2}s`;
//     });
//   }

//   window.addEventListener("load", scatterImages);
//   window.addEventListener("resize", scatterImages);
// });

// === IMPACT METRICS COUNTER (UPDATED & FIXED) ===
(function() {
  const counters = document.querySelectorAll(".impact-number");
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const hasDollar = el.textContent.includes("$");
    const hasPlus = el.textContent.includes("+");

    let count = 0;
    const speed = 40; // adjust for smoothness

    function update() {
      const increment = Math.ceil(target / speed);
      count += increment;

      if (count >= target) count = target;

      let formatted = count.toLocaleString();

      if (hasDollar) formatted = "$" + formatted;
      if (hasPlus) formatted += "+";

      // Re-apply green "+" markup
      el.innerHTML = formatted.replace("+", "<span style='color:#54b749'>+</span>");

      if (count < target) requestAnimationFrame(update);
    }

    update();
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        obs.disconnect(); // run only once
      }
    });
  }, { threshold: 0.4 });

  const wrapper = document.querySelector(".impact-wrapper");
  if (wrapper) observer.observe(wrapper);
})();
})();

// === PRODUCT CARDS SCROLL REVEAL ===
(function () {
  const cards = document.querySelectorAll('.reveal-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  cards.forEach(card => observer.observe(card));
})();

// Africa map interactivity
// Add this to your script.js for positioning help
document.addEventListener('DOMContentLoaded', function() {
  const markers = document.querySelectorAll('.country-marker');
  
  markers.forEach(marker => {
    marker.addEventListener('click', function(e) {
      e.preventDefault();
      const rect = this.parentElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      
      console.log(`left: ${x}%; top: ${y}%; // ${this.getAttribute('data-country')}`);
      
      // Update the position (optional)
      // this.style.left = `${x}%`;
      // this.style.top = `${y}%`;
    });
  });
});

/* =========================
   SCROLL REVEAL OBSERVER
========================= */

const revealElements = document.querySelectorAll('.reveal-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// Scroll reveal for feature cards
(function () {
  const cards = document.querySelectorAll('.reveal-card');
  if (!cards.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => obs.observe(card));
})();


/* HERO LAZY LOAD */
window.addEventListener("load", () => {
  document.querySelectorAll(".hero-flex").forEach(hero => {
    hero.classList.add("hero-loaded");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-flex");
  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add("hero-loaded");
    });
  }
});

/* =========================
   PRODUCTS CARDS SLIDER
========================= */
(function () {
  const slider = document.querySelector('.products-slider');
  if (!slider) return;

  const track = slider.querySelector('.products-track');
  const slides = track.children;
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');

  let index = 0;
  let slideWidth = slider.offsetWidth;
  let autoTimer;

  function updateSlider() {
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  function startAuto() {
    autoTimer = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  window.addEventListener('resize', () => {
    slideWidth = slider.offsetWidth;
    updateSlider();
  });

  startAuto();
  updateSlider();
})();

