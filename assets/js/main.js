// ===========================================================
// Aravind Sekar Portfolio — shared interactions
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Nav: scrolled state + mobile toggle ---------- */
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav__links');
  const navToggle = document.querySelector('.nav__toggle');

  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ---------- Hero entrance (one orchestrated moment) ---------- */
  const heroLines = document.querySelectorAll('.hero h1 .line span');
  const heroFade = document.querySelectorAll('[data-hero-fade]');
  if (heroLines.length && window.gsap && !prefersReduced) {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(heroLines, {
      y: 0,
      duration: 1,
      stagger: 0.09,
      ease: 'expo.out'
    });
    if (heroFade.length) {
      tl.to(heroFade, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out'
      }, '-=0.5');
    }
  } else {
    // No GSAP (blocked/failed to load) or reduced motion: show immediately, no animation
    heroLines.forEach(el => el.style.transform = 'none');
    heroFade.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  /* ---------- Hero role-text rotator ---------- */
  const roleText = document.querySelector('.hero__role-text');
  if (roleText) {
    const phrases = ['UI/UX Designer', 'Product Strategist', 'Digital Marketer', 'Creative Designer'];
    const colors = ['var(--gold-dim)', 'var(--teal)', 'var(--rust)', 'var(--gold-dim)'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % phrases.length;
      roleText.style.opacity = '0';
      roleText.style.transform = 'translateY(10px)';
      setTimeout(() => {
        roleText.textContent = phrases[idx];
        roleText.style.color = colors[idx];
        roleText.style.opacity = '1';
        roleText.style.transform = 'translateY(0)';
      }, 350);
    }, 2600);
  }

  /* ---------- Process: scroll-driven progress fill ---------- */
  const processTrack = document.querySelector('.process__track');
  const processFill = document.querySelector('.process__bar-fill');
  if (processTrack && processFill && window.gsap && window.ScrollTrigger) {
    gsap.to(processFill, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: processTrack,
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: 0.4
      }
    });
  }

  /* ---------- Functional scroll reveals (case-study figures) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (window.gsap && window.ScrollTrigger && !prefersReduced) {
      reveals.forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => el.classList.add('is-visible'),
          once: true
        });
      });
    } else {
      reveals.forEach(el => el.classList.add('is-visible'));
    }
  }

  /* ---------- Testimonials carousel ---------- */
  const testis = document.querySelectorAll('.testi');
  const dotsWrap = document.querySelector('.testi__dots');
  if (testis.length) {
    let active = 0;
    const dots = [];
    if (dotsWrap) {
      testis.forEach((_, i) => {
        const b = document.createElement('button');
        if (i === 0) b.classList.add('is-active');
        b.setAttribute('aria-label', `Show testimonial ${i + 1}`);
        b.addEventListener('click', () => show(i));
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }
    function show(i) {
      testis[active].classList.remove('is-active');
      dots[active] && dots[active].classList.remove('is-active');
      active = i;
      testis[active].classList.add('is-active');
      dots[active] && dots[active].classList.add('is-active');
    }
    let timer = setInterval(() => show((active + 1) % testis.length), 6500);
    dotsWrap && dotsWrap.addEventListener('click', () => {
      clearInterval(timer);
      timer = setInterval(() => show((active + 1) % testis.length), 6500);
    });
  }

  /* ---------- Accordion (More Projects) ---------- */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

});
