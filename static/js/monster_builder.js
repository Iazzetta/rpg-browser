// Array para armazenar os monstros (será carregado do localStorage ou de MONSTERS)
let monsters = [];
let editingMonsterId = null; // Para controlar qual monstro está sendo editado

// Elementos do DOM
const monsterSelect = document.getElementById('monster-select');
const monsterFormSection = document.getElementById('monster-form-section');
const monsterForm = document.getElementById('monster-form');
const formTitle = document.getElementById('form-title');
const spritePreviewDiv = document.getElementById('sprite-preview');
const animationSelector = document.getElementById('animation-selector');
const spriteConfigContainer = document.getElementById('sprite-config-container');
const addAnimationBtn = document.getElementById('add-animation-btn');
const deleteMonsterBtn = document.getElementById('delete-monster-btn');
const spawnMonsterBtn = document.getElementById('spawn-monster-btn');
const cloneMonsterBtn = document.getElementById('clone-monster-btn');
const exportMonstersBtn = document.getElementById('export-monsters-btn');
const spriteFolderNameInput = document.getElementById('sprite-folder-name');
const monsterSizeInput = document.getElementById('monster-size');
const monsterHpInput = document.getElementById('monster-hp');
const monsterHpMaxInput = document.getElementById('monster-hpMax');
const additionalFieldsDiv = document.getElementById('additional-fields');


// Nomes e arquivos das animações padrão
const standardAnimations = {
    idle: 'idle.png',
    attack1: 'attack1.png',
    die: 'death.png', // Nota: 'die' usa 'death.png'
    takehit: 'takehit.png',
    run: 'run.png'
};

    // Frames padrão para as animações (baseado no exemplo)
const standardAnimationFrames = {
    idle: 9,
    attack1: 16,
    die: 8,
    takehit: 3,
    run: 9
};

    // Valores padrão para campos não essenciais
const defaultValues = {
    x: window.innerWidth - 150, // Exemplo, pode ser ajustado
    mana: 100,
    manaMax: 100,
    element: 'enemy',
    delayAttack: 0.5,
    cooldownAttack: 2,
    attackCountMax: 1,
    dyingTime: 500,
    yCustomOffset: -20,
    delayTakeHit: 0.3,
    hitboxCustomOffsetY: 10,
    description: '' // Novo campo de descrição
};


// Função para salvar os monstros no localStorage
function saveMonsters() {
    localStorage.setItem('monsters', JSON.stringify(monsters));
}

// Função para carregar os monstros do localStorage ou da variável global MONSTERS
async function loadMonsters() {
    const r = await fetch('/monsters')
    const data = await r.json()
    monsters = data.monsters
    populateMonsterSelect(); // Preenche o seletor após carregar
}

// Função para popular o dropdown de seleção de monstros
function populateMonsterSelect() {
    monsterSelect.innerHTML = '<option value="">-- Criar Novo Monstro --</option>'; // Opção para criar novo
    monsters.forEach(monster => {
        const option = document.createElement('option');
        option.value = monster.id;
        option.textContent = `${monster.id}: ${monster.name}`;
        monsterSelect.appendChild(option);
    });
}


// Função para renderizar a lista de monstros (não mais uma lista visível, apenas para referência interna)
function renderMonsterList() {
        // Esta função agora apenas atualiza o seletor
        populateMonsterSelect();
}

// Função para animar a sprite usando background-position
function animateSprite(element, frames, frameWidth, frameDuration) {
        // Limpa qualquer animação anterior para este elemento
    if (element.animationInterval) {
        clearInterval(element.animationInterval);
    }

    let currentFrame = 0;
    element.animationInterval = setInterval(() => {
        const positionX = -currentFrame * frameWidth;
        element.style.backgroundPositionX = `${positionX}px`;

        currentFrame++;
        if (currentFrame >= frames) {
            currentFrame = 0; // Volta para o início
        }
    }, frameDuration);
}


