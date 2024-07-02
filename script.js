
async function askQuestion() {
    const question = document.getElementById('user-question').value;
    const answerContainer = document.getElementById('answer-container');
    const loadingAnimation = document.getElementById('loading-animation');
    const askButton = document.getElementById('ask-button');
    
    if (!question.trim()) {
        answerContainer.innerHTML = 'Please enter a question.';
        return;
    }
    
    answerContainer.innerHTML = '';
    loadingAnimation.classList.remove('hidden');
    askButton.disabled = true;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY_HERE' // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: [
                    { role: 'system', content: 'You are an AI assistant that answers questions about Samuel Schaible based solely on the information provided on his website. Do not make up any information that is not explicitly stated on the website.' },
                    { role: 'user', content: question }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const answer = data.choices[0].message.content;
        
        answerContainer.innerHTML = answer;
    } catch (error) {
        console.error('Error:', error);
        answerContainer.innerHTML = 'Sorry, there was an error processing your request. Please try again later.';
    } finally {
        loadingAnimation.classList.add('hidden');
        askButton.disabled = false;
    }
}

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
