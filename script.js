// ChatGPT integration
async function askQuestion() {
    const question = document.getElementById('user-question').value;
    const answerContainer = document.getElementById('answer-container');
    const askButton = document.getElementById('ask-button');
    
    if (!question.trim()) {
        answerContainer.innerHTML = 'Please enter a question.';
        return;
    }
    
    answerContainer.innerHTML = 'Thinking...';
    askButton.disabled = true;
    
    try {
        const response = await fetch('https://samuel-schaible-backend-cjqeb6ist-samuel-schaibles-projects.vercel.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        answerContainer.innerHTML = data.answer;
    } catch (error) {
        console.error('Error:', error);
        answerContainer.innerHTML = 'Sorry, there was an error processing your request. Please try again later.';
    } finally {
        askButton.disabled = false;
    }
}

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
}

darkModeToggle.addEventListener('click', toggleDarkMode);

// Check for saved dark mode preference
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
}

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onscroll = scrollFunction;
backToTopButton.addEventListener('click', scrollToTop);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
scrollFunction();