// Função para preencher o formulário com dados de um monstro
function fillForm(monster) {
    editingMonsterId = monster.id;
    formTitle.textContent = `Editar Monstro (ID: ${monster.id})`;
    document.getElementById('monster-id').value = monster.id;
    document.getElementById('monster-name').value = monster.name;
    spriteFolderNameInput.value = monster.spriteFolderName || '';
    document.getElementById('monster-level').value = monster.level;
    monsterHpInput.value = monster.hp;
    monsterHpMaxInput.value = monster.hpMax || monster.hp; // Preenche hpMax com hp se não existir
    document.getElementById('monster-mana').value = monster.mana || defaultValues.mana;
    document.getElementById('monster-manaMax').value = monster.manaMax || defaultValues.manaMax;
    document.getElementById('monster-damage').value = monster.damage;
    monsterSizeInput.value = monster.size;
    document.getElementById('monster-speed').value = monster.speed;
    document.getElementById('monster-element').value = monster.element || defaultValues.element;
    document.getElementById('monster-delayAttack').value = monster.delayAttack || defaultValues.delayAttack;
    document.getElementById('monster-cooldownAttack').value = monster.cooldownAttack || defaultValues.cooldownAttack;
    document.getElementById('monster-attackCountMax').value = monster.attackCountMax || defaultValues.attackCountMax;
    document.getElementById('monster-dyingTime').value = monster.dyingTime || defaultValues.dyingTime;
    document.getElementById('monster-yCustomOffset').value = monster.yCustomOffset || defaultValues.yCustomOffset;
    document.getElementById('monster-delayTakeHit').value = monster.delayTakeHit || defaultValues.delayTakeHit;
    document.getElementById('monster-hitboxCustomOffsetY').value = monster.hitboxCustomOffsetY || defaultValues.hitboxCustomOffsetY;
    document.getElementById('monster-expReward').value = monster.expReward;
    document.getElementById('monster-description').value = monster.description || defaultValues.description; // Preenche descrição

    // Mostra campos adicionais ao editar
    additionalFieldsDiv.classList.remove('hidden');

    // Preenche a configuração de sprite
    spriteConfigContainer.innerHTML = ''; // Limpa as configurações atuais
    animationSelector.innerHTML = ''; // Limpa o seletor de animação

    // Adiciona campos para as animações existentes
    if (monster.spriteConfig) {
        for (const animName in monster.spriteConfig) {
            addAnimationFields(animName, monster.spriteConfig[animName]);
                // Adiciona a opção ao seletor de animação
            const option = document.createElement('option');
            option.value = animName;
            option.textContent = animName.charAt(0).toUpperCase() + animName.slice(1);
            animationSelector.appendChild(option);
        }
    }


    // Atualiza a prévia da sprite com a animação 'idle' por padrão, se existir
    if (monster.spriteConfig && monster.spriteConfig.idle) {
        animationSelector.value = 'idle';
        updateSpritePreview('idle');
    } else {
            // Limpa a prévia se não houver animação idle
            spritePreviewDiv.style.backgroundImage = '';
            if(spritePreviewDiv.animationInterval) {
            clearInterval(spritePreviewDiv.animationInterval);
            }
    }

    // Habilita botões de exclusão e clonagem
    deleteMonsterBtn.disabled = false;
    cloneMonsterBtn.disabled = false;

    monsterFormSection.classList.remove('hidden'); // Mostra o formulário
}

    // Função para atualizar a prévia da sprite
function updateSpritePreview(animationName) {
    const monsterId = document.getElementById('monster-id').value;
    // Ao editar, pegamos o monstro do array; ao adicionar, construímos a config a partir dos campos do form
    const currentMonster = editingMonsterId !== null ? monsters.find(m => m.id === parseInt(monsterId)) : getMonsterDataFromForm();

    if (!currentMonster || !currentMonster.spriteConfig || !currentMonster.spriteConfig[animationName]) {
        spritePreviewDiv.style.backgroundImage = '';
        spritePreviewDiv.style.width = '90px'; // Tamanho padrão se não houver config
        spritePreviewDiv.style.height = '90px';
        spritePreviewDiv.style.backgroundSize = 'auto';
        spritePreviewDiv.style.backgroundPositionX = '0px';
            // Limpa a animação se não houver sprite
            if(spritePreviewDiv.animationInterval) {
                clearInterval(spritePreviewDiv.animationInterval);
            }
        return;
    }

    const animConfig = currentMonster.spriteConfig[animationName];

    // Usa o tamanho do monstro se a animação não tiver tamanho definido
    const previewWidth = animConfig.width || parseInt(monsterSizeInput.value) || 90;
    const previewHeight = animConfig.height || parseInt(monsterSizeInput.value) || 90;


    spritePreviewDiv.style.width = `${previewWidth}px`;
    spritePreviewDiv.style.height = `${previewHeight}px`;
    spritePreviewDiv.style.backgroundImage = `url(${animConfig.src})`;
    spritePreviewDiv.style.backgroundSize = `${previewWidth * animConfig.frames}px ${previewHeight}px`;
    spritePreviewDiv.style.backgroundPositionX = '0px'; // Começa no primeiro frame

        // Inicia/atualiza a animação da prévia
    animateSprite(spritePreviewDiv, animConfig.frames, previewWidth, 100); // 100ms por frame para a prévia do formulário
}


