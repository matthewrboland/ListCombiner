document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-btn');
    const problemSelect = document.getElementById('problem-select');
    const solutionSelect = document.getElementById('solution-select');
    const customProblemInput = document.getElementById('custom-problem');
    const customSolutionInput = document.getElementById('custom-solution');
    const resultDiv = document.getElementById('result');

    // Load problems from "problems.txt"
    fetch('problems.txt')
        .then(response => response.text())
        .then(data => {
            const problems = data.split('\n');
            populateSelect(problemSelect, problems);
        });

    // Load solutions from "solutions.txt"
    fetch('solutions.txt')
        .then(response => response.text())
        .then(data => {
            const solutions = data.split('\n');
            populateSelect(solutionSelect, solutions);
        });

    function populateSelect(selectElement, options) {
        for (const option of options) {
            if (option.trim() !== '') {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                selectElement.appendChild(optionElement);
            }
        }
    }

    generateButton.addEventListener('click', function() {
        const selectedProblem = problemSelect.value || customProblemInput.value;
        const selectedSolution = solutionSelect.value || customSolutionInput.value;
        
        if (!selectedProblem || !selectedSolution) {
            resultDiv.textContent = 'Please select or enter both a problem and a solution.';
            return;
        }
        
        resultDiv.textContent = selectedProblem + ' - ' + selectedSolution;
    });
});
