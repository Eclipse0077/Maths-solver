
let problems = [];


function convertToASCII(expression) {
    // Replace '^' with '%5E'
    expression = expression.replace(/\^/g, '%5E');
    
    // Replace '(' with '%28'
    expression = expression.replace(/\(/g, '%28');
    
    // Replace ')' with '%29'
    expression = expression.replace(/\)/g, '%29');

    // Replace '+' with '%2B'
    expression = expression.replace(/\+/g, '%2B');

    // conversion logic here
    
    return encodeURIComponent(expression);
    
}


document.getElementById('searchButton').addEventListener('click', async () => {
    const operation = document.getElementById('categorySelect').value;
    const expression = convertToASCII(document.getElementById('problemInput').value);
    console.log("expression is"+ expression);
    console.log("operation is"+ operation);
    const apiUrl = `https://newton.now.sh/api/v2/${operation}/${expression}`;
 
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        
        const result = data.result;

        // Update the solution card with the new problem
        const solutionCard = document.getElementById('solutionCard');
        solutionCard.innerHTML = `
            <div class="problem-card">
                <h3>${operation} Problem</h3>
                <p>Expression: ${expression}</p>
                <p>Result: ${result}</p>
            </div>
        `;
    } catch (error) {
        console.error('An error occurred:', error);
        
    }
    console.log('expression');
});
document.getElementById('historyButton').addEventListener('click', () => {
    window.location.href = 'history.html';
});


function saveToLocalStorage() {
    localStorage.setItem('problems', JSON.stringify(problems));
}

document.getElementById('searchButton').addEventListener('click', () => {
  const operation = document.getElementById('categorySelect').value;
 const expression = document.getElementById('problemInput').value;
    const result = data.result; 
    // result from the API

    problems.push({ operation, expression, result });
    saveToLocalStorage();
    
  //  Update the solution card with the new problem
    const solutionCard = document.getElementById('solutionCard');
    solutionCard.innerHTML = `
        <div class="problem-card">
           <h3>${operation} Problem</h3>
            <p>Expression: ${expression}</p>
            <p>Result: ${result}</p>
        </div>
    `;
});