// Função para adicionar campos de uma animação ao formulário
function addAnimationFields(animName = '', animConfig = {}) {
    const animDiv = document.createElement('div');
    animDiv.classList.add('border', 'border-gray-200', 'p-3', 'rounded-md', 'space-y-2', 'text-xs');
    animDiv.dataset.animName = animName; // Armazena o nome da animação no elemento

    const isStandard = Object.keys(standardAnimations).includes(animName);
    const nameReadonly = isStandard && editingMonsterId !== null ? 'readonly' : ''; // Nome padrão readonly ao editar

    animDiv.innerHTML = `
        <div class="flex justify-between items-center">
            <h5 class="text-sm font-medium text-gray-700">${animName ? animName.charAt(0).toUpperCase() + animName.slice(1) : 'Nova Animação'}</h5>
            <button type="button" class="remove-animation-btn bg-red-500 hover:bg-red-600 text-white font-bold py-0 px-1 rounded-md text-xs" ${isStandard && editingMonsterId !== null ? 'disabled' : ''}>Remover</button>
        </div>
        <div>
            <label class="block text-xs font-medium text-gray-700">Nome da Animação:</label>
            <input type="text" class="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs animation-name-input" value="${animName}" ${nameReadonly} required>
        </div>
        <div>
            <label class="block text-xs font-medium text-gray-700">SRC da Imagem:</label>
            <input type="text" class="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs animation-src-input" value="${animConfig.src || ''}" required>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <div>
                <label class="block text-xs font-medium text-gray-700">Frame Inicial:</label>
                <input type="number" class="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs animation-frame-input" value="${animConfig.frame || 1}" required>
            </div>
            <div>
                <label class="block text-xs font-medium text-gray-700">Total de Frames:</label>
                <input type="number" class="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs animation-frames-input" value="${animConfig.frames || 1}" required>
            </div>
        </div>
            <div class="grid grid-cols-2 gap-2">
            <div>
                <label class="block text-xs font-medium text-gray-700">Largura (px):</label>
                <input type="number" class="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs animation-width-input" value="${animConfig.width || ''}" required>
            </div>
            <div>
                <label class="block text-xs font-medium text-gray-700">Altura (px):</label>
                <input type="number" class="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs animation-height-input" value="${animConfig.height || ''}" required>
            </div>
        </div>
    `;

    spriteConfigContainer.appendChild(animDiv);

    // Adiciona listener para remover animação
    animDiv.querySelector('.remove-animation-btn').onclick = async () => {
        const removedAnimName = animDiv.dataset.animName;
            // Remove a opção do seletor de animação
        const optionToRemove = animationSelector.querySelector(`option[value="${removedAnimName}"]`);
        if(optionToRemove) {
            optionToRemove.remove();
        }
        animDiv.remove();
        // Atualiza a prévia se a animação removida era a selecionada
        if (animationSelector.value === removedAnimName) {
            // Tenta selecionar 'idle' ou a primeira animação disponível
            if (animationSelector.options.length > 0) {
                animationSelector.value = animationSelector.options[0].value;
                updateSpritePreview(animationSelector.value);
            } else {
                    // Se não houver mais animações, limpa a prévia
                spritePreviewDiv.style.backgroundImage = '';
                    if(spritePreviewDiv.animationInterval) {
                    clearInterval(spritePreviewDiv.animationInterval);
                    }
            }
        }
        await triggerMonsterUpdateEvent(); // Dispara evento de atualização
    };

        // Adiciona listeners para atualizar a prévia em tempo real ao mudar os campos da animação
    const inputs = animDiv.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', async () => {
            // Só atualiza a prévia se esta animação estiver selecionada
            if (animationSelector.value === animDiv.dataset.animName) {
                    // Cria um objeto temporário com os valores atuais para a prévia
                const tempAnimConfig = {
                    src: animDiv.querySelector('.animation-src-input').value,
                    frame: parseInt(animDiv.querySelector('.animation-frame-input').value) || 1,
                    frames: parseInt(animDiv.querySelector('.animation-frames-input').value) || 1,
                    width: parseInt(animDiv.querySelector('.animation-width-input').value) || 0,
                    height: parseInt(animDiv.querySelector('.animation-height-input').value) || 0
                };
                    // Usa o tamanho do monstro se a animação não tiver tamanho definido
                const previewWidth = tempAnimConfig.width || parseInt(monsterSizeInput.value) || 90;
                const previewHeight = tempAnimConfig.height || parseInt(monsterSizeInput.value) || 90;


                spritePreviewDiv.style.width = `${previewWidth}px`;
                spritePreviewDiv.style.height = `${previewHeight}px`;
                spritePreviewDiv.style.backgroundImage = `url(${tempAnimConfig.src})`;
                spritePreviewDiv.style.backgroundSize = `${previewWidth * tempAnimConfig.frames}px ${previewHeight}px`;
                spritePreviewDiv.style.backgroundPositionX = '0px'; // Começa no primeiro frame

                // Reinicia a animação da prévia com os novos valores
                if(spritePreviewDiv.animationInterval) {
                    clearInterval(spritePreviewDiv.animationInterval);
                }
                    if (tempAnimConfig.frames > 1 && previewWidth > 0) {
                    animateSprite(spritePreviewDiv, tempAnimConfig.frames, previewWidth, 100);
                    }
            }
            await triggerMonsterUpdateEvent(); // Dispara evento de atualização
        });
    });

        // Adiciona listener para atualizar o nome da animação no título e no seletor
    const animNameInput = animDiv.querySelector('.animation-name-input');
    animNameInput.addEventListener('input', async () => {
            const newAnimName = animNameInput.value.trim();
            const oldAnimName = animDiv.dataset.animName; // Pega o nome antigo do dataset

            if (newAnimName && newAnimName !== oldAnimName) {
                // Atualiza o título da seção da animação
            animDiv.querySelector('h5').textContent = newAnimName.charAt(0).toUpperCase() + newAnimName.slice(1);

            // Atualiza a opção no seletor de animação
            let option = animationSelector.querySelector(`option[value="${oldAnimName}"]`);
            if (!option) { // Se for uma nova animação, cria a opção
                option = document.createElement('option');
                animationSelector.appendChild(option);
            }
            option.value = newAnimName;
            option.textContent = newAnimName.charAt(0).toUpperCase() + newAnimName.slice(1);
            animDiv.dataset.animName = newAnimName; // Atualiza o nome da animação no dataset

            // Se esta animação estava selecionada na prévia, atualiza o seletor
            if (animationSelector.value === oldAnimName) {
                animationSelector.value = newAnimName;
            }
            } else if (!newAnimName && oldAnimName) {
                // Se o nome for removido, remove a opção do seletor
            const optionToRemove = animationSelector.querySelector(`option[value="${oldAnimName}"]`);
            if(optionToRemove) {
                optionToRemove.remove();
            }
            animDiv.dataset.animName = ''; // Limpa o nome no dataset
            }
            await triggerMonsterUpdateEvent(); // Dispara evento de atualização
    });

}

