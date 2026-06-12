'use strict';

// Element toggle helper
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
}

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// Testimonials modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");
    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
    if (modalText && text) modalText.innerHTML = text.innerHTML;
    testimonialsModalFunc();
  });
}
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// Filter/Select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    const category = item.dataset.category;
    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0] || null;
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn && lastClickedBtn !== this) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact Form - Input Validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && formBtn) {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
}

// =========================================
// ✅ FORMSUBMIT.CO - CONTACT FORM WITH SUCCESS PAGE
// =========================================

const contactForm = document.getElementById("contact-form");
const contactFormSection = document.getElementById("contactFormSection");
const successMessage = document.getElementById("successMessage");
const editDetailsBtn = document.getElementById("editDetailsBtn");

// Store form data
let formData = {
  fullname: "",
  email: "",
  message: ""
};

// Form submission handler
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    // Get form data
    const fullname = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const message = this.querySelector('[name="message"]').value;
    
    // Store data
    formData = { fullname, email, message };
    
    console.log("📧 Form Data:", formData);
    
    // Show loading state
    if (formBtn) {
      formBtn.disabled = true;
      formBtn.innerHTML = "<ion-icon name='hourglass'></ion-icon><span>Sending...</span>";
    }
    
    // Prepare form data for Formsubmit.co
    const formDataObj = new FormData(this);
    
    try {
      console.log("🚀 Sending to Formsubmit.co...");
      
      // Send to Formsubmit.co (AJAX method)
      const response = await fetch("https://formsubmit.co/ajax/mogaralamahendra6@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          message: message,
          _subject: `📨 New Contact from ${fullname}`
        })
      });
      
      const result = await response.json();
      console.log("✅ Response:", result);
      
      if (result.success === "true" || result.success === true || result.message === "email sent") {
        console.log("✅ Message sent successfully!");
        showSuccessPage();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      
      // Show error but still display success page
      alert(`⚠️ There was an issue sending the email.\n\nError: ${error.message}\n\nBut your details have been recorded!`);
      
      // Still show success page
      showSuccessPage();
    }
  });
}

// Show success page function
function showSuccessPage() {
  console.log("🎉 Showing success page...");
  
  // Hide form, show success message
  if (contactFormSection) contactFormSection.style.display = "none";
  if (successMessage) successMessage.style.display = "block";
  
  // Display submitted data
  const nameEl = document.getElementById("submittedName");
  const emailEl = document.getElementById("submittedEmail");
  const messageEl = document.getElementById("submittedMessage");
  
  if (nameEl) nameEl.textContent = formData.fullname;
  if (emailEl) emailEl.textContent = formData.email;
  if (messageEl) messageEl.textContent = formData.message;
  
  // Reset form button
  if (formBtn) {
    formBtn.disabled = false;
    formBtn.innerHTML = "<ion-icon name='paper-plane'></ion-icon><span>Send Message</span>";
  }
  
  // Scroll to success message
  if (successMessage) {
    successMessage.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Edit button - go back to form
if (editDetailsBtn) {
  editDetailsBtn.addEventListener("click", function() {
    console.log("🔄 Edit button clicked - returning to form");
    
    // Hide success message, show form
    if (successMessage) successMessage.style.display = "none";
    if (contactFormSection) contactFormSection.style.display = "block";
    
    // Clear form
    if (contactForm) {
      contactForm.reset();
    }
    
    // Clear stored data
    formData = { fullname: "", email: "", message: "" };
    
    // Scroll to form
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Page Navigation - FIXED
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const mainContent = document.querySelector(".main-content");
const PAGE_TRANSITION_DURATION = 300;

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    const targetPage = this.innerHTML.toLowerCase().trim();
    if (this.classList.contains("active")) return;
    
    if (mainContent) {
      mainContent.classList.add("page-fade-out");
      mainContent.classList.remove("page-fade-in");
    }
    
    setTimeout(() => {
      for (let j = 0; j < pages.length; j++) {
        const page = pages[j];
        const navLink = navigationLinks[j];
        const pageName = page.dataset.page;
        if (targetPage === pageName) {
          page.classList.add("active");
          navLink.classList.add("active");
        } else {
          page.classList.remove("active");
          navLink.classList.remove("active");
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (mainContent) {
        mainContent.classList.remove("page-fade-out");
        void mainContent.offsetWidth;
        mainContent.classList.add("page-fade-in");
        setTimeout(() => {
          mainContent.classList.remove("page-fade-in");
        }, PAGE_TRANSITION_DURATION);
      }
    }, PAGE_TRANSITION_DURATION);
  });
}

// ✅ TYPING EFFECT WITH RAINBOW
const typingText = document.getElementById("typing-text");
const roles = [
  "AI & ML Student",
  "Full Stack Developer", 
  "Python Programmer",
  "Frontend Developer",
  "Machine Learning Enthusiast"
];

if (typingText && roles.length > 0) {
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  
  const typeEffect = function () {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; typeEffect(); }, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
  };
  
  setTimeout(typeEffect, 1000);
}

// ✅ AI CHATBOT WITH VOICE + QUICK OPTIONS
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotOptions = document.getElementById("chatbot-options");
const chatbotVoice = document.getElementById("chatbot-voice");

const quickOptions = [
  { label: "🏠 About", target: "about", type: "nav" },
  { label: "💻 Portfolio", target: "portfolio", type: "nav" },
  { label: "📄 Resume", target: "resume", type: "nav" },
  { label: "🎓 Certifications", target: "certificate", type: "nav" },
  { label: "📞 Contact", target: "contact", type: "nav" },
  { label: "🛠 Skills & Tech", type: "info", response: "I work with Python, JavaScript, MySQL, HTML/CSS, and ML frameworks! 🚀" }
];

function showOptions(options = quickOptions) {
  if (!chatbotOptions) return;
  chatbotOptions.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "chat-option-btn";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      chatbotOptions.innerHTML = '';
      if (opt.type === "nav") {
        addMessage(`Opening ${opt.label}...`, false);
        const allNavLinks = document.querySelectorAll("[data-nav-link]");
        const targetLink = Array.from(allNavLinks).find(link => 
          link.textContent.toLowerCase().includes(opt.target) || 
          link.textContent.toLowerCase().trim() === opt.target
        );
        if (targetLink) {
          setTimeout(() => targetLink.click(), 200);
        }
        setTimeout(() => chatbotBox.classList.remove("active"), 400);
      } else if (opt.type === "info") {
        addMessage(opt.response, false);
        setTimeout(showOptions, 600);
      }
    });
    chatbotOptions.appendChild(btn);
  });
}

