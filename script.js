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
        console.log('Sending request to backend...');
        const response = await fetch('https://samuel-schaible-backend.vercel.app/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        answerContainer.innerHTML = data.answer || 'No answer received from the server.';
    } catch (error) {
        console.error('Error:', error);
        answerContainer.innerHTML = `Error: ${error.message}. Please try again later.`;
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
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 60; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Initialize
scrollFunction();

// Event listener for the ask button
document.getElementById('ask-button').addEventListener('click', askQuestion);

// Event listener for pressing Enter in the question input
document.getElementById('user-question').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        askQuestion();
    }
});