// Função para preencher automaticamente as configurações de sprite padrão
async function autoFillStandardSpriteConfig() {
    const folderName = spriteFolderNameInput.value.trim();
    const size = parseInt(monsterSizeInput.value);

    if (!folderName || isNaN(size) || size <= 0) {
        // Não auto-preenche se o nome da pasta ou tamanho não forem válidos
        return;
    }

        // Remove campos de animação padrão existentes para substituí-las
        Object.keys(standardAnimations).forEach(animName => {
            const existingAnimDiv = spriteConfigContainer.querySelector(`div[data-anim-name="${animName}"]`);
            if (existingAnimDiv) {
                existingAnimDiv.remove();
                const optionToRemove = animationSelector.querySelector(`option[value="${animName}"]`);
                if(optionToRemove) {
                    optionToRemove.remove();
                }
            }
        });


    // Adiciona e preenche os campos para as animações padrão
    for (const animName in standardAnimations) {
        const fileName = standardAnimations[animName];
        const src = `/static/img/sprites/${folderName}/${fileName}`;
        const frames = standardAnimationFrames[animName] || 1; // Usa frames padrão ou 1
        const frame = 1; // Frame inicial padrão é 1
        const width = size;
        const height = size;

        const animConfig = { src, frame, frames, width, height };
        addAnimationFields(animName, animConfig);

            // Adiciona a opção ao seletor de animação
        const option = document.createElement('option');
        option.value = animName;
        option.textContent = animName.charAt(0).toUpperCase() + animName.slice(1);
        animationSelector.appendChild(option);
    }

        // Seleciona 'idle' por padrão e atualiza a prévia
    if (animationSelector.options.length > 0) {
            animationSelector.value = 'idle';
            updateSpritePreview('idle');
    } else {
            spritePreviewDiv.style.backgroundImage = '';
            if(spritePreviewDiv.animationInterval) {
            clearInterval(spritePreviewDiv.animationInterval);
            }
    }

    await triggerMonsterUpdateEvent(); // Dispara evento de atualização
}


