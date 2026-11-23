// =========================================================================
//  NŌRÉA – Notification Configuration (edit these two values for your site)
// =========================================================================
const SITE_CONFIG = {
  // Put your institute email here (FormSubmit will send emails + student auto-reply)
  INSTITUTE_EMAIL: 'eurekageekstech@gmail.com',
  // Put your institute WhatsApp number with country code, digits only (e.g. '919876543210')
  WHATSAPP_NUMBER: '',
};

const PROGRAMS = [
  {
    id: 'spoken-english',
    title: 'Spoken English & Communication',
    badge: 'Most Popular',
    gradClass: 'grad-indigo',
    tagClass: 'tag-indigo',
    image: 'images/program-spoken-english.jpg',
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
  <article class="card program-card reveal">
    <div class="prog-media">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
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
    <img src="${p.image}" alt="${p.title}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:18px;margin-bottom:20px;" />
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
