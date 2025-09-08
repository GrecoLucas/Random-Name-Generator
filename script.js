let prenames = [];
let surnames = [];

// Carregar dados salvos ao iniciar
function loadSavedData() {
    const savedPrenames = localStorage.getItem('namecoise-prenames');
    const savedSurnames = localStorage.getItem('namecoise-surnames');
    
    if (savedPrenames) {
        prenames = JSON.parse(savedPrenames);
        updatePrenameList();
    }
    
    if (savedSurnames) {
        surnames = JSON.parse(savedSurnames);
        updateSurnameList();
    }
}

// Salvar dados no localStorage
function saveData() {
    localStorage.setItem('namecoise-prenames', JSON.stringify(prenames));
    localStorage.setItem('namecoise-surnames', JSON.stringify(surnames));
}

function addPrename() {
    const input = document.getElementById('prename');
    const inputValue = input.value.trim();
    
    if (inputValue === '') {
        alert('Por favor, digite um prenome válido!');
        return;
    }
    
    // Separar por hífen e processar cada nome
    const names = inputValue.split('-').map(name => name.trim()).filter(name => name !== '');
    let addedCount = 0;
    let duplicateCount = 0;
    
    names.forEach(name => {
        if (!prenames.includes(name)) {
            prenames.push(name);
            addedCount++;
        } else {
            duplicateCount++;
        }
    });
    
    input.value = '';
    updatePrenameList();
    saveData();
    
    // Mostrar feedback ao usuário
    if (addedCount > 0 && duplicateCount > 0) {
        alert(`${addedCount} prenome(s) adicionado(s). ${duplicateCount} já existia(m) na lista.`);
    } else if (duplicateCount > 0 && addedCount === 0) {
        alert('Todos os prenomes já foram adicionados anteriormente!');
    } else if (addedCount > 1) {
        alert(`${addedCount} prenomes adicionados com sucesso!`);
    }
}

function addSurname() {
    const input = document.getElementById('surname');
    const inputValue = input.value.trim();
    
    if (inputValue === '') {
        alert('Por favor, digite um sobrenome válido!');
        return;
    }
    
    // Separar por hífen e processar cada nome
    const names = inputValue.split('-').map(name => name.trim()).filter(name => name !== '');
    let addedCount = 0;
    let duplicateCount = 0;
    
    names.forEach(name => {
        if (!surnames.includes(name)) {
            surnames.push(name);
            addedCount++;
        } else {
            duplicateCount++;
        }
    });
    
    input.value = '';
    updateSurnameList();
    saveData();
    
    // Mostrar feedback ao usuário
    if (addedCount > 0 && duplicateCount > 0) {
        alert(`${addedCount} sobrenome(s) adicionado(s). ${duplicateCount} já existia(m) na lista.`);
    } else if (duplicateCount > 0 && addedCount === 0) {
        alert('Todos os sobrenomes já foram adicionados anteriormente!');
    } else if (addedCount > 1) {
        alert(`${addedCount} sobrenomes adicionados com sucesso!`);
    }
}

function removePrename(index) {
    prenames.splice(index, 1);
    updatePrenameList();
    saveData();
}

function removeSurname(index) {
    surnames.splice(index, 1);
    updateSurnameList();
    saveData();
}

function updatePrenameList() {
    const listElement = document.getElementById('prename-list');
    const countElement = document.getElementById('prename-count');
    
    countElement.textContent = prenames.length;
    
    if (prenames.length === 0) {
        listElement.innerHTML = '<p style="color: #666; text-align: center;">Nenhum prenome adicionado ainda</p>';
    } else {
        listElement.innerHTML = prenames.map((name, index) => 
            `<div class="name-item">
                <span>${name}</span>
                <button class="remove-btn" onclick="removePrename(${index})">Remover</button>
            </div>`
        ).join('');
    }
}

function updateSurnameList() {
    const listElement = document.getElementById('surname-list');
    const countElement = document.getElementById('surname-count');
    
    countElement.textContent = surnames.length;
    
    if (surnames.length === 0) {
        listElement.innerHTML = '<p style="color: #666; text-align: center;">Nenhum sobrenome adicionado ainda</p>';
    } else {
        listElement.innerHTML = surnames.map((name, index) => 
            `<div class="name-item">
                <span>${name}</span>
                <button class="remove-btn" onclick="removeSurname(${index})">Remover</button>
            </div>`
        ).join('');
    }
}

function generateRandomName() {
    const resultSection = document.getElementById('result-section');
    const generatedNameElement = document.getElementById('generated-name');
    
    if (prenames.length === 0 || surnames.length === 0) {
        generatedNameElement.innerHTML = '<div class="error-message">Você precisa adicionar pelo menos um prenome e um sobrenome!</div>';
        resultSection.style.display = 'block';
        return;
    }
    
    const randomPrename = prenames[Math.floor(Math.random() * prenames.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    
    generatedNameElement.textContent = `${randomPrename} ${randomSurname}`;
    resultSection.style.display = 'block';
}

// Permitir adicionar nomes pressionando Enter
function setupEventListeners() {
    document.getElementById('prename').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addPrename();
        }
    });

    document.getElementById('surname').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addSurname();
        }
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    setupEventListeners();
});
