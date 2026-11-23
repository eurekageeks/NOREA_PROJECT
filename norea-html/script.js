// =========================================================================
//  NŌRÉA – Notification Configuration (edit these two values for your site)
// =========================================================================
const SITE_CONFIG = {
  // Put your institute email here (FormSubmit will send emails + student auto-reply)
  INSTITUTE_EMAIL: 'norea0083@gmail.com',
  // Put your institute WhatsApp number with country code, digits only (e.g. '919876543210')
  WHATSAPP_NUMBER: '919682818618',
};

const PROGRAMS = [
  {
    id: 'spoken-english',
    title: 'Spoken English & Communication',
    badge: 'Most Popular',
    gradClass: 'grad-indigo',
    tagClass: 'tag-indigo',
    image: 'images/program-spoken-english.jpg',
    video: 'https://assets.mixkit.co/videos/4809/4809-720.mp4',
    modes: ['Online', 'In-person', 'Hybrid'],
    shortDesc: 'Develop effective communication skills and speak English with confidence.',
    description:
      'Develop effective communication skills and speak English with confidence. This program takes you from foundational English to fluent, natural conversation — building the grammar, vocabulary and presence you need to express yourself clearly in school, college, everyday life, and interviews.',
    topics: [
      'Basic to Advanced English',
      'Fluency & Conversation',
      'Grammar & Vocabulary',
      'Public Speaking',
      'Interview Skills',
    ],
    outcomes: [
      'Speak English fluently and confidently in daily and academic settings',
      'Use correct grammar and a richer vocabulary with ease',
      'Deliver clear, structured presentations and speeches',
      'Approach interviews and group discussions with poise',
    ],
    highlights: [
      'Practical, conversation-led sessions',
      'Guided public-speaking practice',
      'Personal feedback on pronunciation & fluency',
      'Mock interviews and real-life role plays',
    ],
  },
  {
    id: 'personality-development',
    title: 'Personality Development',
    badge: 'Confidence Booster',
    gradClass: 'grad-rose',
    tagClass: 'tag-rose',
    image: 'images/program-personality-development.jpg',
    video: 'https://assets.mixkit.co/videos/6636/6636-720.mp4',
    modes: ['Online', 'In-person', 'Hybrid'],
    shortDesc: 'Build confidence, improve personality, and develop interpersonal & leadership skills.',
    description:
      'Build confidence, improve personality, and develop professional and interpersonal skills. Through interactive activities and reflective practice, students discover their strengths, refine their body language, and learn to lead, collaborate and present ideas with impact.',
    topics: [
      'Confidence Building',
      'Personality Enhancement',
      'Body Language',
      'Leadership Skills',
      'Presentation Skills',
    ],
    outcomes: [
      'Carry yourself with genuine self-confidence',
      'Understand and use positive body language',
      'Lead discussions and teams with clarity',
      'Present ideas persuasively to any audience',
    ],
    highlights: [
      'Fun confidence-building activities',
      'Interactive group workshops',
      'Individual attention and guidance',
      'Real-world presentation practice',
    ],
  },
  {
    id: 'parenting-child-development',
    title: 'Parenting & Child Development',
    badge: 'Family & Growth',
    gradClass: 'grad-teal',
    tagClass: 'tag-teal',
    image: 'images/program-parenting.jpg',
    video: 'https://assets.mixkit.co/videos/4790/4790-720.mp4',
    modes: ['Online', 'In-person', 'Hybrid'],
    shortDesc: 'Understand children better and develop positive, joyful parenting approaches.',
    description:
      'Understand children better and develop positive parenting approaches. This program helps parents build stronger, calmer and more connected relationships with their children — grounded in child psychology, emotional intelligence and healthy everyday habits.',
    topics: [
      'Positive Parenting',
      'Understanding Child Psychology',
      'Effective Parent-Child Communication',
      'Emotional Intelligence',
      'Healthy Parenting Habits',
    ],
    outcomes: [
      'Understand the emotional and developmental needs of children',
      'Communicate with children in a positive, respectful way',
      'Nurture emotional intelligence at home',
      'Build healthy, consistent parenting routines',
    ],
    highlights: [
      'Practical, everyday parenting strategies',
      'Supportive, judgement-free discussions',
      'Real-life scenarios and reflections',
      'Personal attention for every parent',
    ],
  },
];

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Toast helper
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuIcon.innerHTML = open ? '&times;' : '&#9776;';
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuIcon.innerHTML = '&#9776;';
  })
);

