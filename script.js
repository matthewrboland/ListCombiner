document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-btn');
    const problemCheckboxes = document.getElementById('problem-checkboxes');
    const solutionCheckboxes = document.getElementById('solution-checkboxes');
    const customProblemInput = document.getElementById('custom-problem');
    const customSolutionInput = document.getElementById('custom-solution');
    const addCustomProblemsButton = document.getElementById('add-custom-problems');
    const addCustomSolutionsButton = document.getElementById('add-custom-solutions');
    const selectAllProblemsButton = document.getElementById('select-all-problems');
    const selectAllSolutionsButton = document.getElementById('select-all-solutions');
    const resultDiv = document.getElementById('result');

    // Load problems from "problems.txt"
    fetch('problems.txt')
        .then(response => response.text())
        .then(data => {
            const problems = data.split('\n');
            populateCheckboxes(problemCheckboxes, problems);
        });

    // Load solutions from "solutions.txt"
    fetch('solutions.txt')
        .then(response => response.text())
        .then(data => {
            const solutions = data.split('\n');
            populateCheckboxes(solutionCheckboxes, solutions);
        });

    function populateCheckboxes(checkboxesContainer, options) {
        for (const option of options) {
            if (option.trim() !== '') {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = option;
                checkbox.id = option;
                
                const label = document.createElement('label');
                label.textContent = option;
                label.setAttribute('for', option);
                
                checkboxesContainer.appendChild(checkbox);
                checkboxesContainer.appendChild(label);
                checkboxesContainer.appendChild(document.createElement('br'));
            }
        }
    }

    generateButton.addEventListener('click', function() {
        const selectedProblems = getSelectedValues(problemCheckboxes);
        const selectedSolutions = getSelectedValues(solutionCheckboxes);
        
        if (selectedProblems.length === 0 || selectedSolutions.length === 0) {
            resultDiv.textContent = 'Please select at least one problem and one solution.';
            return;
        }
        
        const randomProblem = selectedProblems[Math.floor(Math.random() * selectedProblems.length)];
        const randomSolution = selectedSolutions[Math.floor(Math.random() * selectedSolutions.length)];
        
        resultDiv.textContent = randomProblem + ' - ' + randomSolution;
    });

    addCustomProblemsButton.addEventListener('click', function() {
        const customProblems = customProblemInput.value.trim().split('\n');
        populateCheckboxes(problemCheckboxes, customProblems);
        customProblemInput.value = '';
    });

    addCustomSolutionsButton.addEventListener('click', function() {
        const customSolutions = customSolutionInput.value.trim().split('\n');
        populateCheckboxes(solutionCheckboxes, customSolutions);
        customSolutionInput.value = '';
    });

    selectAllProblemsButton.addEventListener('click', function() {
        selectAllCheckboxes(problemCheckboxes);
    });

    selectAllSolutionsButton.addEventListener('click', function() {
        selectAllCheckboxes(solutionCheckboxes);
    });

    function getSelectedValues(checkboxesContainer) {
        const selectedValues = [];
        const checkboxes = checkboxesContainer.querySelectorAll('input[type="checkbox"]');
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                selectedValues.push(checkbox.value);
            }
        }
        return selectedValues;
    }

    function selectAllCheckboxes(checkboxesContainer) {
        const checkboxes = checkboxesContainer.querySelectorAll('input[type="checkbox"]');
        for (const checkbox of checkboxes) {
            checkbox.checked = true;
        }
    }
});