// Função para limpar o formulário e preparar para novo monstro
function clearForm() {
    editingMonsterId = null;
    formTitle.textContent = 'Criar Novo Monstro';
    monsterForm.reset();
    document.getElementById('monster-id').value = ''; // Limpa o ID
    spriteConfigContainer.innerHTML = ''; // Limpa as configurações de sprite
    animationSelector.innerHTML = ''; // Limpa o seletor de animação
    spritePreviewDiv.style.backgroundImage = ''; // Limpa a prévia
        if(spritePreviewDiv.animationInterval) {
        clearInterval(spritePreviewDiv.animationInterval); // Para a animação da prévia
    }
        // Esconde campos adicionais ao criar novo
    additionalFieldsDiv.classList.add('hidden');

    // Desabilita botões de exclusão e clonagem
    deleteMonsterBtn.disabled = true;
    cloneMonsterBtn.disabled = true;

        // Adiciona listeners para auto-preencher ao criar novo
    spriteFolderNameInput.addEventListener('input', async () => await autoFillStandardSpriteConfig());
    monsterSizeInput.addEventListener('input', async () => await autoFillStandardSpriteConfig());

        triggerMonsterUpdateEvent(); // Dispara evento de atualização (com dados vazios)
}

    // Função para coletar dados do monstro a partir do formulário
function getMonsterDataFromForm() {
        const monsterData = {
            spriteConfig: {}
        };

        // Coleta dados dos campos principais
        const formData = new FormData(monsterForm);
        for (const [key, value] of formData.entries()) {
            // Ignora os campos de animação individuais aqui
            if (!key.startsWith('animation')) {
                // Converte para número onde apropriado, usa valor padrão se vazio para campos não essenciais
            if (['level', 'hp', 'damage', 'size', 'speed', 'expReward'].includes(key)) {
                    monsterData[key] = parseFloat(value) || 0;
            } else if (['mana', 'manaMax', 'delayAttack', 'cooldownAttack', 'attackCountMax', 'dyingTime', 'yCustomOffset', 'delayTakeHit', 'hitboxCustomOffsetY'].includes(key)) {
                    monsterData[key] = parseFloat(value) || defaultValues[key];
            }
            else {
                    monsterData[key] = value;
            }
            }
        }
        // Garante que hpMax seja igual a hp se não foi preenchido explicitamente
        monsterData.hpMax = parseFloat(monsterHpMaxInput.value) || monsterData.hp;

        // Adiciona o nome da pasta da sprite
    monsterData.spriteFolderName = spriteFolderNameInput.value.trim();
        // Adiciona a descrição
    monsterData.description = document.getElementById('monster-description').value.trim();


        // Coleta os dados da configuração de sprite a partir dos campos gerados dinamicamente
    const animDivs = spriteConfigContainer.querySelectorAll(':scope > div');

    animDivs.forEach(animDiv => {
            const animNameInput = animDiv.querySelector('.animation-name-input');
            const animSrcInput = animDiv.querySelector('.animation-src-input');
            const animFrameInput = animDiv.querySelector('.animation-frame-input');
            const animFramesInput = animDiv.querySelector('.animation-frames-input');
            const animWidthInput = animDiv.querySelector('.animation-width-input');
            const animHeightInput = animDiv.querySelector('.animation-height-input');

            const animName = animNameInput.value.trim();

            if (animName && animSrcInput.value) { // Garante que o nome e o src não estão vazios
                monsterData.spriteConfig[animName] = {
                    src: animSrcInput.value,
                    frame: parseInt(animFrameInput.value) || 1,
                    frames: parseInt(animFramesInput.value) || 1,
                    width: parseInt(animWidthInput.value) || 0,
                    height: parseInt(animHeightInput.value) || 0
                };
            }
    });

    return monsterData;
}