// Render Program Cards
const programsGrid = document.getElementById('programsGrid');
programsGrid.innerHTML = PROGRAMS.map(
  (p) => `
  <article class="card program-card ${p.video ? 'program-card-featured' : ''} reveal">
    ${p.video ? '<div class="prog-rainbow-bar"></div>' : ''}
    <div class="prog-media">
      ${
        p.video
          ? `<video class="prog-video" src="${p.video}" poster="${p.image}" autoplay loop muted playsinline preload="metadata"></video>
             <span class="prog-live-pill"><span class="live-dot"></span> Live Session</span>`
          : `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
      }
      <div class="prog-overlay"></div>
      <span class="prog-badge ${p.gradClass}">${p.badge}</span>
      <div class="prog-modes">${p.modes.map((m) => `<span class="prog-mode">${m}</span>`).join('')}</div>
    </div>
    <div class="prog-body">
      <h3 class="prog-title">${p.title}</h3>
      <p class="prog-desc">${p.shortDesc}</p>
      <div class="topic-tags">
        ${p.topics.map((t) => `<span class="topic-tag ${p.tagClass}">${t}</span>`).join('')}
      </div>
      <ul class="outcome-list">
        ${p.outcomes.slice(0, 3).map((o) => `<li><span class="ok">&#10003;</span><span>${o}</span></li>`).join('')}
      </ul>
      <div class="prog-actions">
        <button type="button" class="btn btn-outline btn-sm" data-view="${p.id}">View Details</button>
        <button type="button" class="btn btn-primary btn-sm" data-enquire="${p.title}">Enquire Now &rarr;</button>
      </div>
    </div>
  </article>
