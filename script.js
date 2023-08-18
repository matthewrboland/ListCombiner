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
        const selectedProblems = getSelectedValues(problemSelect);
        const selectedSolutions = getSelectedValues(solutionSelect);
        
        if (selectedProblems.length === 0 || selectedSolutions.length === 0) {
            resultDiv.textContent = 'Please select at least one problem and one solution.';
            return;
        }
        
        const randomProblem = selectedProblems[Math.floor(Math.random() * selectedProblems.length)];
        const randomSolution = selectedSolutions[Math.floor(Math.random() * selectedSolutions.length)];
        
        resultDiv.textContent = randomProblem + ' - ' + randomSolution;
    });

    function getSelectedValues(selectElement) {
        const selectedValues = [];
        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].selected) {
                selectedValues.push(selectElement.options[i].value);
            }
        }
        return selectedValues;
    }
});