const updateMonsterDb = async (enemy) => {
    const r = await fetch(`/monsters/${enemy.id}`, {
        method: 'PUT',
        body: JSON.stringify(enemy)
    })
    const data = await r.json()
    console.log('atualizou?', data)
}

// Função para disparar o evento de atualização do monstro
async function triggerMonsterUpdateEvent() {
        if (!window.enemies) return;
        console.log(window.enemies);
        const currentMonsterData = getMonsterDataFromForm();
        console.log("Dados do monstro atualizados:", currentMonsterData);

        for (let i = 0; i < window.enemies.length; i++) {
            console.log(window.enemies[i].id, currentMonsterData.id, window.enemies[i].id == Number(currentMonsterData.id));
            if (window.enemies[i].id == Number(currentMonsterData.id)) {
                for (const [key, value] of Object.entries(currentMonsterData)) {

                    if (['name', 'spriteFolderName', 'element', 'spriteConfig'].includes(key)) {
                        window.enemies[i][key] = value;
                    } else {
                        window.enemies[i][key] = parseFloat(value);
                    }
                }
                await updateMonsterDb(window.enemies[i])
            }
        }
        // Você pode adicionar um evento customizado aqui se precisar notificar outros módulos do jogo
        // const event = new CustomEvent('monsterUpdated', { detail: currentMonsterData });
        // document.dispatchEvent(event);
}


// Event Listeners

// Listener para o seletor de monstro
monsterSelect.addEventListener('change', (event) => {
    const selectedId = event.target.value;
    if (selectedId === "") {
        // Selecionou "Criar Novo Monstro"
        clearForm();
            // Mostra campos adicionais ao criar novo
        additionalFieldsDiv.classList.remove('hidden');
    } else {
        // Selecionou um monstro existente
        const monsterToEdit = monsters.find(monster => monster.id === parseInt(selectedId));
        if (monsterToEdit) {
            fillForm(monsterToEdit);
                // Remove listeners de auto-preenchimento ao editar
            spriteFolderNameInput.removeEventListener('input', async () => await autoFillStandardSpriteConfig());
            monsterSizeInput.removeEventListener('input', async () => await autoFillStandardSpriteConfig());
        }
    }
});

// Botão Clonar Monstro
cloneMonsterBtn.addEventListener('click', () => {
    if (editingMonsterId !== null) {
        const monsterToClone = monsters.find(monster => monster.id === editingMonsterId);
        if (monsterToClone) {
            // Cria uma cópia profunda do monstro
            const clonedMonster = JSON.parse(JSON.stringify(monsterToClone));
            // Gera um novo ID
            const newId = monsters.length > 0 ? Math.max(...monsters.map(m => m.id)) + 1 : 1;
            clonedMonster.id = newId;
            clonedMonster.name = `Cópia de ${clonedMonster.name}`; // Adiciona "Cópia de" ao nome

            monsters.push(clonedMonster);
            saveMonsters();
            renderMonsterList(); // Atualiza o seletor

            // Seleciona o monstro clonado no dropdown e preenche o formulário
            monsterSelect.value = newId;
            fillForm(clonedMonster);

            console.log(`Monstro ${editingMonsterId} clonado com sucesso. Novo ID: ${newId}`);
        }
    }
});


