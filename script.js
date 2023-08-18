document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-btn');
    const problemCheckboxes = document.getElementById('problem-checkboxes');
    const solutionCheckboxes = document.getElementById('solution-checkboxes');
    const customProblemInput = document.getElementById('custom-problem');
    const customSolutionInput = document.getElementById('custom-solution');
    const addCustomProblemButton = document.getElementById('add-custom-problem');
    const addCustomSolutionButton = document.getElementById('add-custom-solution');
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

    addCustomProblemButton.addEventListener('click', function() {
        const customProblem = customProblemInput.value.trim();
        if (customProblem !== '') {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = customProblem;
            checkbox.id = customProblem;
            checkbox.checked = true;
            
            const label = document.createElement('label');
            label.textContent = customProblem;
            label.setAttribute('for', customProblem);
            
            problemCheckboxes.appendChild(checkbox);
            problemCheckboxes.appendChild(label);
            problemCheckboxes.appendChild(document.createElement('br'));
            
            customProblemInput.value = '';
        }
    });

    addCustomSolutionButton.addEventListener('click', function() {
        const customSolution = customSolutionInput.value.trim();
        if (customSolution !== '') {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = customSolution;
            checkbox.id = customSolution;
            checkbox.checked = true;
            
            const label = document.createElement('label');
            label.textContent = customSolution;
            label.setAttribute('for', customSolution);
            
            solutionCheckboxes.appendChild(checkbox);
            solutionCheckboxes.appendChild(label);
            solutionCheckboxes.appendChild(document.createElement('br'));
            
            customSolutionInput.value = '';
        }
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
});
