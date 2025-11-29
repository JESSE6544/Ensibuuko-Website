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

// Ensibuuko Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    initProductModals();
});

function initProductModals() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');

    // Enhanced product data matching your product cards
    const productData = {
        chomoka: {
            title: "Chomoka - VSLA Digital Platform",
            image: "assets/images/Chomoka-phone.png",
            description: "Chomoka transforms traditional Village Savings and Loan Associations (VSLAs) by digitizing their entire operations. Our mobile-first platform eliminates paper-based record keeping, reduces errors, and brings financial transparency to community savings groups across East Africa.",
            features: [
                "Digital record keeping for shares, loans, and social funds",
                "Mobile Money integration (MTN, Airtel, Vodacom)",
                "Offline functionality for areas with limited connectivity",
                "Automated interest calculations and loan tracking",
                "Real-time group analytics and performance dashboards",
                "Multi-language support (English, Swahili, Luganda)",
                "Secure cloud backup with end-to-end encryption",
                "Member attendance and meeting management"
            ],
            stats: "500+ VSLAs | 15,000+ Members | 70% Time Savings",
            useCases: [
                "Community savings groups",
                "Women's empowerment circles", 
                "Agricultural cooperatives",
                "Youth entrepreneurship groups"
            ]
        },
        mobis: {
            title: "MOBIS - Complete Digital Banking Suite",
            image: "assets/images/Mobis.png",
            description: "MOBIS is a comprehensive core banking platform designed specifically for SACCOs, Microfinance Institutions, and rural banks. We provide end-to-end automation of banking operations while ensuring full regulatory compliance and seamless multi-channel customer experience.",
            features: [
                "Complete core banking system with multi-branch support",
                "USSD banking (*285#) for feature phone access",
                "Mobile banking app for smartphone users",
                "Real-time transaction processing and reporting",
                "Loan origination and management system",
                "Integrated payment systems (EFT, RTGS, Mobile Money)",
                "Regulatory reporting and compliance tools",
                "CRM with complete member lifecycle management",
                "Automated savings and fixed deposit accounts",
                "Multi-tier user access and approval workflows"
            ],
            stats: "50+ Financial Institutions | 200,000+ Customers | 99.9% Uptime",
            useCases: [
                "SACCOs and credit cooperatives",
                "Microfinance institutions",
                "Community development banks",
                "Rural financial service providers"
            ]
        },
        "lending services": {
            title: "Lending Services - Community Financing Solutions",
            image: "assets/images/LOGO EDITS v2-01.png",
            description: "Our lending services bridge the financing gap for underserved communities by providing affordable credit solutions through our extensive network of partner financial institutions. We leverage alternative data and innovative credit scoring to serve clients who lack traditional banking history.",
            features: [
                "Agricultural loans for farm inputs and equipment",
                "Emergency loans for healthcare and education needs",
                "Working capital financing for small businesses",
                "Asset financing for productive equipment",
                "Group lending with peer guarantee systems",
                "Flexible repayment schedules aligned with cash flows",
                "Digital loan application and quick disbursement",
                "Financial literacy and business training programs",
                "Seasonal loan products for farmers",
                "Micro-insurance partnerships for risk mitigation"
            ],
            stats: "$5M+ Loans Disbursed | 45% Women Borrowers | 95% Repayment Rate",
            useCases: [
                "Smallholder farmers and agricultural cooperatives",
                "Women-owned enterprises and entrepreneurs",
                "Youth entrepreneurs and startup businesses",
                "Community-based organizations and groups",
                "Micro-enterprises in rural areas"
            ]
        }
    };

    // Add click events to Learn More buttons
    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent.trim().toLowerCase();
            
            openModal(productName);
        });
    });

    function openModal(productName) {
        const product = productData[productName];
        
        if (product) {
            modalTitle.textContent = product.title;
            
            // Use the image from the product card or fallback to data image
            const cardImage = document.querySelector(`.product-card h3:contains("${productName}")`)?.closest('.product-card')?.querySelector('img');
            modalImage.src = cardImage?.src || product.image;
            modalImage.alt = product.title;
            
            modalDescription.textContent = product.description;
            
            // Create comprehensive features section
            modalFeatures.innerHTML = `
                <div class="feature-section">
                    <h4><i class="fas fa-star"></i> Key Features</h4>
                    <ul class="features-list">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="stats-section">
                    <h4><i class="fas fa-chart-line"></i> Impact & Reach</h4>
                    <div class="stats-badge">${product.stats}</div>
                </div>
                
                <div class="usecases-section">
                    <h4><i class="fas fa-users"></i> Ideal For</h4>
                    <div class="usecases-tags">
                        ${product.useCases.map(usecase => `<span class="usecase-tag">${usecase}</span>`).join('')}
                    </div>
                </div>
            `;
            
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}