// Botão Adicionar Animação (dentro do formulário)
addAnimationBtn.addEventListener('click', async() => {
    addAnimationFields(); // Adiciona um novo conjunto de campos de animação vazios
        await triggerMonsterUpdateEvent(); // Dispara evento de atualização
});

// Listener para o seletor de animação na prévia
animationSelector.addEventListener('change', async (event) => {
    updateSpritePreview(event.target.value);
        await triggerMonsterUpdateEvent(); // Dispara evento de atualização
});

// Listeners para auto-preencher a configuração de sprite (apenas ao criar novo)
// Estes listeners são adicionados/removidos em clearForm/fillForm


// Listener para o campo HP para atualizar HP Máx
monsterHpInput.addEventListener('input', async () => {
    monsterHpMaxInput.value = monsterHpInput.value;
        await triggerMonsterUpdateEvent(); // Dispara evento de atualização
});

    // Listener para disparar o evento de atualização para outros campos essenciais
    const essentialInputs = monsterForm.querySelectorAll('#monster-name, #sprite-folder-name, #monster-level, #monster-damage, #monster-size, #monster-speed, #monster-expReward, #monster-description');
    essentialInputs.forEach(input => {
        input.addEventListener('input', async () => {
            await triggerMonsterUpdateEvent(); // Dispara evento de atualização
        });
    });

    // Listener para disparar o evento de atualização para campos adicionais
    const additionalInputs = additionalFieldsDiv.querySelectorAll('input, textarea');
    additionalInputs.forEach(input => {
        input.addEventListener('input', async () => {
            await triggerMonsterUpdateEvent(); // Dispara evento de atualização
        });
    });


// Submissão do Formulário
monsterForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o recarregamento da página

    const monsterData = getMonsterDataFromForm();

    if (editingMonsterId !== null) {
        // Atualiza um monstro existente
        const index = monsters.findIndex(m => m.id === editingMonsterId);
        if (index !== -1) {
            // Mantém o ID original e atualiza os outros campos
            monsters[index] = { ...monsters[index], ...monsterData, id: editingMonsterId };
            console.log(`Monstro com ID ${editingMonsterId} atualizado.`);
        }
    } else {
        // Adiciona um novo monstro
        // Gera um ID automático: maior ID existente + 1
        const newId = monsters.length > 0 ? Math.max(...monsters.map(m => m.id)) + 1 : 1;
        monsterData.id = newId;
        monsters.push(monsterData);
            console.log(`Novo monstro adicionado com ID ${newId}.`);
    }

    saveMonsters(); // Salva no localStorage
    renderMonsterList(); // Atualiza o seletor
    clearForm(); // Limpa o formulário
    monsterSelect.value = ""; // Reseta o seletor para "Criar Novo"
});

// Função para deletar um monstro
deleteMonsterBtn.addEventListener('click', () => {
        if (editingMonsterId !== null && confirm(`Tem certeza que deseja deletar o monstro com ID ${editingMonsterId}?`)) {
        monsters = monsters.filter(monster => monster.id !== editingMonsterId);
        saveMonsters(); // Salva no localStorage após deletar
        renderMonsterList(); // Atualiza o seletor
        clearForm(); // Limpa o formulário
        monsterSelect.value = ""; // Reseta o seletor para "Criar Novo"
        console.log(`Monstro com ID ${editingMonsterId} deletado.`);
    }
});

spawnMonsterBtn.addEventListener('click', () => {
    console.log('spawnMonsterBtn')
    if (editingMonsterId !== null) {
        const enemy = getCurrentMonsterById(editingMonsterId);
        enemy.x = randInt((window.innerWidth / 2) + enemy.size, window.innerWidth - enemy.size)
        enemy.speed = randInt(enemy.speed, enemy.speed + 1)
        window.enemies.push(new Enemy(enemy))
    }
})


// Botão Exportar Monstros
exportMonstersBtn.addEventListener('click', () => {
    const jsonString = JSON.stringify(monsters, null, 2); // Formata o JSON com indentação
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'monsters.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Limpa o URL do objeto
        console.log("Monstros exportados para monsters.json");
});

// Inicializa: carrega do localStorage/MONSTERS e popula o seletor
loadMonsters();
clearForm(); // Começa no estado de "Criar Novo Monstro"
