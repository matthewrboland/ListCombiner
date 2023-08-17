document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-btn');
    const resultDiv = document.getElementById('result');
    
    generateButton.addEventListener('click', function() {
        const list1 = document.getElementById('Problems').value;
        const list2 = document.getElementById('Solutions').value;
        
        const list1Array = list1.split('\n');
        const list2Array = list2.split('\n');
        
        if (list1Array.length === 0 || list2Array.length === 0) {
            resultDiv.textContent = 'Please enter both lists.';
            return;
        }
        
        const randomItem1 = list1Array[Math.floor(Math.random() * list1Array.length)];
        const randomItem2 = list2Array[Math.floor(Math.random() * list2Array.length)];
        
        resultDiv.textContent = randomItem1 + ' - ' + randomItem2;
    });
});