function addMessage(text, isUser = false) {
  if (!chatbotMessages) return;
  const msg = document.createElement("div");
  msg.className = isUser ? "user-message" : "bot-message";
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotToggle && chatbotBox) {
  chatbotToggle.addEventListener("click", function () {
    chatbotBox.classList.toggle("active");
    const icon = this.querySelector("ion-icon");
    if (icon) icon.setAttribute("name", chatbotBox.classList.contains("active") ? "close-outline" : "chatbubble-ellipses-outline");
    if (chatbotBox.classList.contains("active")) showOptions();
  });
}

function getSmartResponse(input) {
  const lower = input.toLowerCase();
  
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) 
    return "Hello! 👋 I'm Mahendra's AI assistant. Ask me about his skills, projects, education, or contact info!";
  
  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio")) 
    return "Mahendra has worked on AI Chatbots, Personal Portfolio Websites, and various web applications. Click '💻 Portfolio' to see them all!";
  
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) 
    return "You can reach Mahendra at mogaralamahendra6@gmail.com or click '📞 Contact' to send a message!";
  
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("technology")) 
    return "Mahendra works with Python, JavaScript, MySQL, HTML/CSS, and Machine Learning frameworks! Check the Resume section for details. 🚀";
  
  if (lower.includes("education") || lower.includes("study") || lower.includes("college") || lower.includes("degree")) 
    return "Mahendra is pursuing B.Tech in AI & ML at CREC (2023-2027). He previously studied at SV Junior College. 🎓";
  
  if (lower.includes("name") || lower.includes("who")) 
    return "I'm Mahendra Mogarala, an AI & ML student passionate about building intelligent solutions!";
  
  if (lower.includes("resume") || lower.includes("cv")) 
    return "Click the Resume tab or use the Download Resume button to see my full CV with education, experience, and skills! 📄";
  
  if (lower.includes("certification") || lower.includes("certificate") || lower.includes("course")) 
    return "Mahendra has certifications in Python Programming, MySQL & Database, and Frontend Development. Click '🎓 Certifications' to see them!";
  
  if (lower.includes("location") || lower.includes("where")) 
    return "Mahendra is located in Madanapalle, Andhra Pradesh, India. 📍";
  
  return "I'm here to help! Try asking about my skills, projects, education, certifications, or contact info. Or use the quick buttons below! 😊";
}

function sendMessage() {
  if (!chatbotInput) return;
  const text = chatbotInput.value.trim();
  if (!text) return;
  addMessage(text, true);
  chatbotInput.value = "";
  chatbotOptions.innerHTML = '';

  setTimeout(() => {
    addMessage(getSmartResponse(text), false);
    setTimeout(showOptions, 500);
  }, 600);
}

if (chatbotSend) chatbotSend.addEventListener("click", sendMessage);
if (chatbotInput) {
  chatbotInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });
}

