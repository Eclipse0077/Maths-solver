function displayHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    const problems = JSON.parse(localStorage.getItem('problems')) || [];

    problems.forEach((problem, index) => {
        const card = document.createElement('div');
        card.classList.add('problem-card');

        card.innerHTML = `
            <h3>${problem.operation} Problem</h3>
            <p>Expression: ${problem.expression}</p>
            <p>Result: ${problem.result}</p>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;

        historyList.appendChild(card);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            problems.splice(index, 1);
            localStorage.setItem('problems', JSON.stringify(problems));
            displayHistory();
        });
    });
}

document.getElementById('searchPageButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

displayHistory();
