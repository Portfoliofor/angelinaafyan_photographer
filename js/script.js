// ==================== CONFIGURATION ====================
// YOUR GOOGLE SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwThYhN8-ZT_BsUwklbJoAaI8VXUbxLYTtIqH_j6cYkUOgdcQw-pQqHXPvySREI68ntxA/exec'; 

// ==================== LANGUAGE SWITCHER ====================
const btnEn = document.getElementById('btn-en');
const btnAm = document.getElementById('btn-am');
const translatableElements = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
    if (lang === 'en') {
        btnEn.classList.add('active');
        btnAm.classList.remove('active');
    } else {
        btnAm.classList.add('active');
        btnEn.classList.remove('active');
    }

    translatableElements.forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if (newText) el.textContent = newText;
    });
}

btnEn.addEventListener('click', () => setLanguage('en'));
btnAm.addEventListener('click', () => setLanguage('am'));

// ==================== CHAT TOGGLE ====================
const chatToggle = document.getElementById('chatToggle');
const contactCard = document.getElementById('contactCard');

chatToggle.addEventListener('click', () => {
    contactCard.classList.toggle('open');
    const icon = chatToggle.querySelector('i');
    if (contactCard.classList.contains('open')) {
        icon.classList.remove('fa-comment-dots');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-comment-dots');
    }
});

document.addEventListener('click', (e) => {
    if (!contactCard.contains(e.target) && !chatToggle.contains(e.target)) {
        contactCard.classList.remove('open');
        chatToggle.querySelector('i').classList.remove('fa-times');
        chatToggle.querySelector('i').classList.add('fa-comment-dots');
    }
});

// ==================== BOOKING MODAL LOGIC ====================
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close-modal');
const serviceInput = document.getElementById('serviceInput');
const bookingButtons = document.querySelectorAll('.book-trigger');
const bookingForm = document.getElementById('bookingForm');
const spinner = document.getElementById('spinner');

// Open Modal
bookingButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const serviceName = this.closest('.service-ticket').querySelector('.ticket-category').textContent;
        serviceInput.value = serviceName;
        modal.classList.add('active');
    });
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('active');
    }
});

// Handle Form Submission to Google Sheets
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    spinner.style.display = 'inline';
    
    // Prepare data
    const formData = new FormData(this);
    
    // Send to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        alert("Thank you! Your booking request has been sent.");
        modal.classList.remove('active');
        bookingForm.reset();
        spinner.style.display = 'none';
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("There was an error sending your request. Please try WhatsApp.");
        spinner.style.display = 'none';
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