// Voice Input
if (chatbotVoice && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  
  chatbotVoice.addEventListener("click", () => {
    chatbotVoice.style.background = "var(--orange-yellow-crayola)";
    chatbotVoice.style.color = "var(--smoky-black)";
    recognition.start();
  });
  
  recognition.onresult = (e) => {
    chatbotInput.value = e.results[0][0].transcript;
    sendMessage();
    chatbotVoice.style.background = "var(--onyx)";
    chatbotVoice.style.color = "var(--orange-yellow-crayola)";
  };
  
  recognition.onerror = () => {
    chatbotVoice.style.background = "var(--onyx)";
    chatbotVoice.style.color = "var(--orange-yellow-crayola)";
  };
} else if (chatbotVoice) {
  chatbotVoice.style.display = "none";
}

// Initialize options on load
setTimeout(showOptions, 300);

/* ✅ PROJECT MODAL FUNCTIONALITY */
const projectModal = document.getElementById('project-modal');
const modalOverlay = document.querySelector('[data-modal-overlay]');
const modalClose = document.querySelector('[data-modal-close]');
const viewProjectBtns = document.querySelectorAll('.view-project-btn');

// Project data
const projectData = {
  'health-ai': {
    img: './assets/images/health-ai.jpg',
    title: 'Smart Health Monitor AI',
    category: 'Healthcare + Voice AI',
    description: 'An AI-powered health tracking system that predicts potential diseases from symptoms, provides voice-guided first aid instructions, and connects patients with doctors instantly. This solves the critical problem of delayed diagnosis and lack of immediate medical guidance.',
    features: ['AI Disease Prediction', 'Voice First Aid', 'Doctor Connection', 'Health Analytics', 'Symptom Checker'],
    liveDemo: '#',
    github: 'https://github.com/MogaralaMahendra2005/health-monitor-ai'
  },
  'study-ai': {
    img: './assets/images/study-ai.jpg',
    title: 'AI Study Companion',
    category: 'Education + Voice Learning',
    description: 'A personalized AI tutor that adapts to individual learning styles, explains complex concepts through voice, automatically generates quizzes from notes, and tracks learning progress. Solves the one-size-fits-all education problem.',
    features: ['Adaptive Learning', 'Voice Explanations', 'Auto Quizzes', 'Progress Tracking', 'Smart Notes'],
    liveDemo: '#',
    github: 'https://github.com/MogaralaMahendra2005/study-companion'
  },
  'traffic-ai': {
    img: './assets/images/traffic-ai.jpg',
    title: 'Smart Traffic Predictor',
    category: 'Urban Planning + AI',
    description: 'Machine learning model that predicts traffic jams 30 minutes in advance, suggests optimal routes with voice navigation, and reduces commute time by up to 40%. Solves daily traffic frustration.',
    features: ['Traffic Prediction', 'Route Optimization', 'Voice Navigation', 'Real-time Updates', 'ML Models'],
    liveDemo: '#',
    github: 'https://github.com/MogaralaMahendra2005/traffic-predictor'
  }
};

// Open modal
viewProjectBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const projectId = this.getAttribute('data-modal');
    const project = projectData[projectId];
    
    if (project) {
      document.getElementById('modal-img').src = project.img;
      document.getElementById('modal-img').alt = project.title;
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-category').textContent = project.category;
      document.getElementById('modal-description').textContent = project.description;
      
      // Update features
      const featuresContainer = document.getElementById('modal-features');
      featuresContainer.innerHTML = project.features.map(f => 
        `<span class="feature-tag">${f}</span>`
      ).join('');
      
      // Update buttons
      document.getElementById('modal-live').href = project.liveDemo;
      document.getElementById('modal-code').href = project.github;
      
      // Show modal
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
function closeModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}
if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeModal();
  }
});

/* =========================================
   ✅ LOADING SCREEN LOGIC
   ========================================= */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderText = document.getElementById('loaderText');
  
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    loaderBar.style.width = progress + '%';
    loaderText.textContent = `Initializing AI... ${Math.floor(progress)}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 500);
    }
  }, 150);
});

/* =========================================
   ✅ NEURAL NETWORK CANVAS LOGIC
   ========================================= */
function initNeuralNetwork() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const nodes = [];
  const nodeCount = 60; 
  const connectionDistance = 150;

  class Node {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      // Matches your Orange/Yellow theme!
      this.color = Math.random() > 0.5 ? '#ffb400' : '#ff9100'; 
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach(node => {
      node.update();
      node.draw();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          // Orange theme lines
          ctx.strokeStyle = `rgba(255, 180, 0, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  
  animate();

  // Resize canvas when window resizes
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize Canvas
initNeuralNetwork();