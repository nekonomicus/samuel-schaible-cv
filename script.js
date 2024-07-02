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
        const response = await fetch('https://samuel-schaible-backend.vercel.app/', {
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
        loadingAnimation.classList.add('hidden');
        askButton.disabled = false;
    }
}

// Smooth scrolling code remains the same