`
).join('');

// Program Details Modal
const modal = document.getElementById('programModal');
const modalBody = document.getElementById('modalBody');
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalBackdrop').addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());

function selectProgramAndScroll(title) {
  closeModal();
  const select = document.getElementById('program');
  select.value = title;
  document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('fullName').focus({ preventScroll: true });
}

programsGrid.addEventListener('click', (e) => {
  const viewId = e.target.closest('[data-view]')?.dataset.view;
  const enqTitle = e.target.closest('[data-enquire]')?.dataset.enquire;
  if (enqTitle) return selectProgramAndScroll(enqTitle);
  if (!viewId) return;
  const p = PROGRAMS.find((x) => x.id === viewId);
  if (!p) return;
  modalBody.innerHTML = `
    <span class="prog-badge ${p.gradClass}" style="position:static;display:inline-block;">${p.badge}</span>
    <h2 id="modalTitle" style="margin-top:12px;font-size:2.1rem;">${p.title}</h2>
    <p style="margin:10px 0 18px;color:#475569;font-size:0.95rem;">${p.description}</p>
    ${
      p.video
        ? `<video src="${p.video}" poster="${p.image}" autoplay loop muted playsinline controls style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:18px;margin-bottom:20px;"></video>`
        : `<img src="${p.image}" alt="${p.title}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:18px;margin-bottom:20px;" />`
    }
    <h3 style="font-size:1.4rem;margin-bottom:10px;">Key Topics Covered</h3>
    <div class="topic-tags" style="margin-top:0;margin-bottom:18px;">
      ${p.topics.map((t, i) => `<span class="topic-tag ${p.tagClass}">${i + 1}. ${t}</span>`).join('')}
    </div>
    <h3 style="font-size:1.4rem;margin-bottom:8px;">Learning Outcomes</h3>
    <ul class="outcome-list" style="border:0;padding:0;margin:0 0 18px;">
      ${p.outcomes.map((o) => `<li><span class="ok">&#10003;</span><span>${o}</span></li>`).join('')}
    </ul>
    <h3 style="font-size:1.4rem;margin-bottom:8px;">Course Highlights</h3>
    <ul class="outcome-list" style="border:0;padding:0;margin:0 0 22px;">
      ${p.highlights.map((h) => `<li><span class="ok">&#10003;</span><span>${h}</span></li>`).join('')}
    </ul>
    <button type="button" class="btn btn-primary btn-lg btn-full" id="modalEnquireBtn">Enquire for This Program &rarr;</button>
  `;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalEnquireBtn').addEventListener('click', () => selectProgramAndScroll(p.title));
});

// Email Sent Popup helpers
const sentPopup = document.getElementById('sentPopup');
function closeSentPopup() {
  sentPopup.classList.add('hidden');
  document.body.style.overflow = '';
}
function openSentPopup(title, msg, ref) {
  document.getElementById('sentPopupTitle').textContent = title;
  document.getElementById('sentPopupMsg').textContent = msg;
  document.getElementById('sentPopupRef').textContent = `✦ REF: ${ref}`;
  sentPopup.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
document.getElementById('sentPopupClose').addEventListener('click', closeSentPopup);
document.getElementById('sentPopupBackdrop').addEventListener('click', closeSentPopup);
document.getElementById('sentPopupOk').addEventListener('click', closeSentPopup);

// Enquiry Form + Automatic Background Email + WhatsApp
const form = document.getElementById('enquiryForm');
const successBox = document.getElementById('successBox');
const submitBtn = document.getElementById('submitBtn');

function setError(field, msg) {
  const input = form.elements[field];
  const errEl = form.querySelector(`[data-error="${field}"]`);
  if (input) input.classList.toggle('invalid', Boolean(msg));
  if (errEl) errEl.textContent = msg || '';
}

function clearForm() {
  form.reset();
  ['fullName', 'email', 'phone', 'program', 'learningMode'].forEach((f) => setError(f, ''));
}
document.getElementById('clearBtn').addEventListener('click', clearForm);
document.getElementById('resetSuccessBtn').addEventListener('click', () => {
  successBox.classList.add('hidden');
  form.classList.remove('hidden');
  clearForm();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    program: form.program.value,
    learningMode: form.learningMode.value,
    message: form.message.value.trim(),
  };

  let valid = true;
  const check = (f, cond, msg) => {
    setError(f, cond ? '' : msg);
    if (!cond) valid = false;
  };
  check('fullName', data.fullName.length >= 2, 'Please enter your full name.');
  check('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email), 'Please enter a valid email address.');
  check('phone', /^\+?[0-9\s\-()]{7,20}$/.test(data.phone), 'Please enter a valid mobile number.');
  check('program', Boolean(data.program), 'Please select a program.');
  check('learningMode', Boolean(data.learningMode), 'Please select a learning mode.');
  if (!valid) return;

  const ref = `NOR-${Math.floor(10000 + Math.random() * 90000)}`;
  const summaryLines = [
    `Hello ${data.fullName}!`,
    `Thank you for enquiring with *NŌRÉA – Learning & Development* (Learn • Express • Grow).`,
    '',
    `*Enquiry Reference:* ${ref}`,
    `*Student Name:* ${data.fullName}`,
    `*Email:* ${data.email}`,
    `*Mobile:* ${data.phone}`,
    `*Program:* ${data.program}`,
    `*Preferred Mode:* ${data.learningMode}`,
    data.message ? `*Message:* ${data.message}` : null,
    '',
    'Our team will connect with you shortly with batch timings and details!',
  ].filter((l) => l !== null);

  const plainText = summaryLines.join('\n').replace(/\*/g, '');
  const waText = summaryLines.join('\n');
  const digits = data.phone.replace(/\D/g, '');
  const userDigits = digits.length === 10 ? `91${digits}` : digits;
  const waTarget = SITE_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '') || userDigits;
  const waUrl = `https://wa.me/${waTarget}?text=${encodeURIComponent(waText)}`;

  const subject = `NŌRÉA Enquiry Confirmation (${ref}) – ${data.program}`;

  // 1) Trigger WhatsApp synchronously so browsers never block it
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  // 2) Send Email automatically in the background (no Gmail/Outlook window opens)
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending Email…';
  let statusText = `✓ Email sent to ${SITE_CONFIG.INSTITUTE_EMAIL} & confirmation to ${data.email}`;
  let popupTitle = 'Email Sent!';
  let popupMsg = `Your enquiry for ${data.program} has been emailed to ${SITE_CONFIG.INSTITUTE_EMAIL} and a confirmation copy is on its way to ${data.email}.`;
  let isWarn = false;

  if (SITE_CONFIG.INSTITUTE_EMAIL) {
    try {
      const endpoint = `https://formsubmit.co/ajax/${SITE_CONFIG.INSTITUTE_EMAIL.trim()}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _cc: data.email,
          _replyto: data.email,
          _autoresponse: plainText,
          _captcha: 'false',
          _template: 'table',
          Reference_ID: ref,
          Student_Name: data.fullName,
          Email: data.email,
          Phone: data.phone,
          Program: data.program,
          Preferred_Mode: data.learningMode,
          Message: data.message || '—',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === true || json.success === 'true')) {
        statusText = `✓ Email sent automatically to ${SITE_CONFIG.INSTITUTE_EMAIL} & ${data.email}`;
      } else {
        popupTitle = 'Email Activation / Domain Check';
        popupMsg = json.message
          ? `${json.message} Check ${SITE_CONFIG.INSTITUTE_EMAIL} (Inbox & Spam) and click Activate Form for this exact website URL.`
          : `FormSubmit returned status ${res.status}. Please check ${SITE_CONFIG.INSTITUTE_EMAIL} (including Spam) for the FormSubmit activation email for this domain.`;
        statusText = `⚠ ${popupMsg}`;
        isWarn = true;
      }
    } catch {
      popupTitle = 'Open on Live Website (HTTPS)';
      popupMsg = 'Automatic background emails work on your live https:// link (browsers block background form APIs on local file:// pages).';
      statusText = `⚠ ${popupMsg}`;
      isWarn = true;
    }
  }

  submitBtn.disabled = false;
  submitBtn.innerHTML = 'Submit &amp; Notify &rarr;';

  document.getElementById('successHeading').textContent = `Thank you, ${data.fullName}!`;
  document.getElementById('successDesc').innerHTML = `Your enquiry for <strong>${data.program}</strong> has been submitted.`;
  document.getElementById('refBadge').textContent = `✦ REF: ${ref}`;
  document.getElementById('waAction').href = waUrl;

  const noteEl = document.getElementById('emailStatusNote');
  noteEl.textContent = statusText;
  noteEl.classList.toggle('warn', isWarn);

  form.classList.add('hidden');
  successBox.classList.remove('hidden');
  openSentPopup(popupTitle, popupMsg, ref);
  showToast(isWarn ? popupTitle : 'Email sent successfully!');
});

// Smooth Scroll Reveal
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// =========================================================================
//  Colourful 2-Video Hero Slider (Personality Development Classroom Clips)
// =========================================================================
(function initHeroVideoSlider() {
  const slider = document.getElementById('heroVideoSlider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.video-slide'));
  const tabs = Array.from(slider.querySelectorAll('.video-tab'));
  const videos = slides.map((s) => s.querySelector('video'));
  const prevBtn = document.getElementById('videoPrevBtn');
  const nextBtn = document.getElementById('videoNextBtn');
  const playToggle = document.getElementById('videoPlayToggle');

  let currentIndex = 0;
  let isPaused = false;
  let fallbackTimer = null;

  function updatePlayToggleIcon(paused) {
    if (!playToggle) return;
    playToggle.innerHTML = paused ? '&#9654;' : '&#10074;&#10074;';
  }

  function scheduleNextFallback() {
    clearTimeout(fallbackTimer);
    if (isPaused) return;
    fallbackTimer = setTimeout(() => {
      goToSlide((currentIndex + 1) % slides.length);
    }, 12000);
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === currentIndex;
      slide.classList.toggle('active', active);
    });
    tabs.forEach((tab, i) => {
      const active = i === currentIndex;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    videos.forEach((vid, i) => {
      if (!vid) return;
      if (i === currentIndex) {
        vid.currentTime = 0;
        if (!isPaused) {
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
      }
    });

    scheduleNextFallback();
  }

  // Auto-advance when a video clip finishes playing
  videos.forEach((vid, idx) => {
    if (!vid) return;
    vid.addEventListener('ended', () => {
      if (idx === currentIndex && !isPaused) {
        goToSlide((currentIndex + 1) % slides.length);
      }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = Number(tab.dataset.target || 0);
      isPaused = false;
      updatePlayToggleIcon(false);
      goToSlide(target);
    });
  });

  if (playToggle) {
    playToggle.addEventListener('click', () => {
      const activeVid = videos[currentIndex];
      if (!activeVid) return;
      if (activeVid.paused) {
        isPaused = false;
        activeVid.play().catch(() => {});
        updatePlayToggleIcon(false);
        scheduleNextFallback();
      } else {
        isPaused = true;
        activeVid.pause();
        updatePlayToggleIcon(true);
        clearTimeout(fallbackTimer);
      }
    });
  }

  goToSlide(0);
})();

// =========================================================================
//  About NŌRÉA – Live Animated Video of Lady Mentor & Girl Student (about.jpg)
// =========================================================================
(function initAboutLivingVideo() {
  const img = document.getElementById('aboutSourceImg');
  const canvas = document.getElementById('aboutLiveCanvas');
  if (!img || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const COLS = 32;
  const ROWS = 36;

  // Soft rising steam particles above the coffee mug on the table
  const steamWisps = Array.from({ length: 14 }, (_, i) => ({
    phase: (i / 14) * Math.PI * 2,
    speed: 0.45 + (i % 4) * 0.12,
    drift: (i % 2 === 0 ? 1 : -1) * (0.004 + (i % 3) * 0.002),
    size: 10 + (i % 5) * 4,
  }));

  // Smooth Gaussian radial falloff influence
  function radial(nx, ny, cx, cy, rx, ry) {
    const dx = (nx - cx) / rx;
    const dy = (ny - cy) / ry;
    const d2 = dx * dx + dy * dy;
    if (d2 > 3.2) return 0;
    return Math.exp(-d2 * 1.45);
  }

  // Compute organic displacement (dx, dy) in normalized coordinates for any point (nx, ny)
  function getDisplacement(nx, ny, t) {
    let dx = 0;
    let dy = 0;

    // Conversation turn cycle: lady explains politely, girl nods & responds warmly
    const ladySpeakingEnv = 0.55 + 0.45 * Math.sin(t * 0.85);
    const girlSpeakingEnv = 0.55 + 0.45 * Math.sin(t * 0.85 - 2.2);

    // 1. Lady's Head (left, x=0.27, y=0.41): warm polite nodding & gentle tilt toward student
    const ladyHeadW = radial(nx, ny, 0.275, 0.415, 0.135, 0.125);
    if (ladyHeadW > 0) {
      const nodY = Math.sin(t * 2.4) * 0.0042 * ladySpeakingEnv + Math.sin(t * 1.1) * 0.0025;
      const tiltX = Math.sin(t * 1.45) * 0.0038;
      dx += tiltX * ladyHeadW;
      dy += nodY * ladyHeadW;
    }

    // 2. Lady's Mouth / Lower Jaw (x=0.352, y=0.466): subtle natural speaking syllables
    const ladyJawW = radial(nx, ny, 0.352, 0.468, 0.032, 0.026);
    if (ladyJawW > 0) {
      const syllable =
        (Math.sin(t * 9.5) * 0.5 + Math.sin(t * 14.2) * 0.35 + Math.cos(t * 6.3) * 0.25 + 0.4) *
        ladySpeakingEnv;
      dy += Math.max(0, syllable) * 0.0055 * ladyJawW;
      dx += Math.max(0, syllable) * 0.0018 * ladyJawW;
    }

    // 3. Lady's Torso / Shoulders (x=0.23, y=0.60): natural breathing & posture shift
    const ladyTorsoW = radial(nx, ny, 0.23, 0.6, 0.18, 0.16);
    if (ladyTorsoW > 0) {
      dy += Math.sin(t * 1.35) * 0.0028 * ladyTorsoW;
      dx += Math.sin(t * 0.9) * 0.0022 * ladyTorsoW;
    }

    // 4. Lady's Hands & Forearm on Notebook (x=0.42, y=0.72): polite explaining gesture
    const ladyHandW = radial(nx, ny, 0.425, 0.72, 0.11, 0.065);
    if (ladyHandW > 0) {
      const gesture = Math.sin(t * 2.8) * 0.5 + Math.sin(t * 1.7) * 0.5;
      dx += gesture * 0.0052 * ladySpeakingEnv * ladyHandW;
      dy += Math.cos(t * 2.6) * 0.0045 * ladySpeakingEnv * ladyHandW;
    }

    // 5. Girl's Head (right, x=0.775, y=0.43): attentive nodding & warm smile
    const girlHeadW = radial(nx, ny, 0.775, 0.43, 0.125, 0.115);
    if (girlHeadW > 0) {
      const listenNod = Math.sin(t * 2.7 - 0.9) * 0.0046;
      const leanX = -Math.sin(t * 1.2) * 0.0034;
      dx += leanX * girlHeadW;
      dy += listenNod * girlHeadW;
    }

    // 6. Girl's Mouth / Jaw (x=0.720, y=0.476): gentle speaking / smiling response
    const girlJawW = radial(nx, ny, 0.72, 0.476, 0.03, 0.024);
    if (girlJawW > 0) {
      const replySyllable =
        (Math.sin(t * 8.8 - 1.1) * 0.5 + Math.cos(t * 12.6) * 0.35 + 0.35) * girlSpeakingEnv;
      dy += Math.max(0, replySyllable) * 0.0048 * girlJawW;
      dx -= Math.max(0, replySyllable) * 0.0014 * girlJawW;
    }

    // 7. Girl's Shoulders & Right Hand on Table (x=0.615, y=0.68)
    const girlTorsoW = radial(nx, ny, 0.78, 0.61, 0.17, 0.15);
    if (girlTorsoW > 0) {
      dy += Math.sin(t * 1.45 - 0.6) * 0.0026 * girlTorsoW;
    }
    const girlHandW = radial(nx, ny, 0.615, 0.68, 0.065, 0.055);
    if (girlHandW > 0) {
      dy += Math.sin(t * 2.5 - 1.2) * 0.004 * girlHandW;
      dx -= Math.cos(t * 2.1) * 0.0032 * girlHandW;
    }

    // 8. Olive Plant Leaves in Background (x=0.44, y=0.33): subtle breeze sway
    const plantW = radial(nx, ny, 0.44, 0.33, 0.13, 0.11);
    if (plantW > 0) {
      dx += Math.sin(t * 1.6 + ny * 8) * 0.0024 * plantW;
    }

    return { dx, dy };
  }

  let gridX = new Float32Array((COLS + 1) * (ROWS + 1));
  let gridY = new Float32Array((COLS + 1) * (ROWS + 1));

  function renderFrame(now) {
    const t = now * 0.001;
    const cw = canvas.clientWidth || 520;
    const ch = canvas.clientHeight || 585;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cw * dpr);
    const targetH = Math.round(ch * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const iw = img.naturalWidth || 900;
    const ih = img.naturalHeight || 1200;

    // Cover crop calculation (matching object-fit: cover + subtle cinematic camera pan/zoom)
    const camZoom = 1.035 + Math.sin(t * 0.45) * 0.015;
    const camPanX = Math.sin(t * 0.35) * 0.01;
    const camPanY = Math.cos(t * 0.3) * 0.006;

    const canvasAspect = targetW / targetH;
    const imgAspect = iw / ih;
    let cropW = iw;
    let cropH = ih;
    if (imgAspect > canvasAspect) {
      cropW = ih * canvasAspect;
    } else {
      cropH = iw / canvasAspect;
    }
    cropW /= camZoom;
    cropH /= camZoom;
    const cropX = (iw - cropW) * 0.5 + camPanX * iw;
    const cropY = (ih - cropH) * 0.5 + camPanY * ih;

    // Compute deformed vertex grid
    for (let r = 0; r <= ROWS; r++) {
      const ny = r / ROWS;
      for (let c = 0; c <= COLS; c++) {
        const nx = c / COLS;
        const idx = r * (COLS + 1) + c;
        // Pin outer border vertices so edges never pull inward
        const edgeFade =
          Math.min(nx * 8, (1 - nx) * 8, 1) * Math.min(ny * 8, (1 - ny) * 8, 1);
        const disp = edgeFade > 0 ? getDisplacement(nx, ny, t) : { dx: 0, dy: 0 };
        gridX[idx] = (nx + disp.dx * edgeFade) * targetW;
        gridY[idx] = (ny + disp.dy * edgeFade) * targetH;
      }
    }

    ctx.clearRect(0, 0, targetW, targetH);

    // Draw seamless warped grid cells using hardware-accelerated ctx.drawImage
    const cellSrcW = cropW / COLS;
    const cellSrcH = cropH / ROWS;
    const overlap = 1.15 * dpr;

    for (let r = 0; r < ROWS; r++) {
      const sy = cropY + r * cellSrcH;
      for (let c = 0; c < COLS; c++) {
        const sx = cropX + c * cellSrcW;
        const i00 = r * (COLS + 1) + c;
        const i10 = i00 + 1;
        const i01 = (r + 1) * (COLS + 1) + c;
        const i11 = i01 + 1;

        const minX = Math.min(gridX[i00], gridX[i01]);
        const maxX = Math.max(gridX[i10], gridX[i11]);
        const minY = Math.min(gridY[i00], gridY[i10]);
        const maxY = Math.max(gridY[i01], gridY[i11]);

        ctx.drawImage(
          img,
          sx,
          sy,
          cellSrcW,
          cellSrcH,
          minX - overlap * 0.5,
          minY - overlap * 0.5,
          maxX - minX + overlap,
          maxY - minY + overlap
        );
      }
    }

    // Soft warm sunlight shimmer from the right window
    const sunAlpha = 0.08 + 0.04 * Math.sin(t * 0.9);
    const sunGrad = ctx.createRadialGradient(
      targetW * 0.92,
      targetH * 0.22,
      targetW * 0.04,
      targetW * 0.72,
      targetH * 0.42,
      targetW * 0.75
    );
    sunGrad.addColorStop(0, `rgba(255, 244, 214, ${sunAlpha * 1.6})`);
    sunGrad.addColorStop(0.5, `rgba(255, 237, 196, ${sunAlpha * 0.7})`);
    sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, targetW, targetH);

    // Subtle rising steam from the hot cup on the wooden table (x ≈ 0.672, y ≈ 0.75)
    ctx.save();
    steamWisps.forEach((w) => {
      const cycle = ((t * w.speed + w.phase) % (Math.PI * 2)) / (Math.PI * 2);
      const alpha = Math.sin(cycle * Math.PI) * 0.16;
      const wx = targetW * (0.672 + Math.sin(cycle * Math.PI * 2 + w.phase) * 0.014 + w.drift * cycle * 6);
      const wy = targetH * (0.755 - cycle * 0.11);
      const rad = w.size * dpr * (0.7 + cycle * 1.1);
      const g = ctx.createRadialGradient(wx, wy, 0, wx, wy, rad);
      g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(wx, wy, rad, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    requestAnimationFrame(renderFrame);
  }

  function start() {
    requestAnimationFrame(renderFrame);
  }

  if (img.complete && img.naturalWidth > 0) {
    start();
  } else {
    img.addEventListener('load', start, { once: true });
  }
})();
