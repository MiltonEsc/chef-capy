
    document.addEventListener('DOMContentLoaded', () => {
        // --- CONSTANTS AND STATE ---
        const MAX_INGREDIENTS_PER_PLATE = 30; // Max capacity for manual stacking
        const DEAL_LIMIT = 15; // "Servir" button stops dealing to a plate at this number
        const TOTAL_LEVELS = 100;

        const allPossibleIngredients = [
            { id: 'strawberry', name: 'Fresa', emoji: '🍓', imageUrl: '/img/strawberry.png' },
            { id: 'banana', name: 'Banana', emoji: '🍌', imageUrl: '/img/banana.png' },
            { id: 'grapes', name: 'Uvas', emoji: '🍇', imageUrl: '/img/grape.png' },
            { id: 'carrot', name: 'Zanahoria', emoji: '🥕', imageUrl: '/img/carrot.png' },
            { id: 'broccoli', name: 'Brócoli', emoji: '🥦', imageUrl: '/img/broccoli.png' },
            { id: 'mushroom', name: 'Champiñón', emoji: '🍄', imageUrl: '/img/mushroom.png' },
            { id: 'tomato', name: 'Tomate', emoji: '🍅', imageUrl: '/img/tomato.png' },
            { id: 'avocado', name: 'Aguacate', emoji: '🥑', imageUrl: '/img/avocado.png' },
            { id: 'eggplant', name: 'Berenjena', emoji: '🍆', imageUrl: '/img/eggplant.png' },
            { id: 'chili', name: 'Chile', emoji: '🌶️', imageUrl: '/img/pepper.png' }
        ];

        const specialItems = {
            wildcard: { id: 'wildcard', name: 'Comodín', emoji: '🌟', imageUrl: '/img/star.png' },
            bomb: { id: 'bomb', name: 'Bomba', emoji: '💣', imageUrl: '/img/bomb.png' },
            golden: { id: 'golden', name: 'Dorado', emoji: '🏆', imageUrl: '/img/golden.png' }
        };

        const allIngredientData = {
            ...Object.fromEntries(allPossibleIngredients.map(item => [item.id, item])),
            ...Object.fromEntries(Object.values(specialItems).map(item => [item.id, item]))
        };
        
        const initialGameState = {
            highestLevelUnlocked: 0, currentLevelIndex: 0, currentLevelType: 'classic', 
            ordersCompletedInLevel: 0, totalOrdersInLevel: 0, levelOrderQueue: [],
            stars: 0, platesUnlocked: 3, currentRecipe: null, plates: [],
            deck: [], selectedStack: null, isAnimating: false,
            unlockedIngredients: [], trashUsesLeft: 0,
        };
        let gameState = { ...initialGameState };
        
        // --- UI ELEMENTS ---
        const homeScreenEl = document.getElementById('home-screen');
        const gameUiEl = document.getElementById('game-ui');
        const levelMapScreenEl = document.getElementById('level-map-screen');
        const levelMapContainer = document.getElementById('level-map-container');
        const startGameButton = document.getElementById('start-game-button');
        const resetProgressButton = document.getElementById('reset-progress-button');
        const backToHomeButton = document.getElementById('back-to-home-button');
        const backToMapButton = document.getElementById('back-to-map-button');
        const dealButton = document.getElementById('deal-button');
        const deckCountEl = document.getElementById('deck-count');
        const recipeTitleEl = document.getElementById('recipe-title');
        const recipeNameEl = document.getElementById('recipe-name');
        const recipeIngredientsEl = document.getElementById('recipe-ingredients');
        const levelDisplayEl = document.getElementById('level-display').querySelector('span');
        const orderProgressEl = document.getElementById('order-progress').querySelector('span');
        const starCounterEl = document.getElementById('star-counter').querySelector('span');
        const orderInfoEl = document.getElementById('order-info');
        const animationLayer = document.getElementById('animation-layer');
        const messageBox = document.getElementById('message-box');
        const messageTitle = document.getElementById('message-title');
        const messageText = document.getElementById('message-text');
        const messageButtonsContainer = document.getElementById('message-buttons');
        const timerContainer = document.getElementById('timer-container');
        const timerBar = document.getElementById('timer-bar');
        const vipBadge = document.getElementById('vip-badge');
        const customerTypeBadge = document.getElementById('customer-type-badge');
        const howToPlayButton = document.getElementById('how-to-play-button');
        const howToPlayModal = document.getElementById('how-to-play-modal');
        const howToPlayContent = document.getElementById('how-to-play-content');
        const howToPlayCloseButton = document.getElementById('how-to-play-close-button');
        const howToPlayCloseButtonX = document.getElementById('how-to-play-close-button-x');
        const trashCanEl = document.getElementById('trash-can');
        const trashCounterEl = document.getElementById('trash-counter');
        const cozyGradientMap = {
            'strawberry': 'bg-gradient-to-br from-pink-300 to-red-400', 'banana': 'bg-gradient-to-br from-yellow-200 to-yellow-300', 'grapes': 'bg-gradient-to-br from-purple-300 to-indigo-400', 'carrot': 'bg-gradient-to-br from-orange-200 to-amber-400', 'broccoli': 'bg-gradient-to-br from-green-300 to-emerald-400', 'mushroom': 'bg-gradient-to-br from-stone-300 to-stone-400', 'tomato': 'bg-gradient-to-br from-red-400 to-red-500', 'avocado': 'bg-gradient-to-br from-lime-300 to-green-500', 'eggplant': 'bg-gradient-to-br from-purple-400 to-violet-600', 'chili': 'bg-gradient-to-br from-red-500 to-orange-600',
            [specialItems.wildcard.id]: 'bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-400',
            [specialItems.bomb.id]: 'bg-gradient-to-br from-gray-600 to-black',
            [specialItems.golden.id]: 'bg-gradient-to-br from-yellow-300 to-amber-500'
        };
        let timerInterval = null;

        // --- CORE DATA & STATE FUNCTIONS ---
        async function loadProgress() {
            if (!window.firebaseIntegration) { setTimeout(loadProgress, 100); return; }
            const savedState = await window.firebaseIntegration.loadProgressFromFirestore();
            Object.assign(gameState, initialGameState, savedState || {});
            if (!savedState) await saveProgress();
            renderLevelMap();
        }
        async function saveProgress() {
            if (!window.firebaseIntegration) return;
            const progressToSave = { highestLevelUnlocked: gameState.highestLevelUnlocked, currentLevelIndex: gameState.currentLevelIndex, stars: gameState.stars, platesUnlocked: gameState.platesUnlocked };
            await window.firebaseIntegration.saveProgressToFirestore(progressToSave);
        }
        function resetGameStateToDefault() { Object.assign(gameState, initialGameState); renderLevelMap(); }
        function resetProgress() {
            showMessage("Reiniciar Progreso", "¿Estás seguro de que quieres empezar de nuevo? Todas tus estrellas y niveles desbloqueados se perderán para siempre.", [
                {text: "Cancelar", primary: false},
                {text: "Sí, Reiniciar", primary: true, action: async () => {
                    if (window.firebaseIntegration) await window.firebaseIntegration.resetProgressInFirestore();
                    resetGameStateToDefault(); renderLevelMap();
                }}
            ]);
        }
        
        // --- GAME FLOW FUNCTIONS ---
        function handleOrderCompletion() {
            if(timerInterval) clearInterval(timerInterval);
            gameState.levelOrderQueue.shift(); 
            gameState.ordersCompletedInLevel++;
            
            if(gameState.levelOrderQueue.length === 0) {
                 handleLevelComplete(); 
            } else { 
                serveNewOrder(); 
            }
        }

        async function handleLevelComplete() {
            if (gameState.currentLevelIndex >= gameState.highestLevelUnlocked) {
                gameState.highestLevelUnlocked = gameState.currentLevelIndex + 1;
            }
            gameState.currentRecipe = null;
            await saveProgress();
            const onConfirm = () => {
                if (gameState.currentLevelIndex >= TOTAL_LEVELS - 1) {
                    handleGameWon();
                } else {
                    startGame(gameState.currentLevelIndex + 1);
                }
            };
            showMessage("¡Nivel Completado!", `¡Has completado todos los pedidos! Has desbloqueado el siguiente nivel.`, [{ text: "Próximo Nivel", action: onConfirm, primary: true }]);
        }
        async function handleUnlockPlateClick() {
            if (gameState.platesUnlocked >= 11) return;
            const cost = 1150 + (gameState.platesUnlocked - 3) * 500;
            if (gameState.stars >= cost) {
                showMessage("Desbloquear Plato", `¿Gastar ${cost} ⭐ para desbloquear este plato?`, [
                    { text: "Ahora no", primary: false },
                    { text: "Desbloquear", primary: true, action: async () => {
                        gameState.stars -= cost; gameState.platesUnlocked++; gameState.plates.push([]);
                        await saveProgress(); renderGame();
                    }}
                ]);
            } else showMessage("¡Estrellas Insuficientes!", `Necesitas ${cost} ⭐ para desbloquear este plato.`, [{ text: 'OK', primary: true }]);
        }
        
        // --- UI & HELPER FUNCTIONS ---
        function showMessage(title, text, buttonsConfig) {
            messageTitle.textContent = title; messageText.innerHTML = text; messageButtonsContainer.innerHTML = ''; 
            if (!buttonsConfig || buttonsConfig.length === 0) {
                const okButton = document.createElement('button'); okButton.textContent = '¡Entendido!'; okButton.className = 'btn btn-primary'; okButton.onclick = closeMessage; messageButtonsContainer.appendChild(okButton);
            } else {
                 buttonsConfig.forEach(config => {
                     const button = document.createElement('button'); button.textContent = config.text; button.className = `btn ${config.primary ? 'btn-primary' : 'btn-secondary'}`;
                     button.onclick = () => { if(!config.noClose) closeMessage(); if (config.action) config.action(); };
                     messageButtonsContainer.appendChild(button);
                 });
            }
            messageBox.classList.remove('opacity-0', 'pointer-events-none'); messageBox.querySelector('div').classList.remove('scale-95');
        }
        function closeMessage() {
            messageBox.classList.add('opacity-0'); setTimeout(() => messageBox.classList.add('pointer-events-none'), 300); messageBox.querySelector('div').classList.add('scale-95');
        }
        function showScreen(screenEl) {
            homeScreenEl.classList.add('hidden');
            gameUiEl.classList.add('hidden');
            levelMapScreenEl.classList.add('hidden');
            screenEl.classList.remove('hidden');
        }
        function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } }
        
        // --- RENDER & GAME SETUP FUNCTIONS ---
        function renderLevelMap() {
            levelMapContainer.innerHTML = '';
            for (let i = 0; i < TOTAL_LEVELS; i++) {
                const isUnlocked = i <= gameState.highestLevelUnlocked;
                const levelData = generateLevelData(i);
                const nodeContainer = document.createElement('div'); 
                nodeContainer.className = 'level-node'; 
                const button = document.createElement('button'); 
                button.disabled = !isUnlocked; 
                button.className = `level-node-button ${isUnlocked ? '' : 'locked'}`; 
                button.onclick = () => startGame(i);
                
                const content = document.createElement('div'); 
                content.className = 'level-content';
                if (isUnlocked) {
                    const label = levelData.levelType === 'sort' ? 'Puzzle' : 'Receta';
                    const icon = levelData.levelType === 'sort' ? '🧩' : '🧑‍🍳';
                    content.innerHTML = `<div class="level-number">${i + 1}</div><div class="level-text-label">${icon} ${label}</div>`;
                } else {
                    content.innerHTML = `<div class="lock-icon-map"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path></svg></div>`;
                }
                button.appendChild(content); 
                nodeContainer.appendChild(button); 
                levelMapContainer.appendChild(nodeContainer);
            }
        }

        function showLevelMap() { renderLevelMap(); showScreen(levelMapScreenEl); }
        
        function generateLevelData(levelIndex) {
            const levelNumber = levelIndex + 1;
            const levelType = (levelIndex > 1 && levelIndex % 3 === 0) ? 'sort' : 'classic';
            const ordersToComplete = levelType === 'sort' ? 1 : Math.min(10, 1 + Math.floor(levelIndex / 3));
            const platesActive = Math.min(11, 3 + Math.floor(levelIndex / 2));
            const unlocks = (levelIndex < allPossibleIngredients.length) ? 1 : 0;
            const deckSize = 80 + levelIndex * 15;
            const ingredientCountForRecipe = levelType === 'sort' ? Math.min(Math.floor(2 + levelIndex / 4), 5) : Math.min(Math.floor(2 + levelIndex / 3), 3);
            return { id: levelNumber, levelType, ordersToComplete, platesActive, deckSize, unlocks, ingredientCount: ingredientCountForRecipe };
        }

        function startGame(levelIndex) {
            showScreen(gameUiEl); 
            const levelData = generateLevelData(levelIndex);
            
            Object.assign(gameState, {
                currentLevelIndex: levelIndex,
                currentLevelType: levelData.levelType,
                ordersCompletedInLevel: 0,
                levelOrderQueue: [],
                plates: Array.from({ length: gameState.platesUnlocked }, () => []), 
                trashUsesLeft: 3 + Math.floor(levelIndex / 5),
                totalOrdersInLevel: levelData.ordersToComplete
            });
            
            let unlockedCount = 2; 
            for(let i = 0; i < levelIndex; i++) {
                unlockedCount += generateLevelData(i).unlocks || 0;
            }
            gameState.unlockedIngredients = allPossibleIngredients.slice(0, Math.min(unlockedCount, allPossibleIngredients.length)).map(ing => ing.id);
            
            for (let i = 0; i < levelData.ordersToComplete; i++) {
                gameState.levelOrderQueue.push(generateRecipeForLevel(levelData, gameState.unlockedIngredients));
            }
            
            serveNewOrder();
        }

        function createDeck(level, ingredientPool, recipe, extraIngredients = []) {
            let newDeck = [...extraIngredients];
            if (recipe && recipe.ingredients) {
                for (const [ingredientId, count] of Object.entries(recipe.ingredients)) {
                    for (let i = 0; i < count; i++) {
                        const isGolden = Math.random() < 0.1; 
                        newDeck.push({ type: isGolden ? specialItems.golden.id : ingredientId, originalType: ingredientId, id: `req-${ingredientId}-${i}-${Math.random()}` });
                    }
                }
            }
            const potentialDistractors = allPossibleIngredients.map(i => i.id).filter(id => !ingredientPool.includes(id));
            if (potentialDistractors.length > 0) { const distractor = potentialDistractors[0]; for (let i = 0; i < 5; i++) newDeck.push({ type: distractor, id: `distractor-${distractor}-${i}-${Math.random()}`}); }
            
            const specialIngredientCount = (gameState.currentLevelType === 'sort') ? Math.floor(level.deckSize / 25) : Math.floor(level.deckSize / 20);
            for (let i = 0; i < specialIngredientCount; i++) { 
                let type = specialItems.bomb.id;
                if (gameState.currentLevelType === 'classic' && Math.random() > 0.6) {
                    type = specialItems.wildcard.id;
                }
                newDeck.push({ type, id: `special-${type}-${i}-${Math.random()}` }); 
            }

            const fillerCount = level.deckSize - newDeck.length;
            for (let i = 0; i < fillerCount; i++) { const randomType = ingredientPool[Math.floor(Math.random() * ingredientPool.length)]; newDeck.push({ type: randomType, id: `fill-${i}-${Math.random()}` }); }
            shuffleArray(newDeck); return newDeck;
        }

        function generateRandomRecipeName() {
            const adjectives = ["Acogedor", "Cálido", "Dorado", "Rústico", "Hogareño", "Brillante", "Crepuscular", "Campestre"];
            const nouns = ["Deleite", "Guiso", "Manjar", "Festín", "Pastel", "Néctar", "Bocado", "Breveje"];
            return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
        }

        function generateRecipeForLevel(level, unlockedIngredients) {
            const recipeIngredients = {}; const shuffledPool = [...unlockedIngredients]; shuffleArray(shuffledPool);
            const ingredientsForRecipe = shuffledPool.slice(0, level.ingredientCount);
            
            const countPerIngredient = level.levelType === 'sort' ? 10 : 10;

            ingredientsForRecipe.forEach(ingredientId => { recipeIngredients[ingredientId] = countPerIngredient; });
            return { name: generateRandomRecipeName(), ingredients: recipeIngredients };
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval); const recipe = gameState.currentRecipe; if (!recipe || !recipe.isVIP) return;
            timerInterval = setInterval(() => {
                recipe.timeLeft--; const percentage = (recipe.timeLeft / recipe.timerDuration) * 100; timerBar.style.width = `${percentage}%`;
                if (recipe.timeLeft <= 0) { clearInterval(timerInterval); showMessage("¡Se acabó el tiempo!", "El cliente VIP se ha ido. ¡Inténtalo de nuevo!", [{ text: "OK", primary: true, action: () => {
                    gameState.levelOrderQueue.shift(); 
                    if (gameState.levelOrderQueue.length === 0) {
                        handleLevelComplete();
                    } else {
                        serveNewOrder();
                    }
                } }]); }
            }, 1000);
        }
        
        function serveNewOrder() {
            if (timerInterval) clearInterval(timerInterval);

            if (gameState.levelOrderQueue.length === 0) {
                console.log("Attempted to serve new order, but queue is empty. Finishing level.");
                handleLevelComplete();
                return;
            }
            
            gameState.currentRecipe = gameState.levelOrderQueue[0]; 
            const currentLevel = generateLevelData(gameState.currentLevelIndex);
            
            gameState.currentRecipe.isVIP = false;
            gameState.currentRecipe.customerType = 'normal';
            if (currentLevel.levelType === 'classic') {
                const randomCustomer = Math.random();
                if (gameState.currentLevelIndex >= 5 && randomCustomer < 0.3) {
                    gameState.currentRecipe.customerType = 'picky';
                    const order = [];
                    for(const [ing, count] of Object.entries(gameState.currentRecipe.ingredients)) { 
                        for(let i=0; i < count; i++) order.push(ing);
                    }
                    shuffleArray(order); 
                    gameState.currentRecipe.ingredientOrder = order;
                } else if (gameState.currentLevelIndex >= 2 && randomCustomer < 0.5) {
                    gameState.currentRecipe.isVIP = true; 
                    gameState.currentRecipe.timerDuration = 60; 
                    gameState.currentRecipe.timeLeft = 60; 
                    startTimer();
                }
            }
            
            gameState.currentRecipe.needed = { ...gameState.currentRecipe.ingredients };
            gameState.deck = createDeck(currentLevel, gameState.unlockedIngredients, gameState.currentRecipe);
            gameState.selectedStack = null; 
            renderGame();
        }
       
        function dealRow() {
            if (gameState.isAnimating || gameState.deck.length === 0) return;
            if (gameState.selectedStack) gameState.selectedStack = null;
            
            const deals = [];
            const availablePlates = [];
            for (let i = 0; i < gameState.platesUnlocked; i++) {
                if (gameState.plates[i].length < DEAL_LIMIT) {
                    availablePlates.push(i);
                }
            }

            if (availablePlates.length === 0) {
                dealButton.classList.add('shake');
                setTimeout(() => dealButton.classList.remove('shake'), 500);
                return;
            }

            const neededNowTypes = Object.keys(gameState.currentRecipe.needed || {}).filter(type => gameState.currentRecipe.needed[type] > 0);
            
            let neededSoonTypes = [];
            if (gameState.levelOrderQueue.length > 1) {
                const nextRecipe = gameState.levelOrderQueue[1];
                if (nextRecipe) {
                    neededSoonTypes = Object.keys(nextRecipe.ingredients || {}).filter(type => !neededNowTypes.includes(type));
                }
            }

            const neededNowDeck = [];
            const neededSoonDeck = [];
            const otherDeck = [];

            gameState.deck.forEach(ing => {
                const type = ing.originalType || ing.type;
                if (neededNowTypes.includes(type)) {
                    neededNowDeck.push(ing);
                } else if (neededSoonTypes.includes(type)) {
                    neededSoonDeck.push(ing);
                } else {
                    otherDeck.push(ing);
                }
            });

            shuffleArray(neededNowDeck);
            shuffleArray(neededSoonDeck);
            shuffleArray(otherDeck);

            availablePlates.forEach(plateIndex => {
                let ingredientToDeal = null;
                const chance = Math.random();

                if (chance < 0.7 && neededNowDeck.length > 0) { 
                    ingredientToDeal = neededNowDeck.pop();
                } else if (chance < 0.9 && neededSoonDeck.length > 0) { 
                    ingredientToDeal = neededSoonDeck.pop();
                } else if (otherDeck.length > 0) {
                    ingredientToDeal = otherDeck.pop();
                } else if (neededNowDeck.length > 0) { // Fallback
                    ingredientToDeal = neededNowDeck.pop();
                } else if (neededSoonDeck.length > 0) { // Fallback
                    ingredientToDeal = neededSoonDeck.pop();
                }
                
                if (ingredientToDeal) {
                    deals.push({ toPlateIndex: plateIndex, ingredient: ingredientToDeal });
                }
            });
            
            gameState.deck = [...neededNowDeck, ...neededSoonDeck, ...otherDeck];
            shuffleArray(gameState.deck);

            if (deals.length > 0) {
                animateDeal(deals);
            } else {
                renderGame();
            }
        }
        
        function renderGame() {
            const recipe = gameState.currentRecipe; if (!recipe) return;
            
            recipeTitleEl.textContent = gameState.currentLevelType === 'sort' ? 'Objetivo de Clasificación:' : 'Pedido de Hoy:';
            dealButton.style.display = gameState.currentLevelType === 'sort' ? 'none' : 'inline-flex';

            levelDisplayEl.textContent = `Nivel: ${gameState.currentLevelIndex + 1}`;
            orderProgressEl.textContent = `Pedidos: ${gameState.ordersCompletedInLevel + 1}/${gameState.totalOrdersInLevel}`;
            starCounterEl.textContent = gameState.stars; recipeNameEl.textContent = recipe.name;
            vipBadge.classList.toggle('hidden', !recipe.isVIP);
            customerTypeBadge.classList.toggle('hidden', recipe.customerType !== 'picky');
            if(recipe.customerType === 'picky') customerTypeBadge.textContent = '¡En Orden!';
            timerContainer.classList.toggle('hidden', !recipe.isVIP);
            if (recipe.isVIP) { const percentage = (recipe.timeLeft / recipe.timerDuration) * 100; timerBar.style.width = `${percentage}%`; }
            recipeIngredientsEl.innerHTML = '';
            
            if(recipe.customerType === 'picky') {
                recipe.ingredientOrder.forEach((ingredientId, index) => {
                    const masterData = allIngredientData[ingredientId];
                    if (!masterData) return;
                    const span = document.createElement('span');
                    span.className = 'recipe-ingredient-ordered';
                    if (index === 0) span.classList.add('next-in-order', 'font-bold', 'text-accent', 'scale-125');
                    span.innerHTML = `<img src="${masterData.imageUrl}" class="recipe-img" alt="${masterData.name}">`;
                    recipeIngredientsEl.appendChild(span);
                });
            } else {
                recipeIngredientsEl.innerHTML = Object.entries(recipe.ingredients)
                    .map(([ingredientId, targetCount]) => {
                        const masterData = allIngredientData[ingredientId];
                        const needed = Math.max(0, recipe.needed[ingredientId]);
                        const isComplete = needed <= 0;
                        const displayCount = isComplete ? 0 : targetCount;
                        const imgTag = masterData ? `<img src="${masterData.imageUrl}" class="recipe-img" alt="${masterData.name}">` : `<span>${ingredientId}</span>`;
                        return `<span class="recipe-ingredient inline-flex items-center ${isComplete ? 'line-through text-stone-400 opacity-60' : ''}">${imgTag} x${displayCount}</span>`;
                    }).join(' ');
            }

            document.querySelectorAll('.plate-wrapper').forEach((wrapper, index) => {
                const plateArea = wrapper.querySelector('.plate-area'); const isActive = index < gameState.platesUnlocked;
                plateArea.classList.remove('potential-target', 'bomb-target', 'ring-2', 'ring-red-500');
                if (isActive) {
                    plateArea.classList.remove('locked'); const plate = gameState.plates[index]; plateArea.innerHTML = '';
                    wrapper.onclick = () => handlePlateClick(index);
                    if (plate) {
                        plate.forEach((ingredient, ingredientIndex) => {
                            const ingredientEl = createAnimatedClone(ingredient); let transformValue = `translateX(-50%) translateZ(${ingredientIndex * 5}px)`;
                            if (gameState.selectedStack?.fromPlate === index && gameState.selectedStack.stack.some(s => s.id === ingredient.id)) {
                                 transformValue += ' translateZ(25px) scale(1.05)'; 
                                 if(ingredientIndex === plate.length - 1) {
                                     const counter = document.createElement('div'); counter.className = 'stack-counter'; counter.textContent = gameState.selectedStack.stack.length; ingredientEl.appendChild(counter);
                                 }
                            }
                            ingredientEl.style.transform = transformValue; plateArea.appendChild(ingredientEl);
                        });
                    }
                    if (gameState.selectedStack?.stack?.length > 0) {
                        const stackType = gameState.selectedStack.stack[0].type;
                        if(stackType === specialItems.bomb.id) {
                            plateArea.classList.add('bomb-target', 'ring-2', 'ring-red-500');
                        }
                        else if (canMoveStackTo(gameState.selectedStack.stack, plate)) {
                            plateArea.classList.add('potential-target'); 
                        }
                    }
                } else {
                    plateArea.classList.add('locked'); plateArea.innerHTML = `<div class="lock-icon"><span><img src="/img/padlock.png" alt="Candado" style="width: 100%; height: 100%;"></span></div>`;
                    wrapper.onclick = () => handleUnlockPlateClick(); 
                }
            });
            orderInfoEl.classList.toggle('ring-2', isStackDeliverable(gameState.selectedStack)); orderInfoEl.classList.toggle('ring-primary', isStackDeliverable(gameState.selectedStack));
            trashCanEl.disabled = !gameState.selectedStack || gameState.trashUsesLeft <= 0 || (gameState.selectedStack && gameState.selectedStack.stack[0].type === specialItems.bomb.id);
            trashCounterEl.textContent = gameState.trashUsesLeft;
            const allPlatesFull = gameState.plates.every(p => p.length >= MAX_INGREDIENTS_PER_PLATE);
            dealButton.disabled = allPlatesFull || isOrderComplete(); deckCountEl.textContent = gameState.deck.length;
        }

        // --- CORE GAME LOGIC (FORKED) ---
        function handlePlateClick(plateIndex) {
            if (gameState.isAnimating) return;
            const clickedPlate = gameState.plates[plateIndex];

            if (!gameState.selectedStack) { // Select a stack
                if (clickedPlate.length === 0) return;
                
                const topIngredient = clickedPlate[clickedPlate.length - 1];
                const movableStack = [];
                const typeToMatch = topIngredient.originalType || topIngredient.type;

                for (let i = clickedPlate.length - 1; i >= 0; i--) {
                    const currentIngredient = clickedPlate[i];
                    const currentTypeForMatching = currentIngredient.originalType || currentIngredient.type;
                    
                    if (currentTypeForMatching === typeToMatch) {
                        movableStack.unshift(currentIngredient);
                    } else {
                        break;
                    }
                }
                gameState.selectedStack = { fromPlate: plateIndex, stack: movableStack };

            } else { // Move the selected stack
                const { fromPlate, stack } = gameState.selectedStack;
                
                if (stack[0].type === specialItems.bomb.id) {
                    clearPlateWithBomb(plateIndex, fromPlate);
                    return;
                }
                
                if (fromPlate === plateIndex) { // Deselect
                    gameState.selectedStack = null;
                } else if (canMoveStackTo(stack, clickedPlate)) {
                    moveStack(plateIndex);
                } else {
                    const plateWrapperEl = document.getElementById(`plate-${plateIndex}`).parentElement;
                    plateWrapperEl.classList.add('shake');
                    setTimeout(() => plateWrapperEl.classList.remove('shake'), 500);
                    gameState.selectedStack = null;
                }
            }
            renderGame();
        }
        
        function canMoveStackTo(stack, destinationPlate) {
            if (gameState.currentLevelType === 'sort') {
                return canMoveStackToSort(stack, destinationPlate);
            }
            return canMoveStackToClassic(stack, destinationPlate);
        }

        function canMoveStackToClassic(stack, destinationPlate) {
            if (!stack || stack.length === 0 || destinationPlate.length + stack.length > MAX_INGREDIENTS_PER_PLATE) return false;
            const stackType = stack[0].type;
            if ([specialItems.bomb.id, '🤢'].includes(stackType)) return false; 
        
            if (destinationPlate.length === 0) return true;
        
            const destTop = destinationPlate[destinationPlate.length - 1];
            const destType = destTop.type;
            if ([specialItems.bomb.id, '🤢'].includes(destType)) return false;
        
            if (stackType === specialItems.wildcard.id) return true; 
        
            const stackOriginalType = stack[0].originalType || stackType;
            const destOriginalType = destTop.originalType || destType;
            
            return destType === specialItems.wildcard.id || stackOriginalType === destOriginalType;
        }

        function canMoveStackToSort(stack, destinationPlate) {
            if (!stack || stack.length === 0) return false;
            
            if (destinationPlate.length + stack.length > MAX_INGREDIENTS_PER_PLATE) {
                return false;
            }

            if (destinationPlate.length === 0) {
                return true;
            }

            const stackType = stack[0].originalType || stack[0].type;
            const destinationTopType = destinationPlate[destinationPlate.length - 1].originalType || destinationPlate[destinationPlate.length - 1].type;
            
            if (stack[0].type === specialItems.bomb.id || destinationPlate[destinationPlate.length - 1].type === specialItems.bomb.id) return false;

            return stackType === destinationTopType;
        }
        
        function createAnimatedClone(ingredientData) {
            const clone = document.createElement('div');
            clone.className = 'ingredient';

            const typeId = ingredientData.type;
            const originalTypeId = ingredientData.originalType || typeId;
            
            const gradientClasses = (cozyGradientMap[typeId === specialItems.golden.id ? originalTypeId : typeId] || 'bg-stone-200').split(' ');
            clone.classList.add(...gradientClasses);

            if (typeId === specialItems.golden.id) {
                clone.classList.add('golden');
            }

            const inner = document.createElement('div');
            inner.className = 'ingredient-inner';

            const masterData = allIngredientData[typeId === specialItems.golden.id ? originalTypeId : typeId];

            if (masterData && masterData.imageUrl) {
                const img = document.createElement('img');
                img.src = masterData.imageUrl;
                img.alt = masterData.name;
                inner.appendChild(img);
            } else {
                inner.textContent = masterData ? masterData.emoji : '?';
                inner.style.fontSize = '2.5rem';
            }
            
            clone.appendChild(inner);
            return clone;
        }

        function handleRecipeClick() {
            if (gameState.isAnimating || !isStackDeliverable(gameState.selectedStack)) {
                if (gameState.selectedStack) {
                    orderInfoEl.classList.add('shake');
                    setTimeout(() => orderInfoEl.classList.remove('shake'), 500);
                    gameState.selectedStack = null;
                    renderGame();
                }
                return;
            }
            const { fromPlate, stack } = gameState.selectedStack;
            const type = stack[0].type;
            const originalType = stack[0].originalType || type;
            gameState.isAnimating = true;

            if (gameState.currentRecipe.customerType === 'picky') {
                gameState.currentRecipe.ingredientOrder.splice(0, stack.length);
            } else {
                if (type === specialItems.wildcard.id) {
                    const neededIngredientId = Object.keys(gameState.currentRecipe.ingredients).find(ingId =>
                        gameState.currentRecipe.needed[ingId] > 0 && stack.length >= gameState.currentRecipe.ingredients[ingId]
                    );
                    if (neededIngredientId) {
                        gameState.currentRecipe.needed[neededIngredientId] = 0;
                    }
                } else {
                    if (gameState.currentRecipe.needed[originalType] > 0) {
                         gameState.currentRecipe.needed[originalType] = 0;
                    }
                }
            }

            let starsEarned = type === specialItems.golden.id ? 50 : 15;
            if (gameState.currentRecipe.isVIP) starsEarned += 20;
            if (gameState.currentRecipe.customerType === 'picky') starsEarned += 10;
            gameState.stars += starsEarned;
            gameState.selectedStack = null;
            const deliveredIngredients = gameState.plates[fromPlate].splice(-stack.length);
            renderGame(); 

            const orderRect = orderInfoEl.getBoundingClientRect();
            const startRect = document.getElementById(`plate-${fromPlate}`).parentElement.getBoundingClientRect();
            deliveredIngredients.reverse().forEach((ingredientData, index) => {
                const clone = createAnimatedClone(ingredientData);
                Object.assign(clone.style, {
                    position: 'fixed',
                    zIndex: 1000 - index,
                    transition: 'all 0.4s cubic-bezier(0.5, -0.5, 0.75, 1.2)',
                    left: `${startRect.left + (startRect.width / 2) - 20}px`,
                    top: `${startRect.top + (startRect.height / 2) - 20}px`
                });
                animationLayer.appendChild(clone);
                setTimeout(() => Object.assign(clone.style, {
                    left: `${orderRect.left + (orderRect.width / 2) - 20}px`,
                    top: `${orderRect.top + (orderRect.height / 2) - 20}px`,
                    transform: 'scale(0.5)',
                    opacity: '0'
                }), index * 50);
                setTimeout(() => {
                    clone.remove();
                    if (index === deliveredIngredients.length - 1) {
                        gameState.isAnimating = false;
                        if (isOrderComplete()) {
                            handleOrderCompletion();
                        } else {
                            renderGame();
                        }
                    }
                }, index * 50 + 400);
            });
        }
        function moveStack(toPlateIndex) {
            if (gameState.isAnimating) return; const { fromPlate, stack } = gameState.selectedStack; gameState.isAnimating = true; gameState.selectedStack = null; gameState.plates[fromPlate].splice(-stack.length); renderGame();
            const startRect = document.getElementById(`plate-${fromPlate}`).parentElement.getBoundingClientRect(); const endRect = document.getElementById(`plate-${toPlateIndex}`).parentElement.getBoundingClientRect();
            stack.slice().reverse().forEach((ingredientData, index) => {
                const clone = createAnimatedClone(ingredientData); Object.assign(clone.style, { position: 'fixed', zIndex: 1000 - index, transition: 'all 0.4s cubic-bezier(0.5, -0.5, 0.75, 1.2)', left: `${startRect.left + (startRect.width / 2) - 20}px`, top: `${startRect.top + (startRect.height / 2) - 20}px`, transform: `translateZ(${ (gameState.plates[fromPlate].length + stack.length - index) * 5 }px) scale(1.1)` });
                animationLayer.appendChild(clone);
                setTimeout(() => Object.assign(clone.style, { left: `${endRect.left + (endRect.width / 2) - 20}px`, top: `${endRect.top + (endRect.height / 2) - 20}px`, transform: `translateZ(${ (gameState.plates[toPlateIndex].length + stack.length - index) * 5 }px) scale(1)` }), index * 40);
                setTimeout(() => { clone.remove(); if (index === stack.length - 1) { gameState.plates[toPlateIndex].push(...stack); gameState.isAnimating = false; renderGame(); } }, index * 40 + 400);
            });
        }
        function animateDeal(deals) {
            gameState.isAnimating = true; const dealButtonRect = dealButton.getBoundingClientRect();
            deals.forEach((deal, dealIndex) => {
                const { toPlateIndex, ingredient } = deal; const endRect = document.getElementById(`plate-${toPlateIndex}`).parentElement.getBoundingClientRect();
                const clone = createAnimatedClone(ingredient); Object.assign(clone.style, { position: 'fixed', zIndex: 1000 - dealIndex, transition: 'all 0.4s cubic-bezier(0.3, 0, 0.4, 1), opacity 0.3s ease-in-out', left: `${dealButtonRect.left + (dealButtonRect.width / 2) - 20}px`, top: `${dealButtonRect.top + (dealButtonRect.height / 2) - 20}px`, transform: 'scale(0.8)', opacity: '0' });
                animationLayer.appendChild(clone);
                setTimeout(() => Object.assign(clone.style, { opacity: '1', left: `${endRect.left + (endRect.width / 2) - 20}px`, top: `${endRect.top + (endRect.height / 2) - 20}px`, transform: `scale(1) translateZ(${gameState.plates[toPlateIndex].length * 5}px)` }), 50 + dealIndex * 70); 
                setTimeout(() => { clone.remove(); if (dealIndex === deals.length - 1) { deals.forEach(d => { gameState.plates[d.toPlateIndex].push(d.ingredient); }); gameState.isAnimating = false; renderGame(); } }, 50 + dealIndex * 70 + 400);
            });
        }
        
        function isStackDeliverable(selectedStack) {
            if (!selectedStack) return false;
            
            if (gameState.currentLevelType === 'sort') {
                return isStackDeliverableSort(selectedStack);
            }
            return isStackDeliverableClassic(selectedStack);
        }

        function isStackDeliverableClassic(selectedStack) {
            const recipe = gameState.currentRecipe;
            if (!recipe) return false;
            const { stack } = selectedStack;
            if (stack.length === 0) return false;
            const type = stack[0].type;
            const originalType = stack[0].originalType || type;
            if (type === specialItems.bomb.id || type === '🤢') return false;

            if (recipe.customerType === 'picky') {
                if (recipe.ingredientOrder.length === 0) return false;
                const nextRequired = recipe.ingredientOrder[0];

                // The stack must be of the correct type (or a wildcard that can act as it)
                if (type !== specialItems.wildcard.id && originalType !== nextRequired) {
                    return false;
                }

                // Count how many of this type are required consecutively from the start of the order
                let consecutiveCount = 0;
                for(const item of recipe.ingredientOrder) {
                    if (item === nextRequired) {
                        consecutiveCount++;
                    } else {
                        break;
                    }
                }
                // To be deliverable, the selected stack must have exactly the required number of consecutive items
                return stack.length === consecutiveCount;
            }

            // Standard recipe logic
            if (type === specialItems.wildcard.id) {
                return Object.entries(recipe.ingredients).some(([ingId, requiredCount]) => {
                    return recipe.needed[ingId] > 0 && stack.length >= requiredCount;
                });
            }
            
            const isStillNeeded = recipe.needed[originalType] > 0;
            const requiredAmount = recipe.ingredients[originalType];
            if (!isStillNeeded || !requiredAmount) return false;
            
            return stack.length >= requiredAmount;
        }

        function isStackDeliverableSort(selectedStack) {
            const recipe = gameState.currentRecipe;
            if (!recipe) return false;
            const { fromPlate, stack } = selectedStack;
            if (stack.length === 0) return false;
            
            const plate = gameState.plates[fromPlate];
            if (stack.length !== plate.length) {
                return false;
            }

            const originalType = stack[0].originalType || stack[0].type;
            const isStillNeeded = recipe.needed[originalType] > 0;
            const requiredAmount = recipe.ingredients[originalType];

            if (!isStillNeeded || !requiredAmount) return false;

            return stack.length >= requiredAmount;
        }

        function isOrderComplete() { if (!gameState.currentRecipe) return false; if(gameState.currentRecipe.customerType === 'picky') return gameState.currentRecipe.ingredientOrder.length === 0; return Object.values(gameState.currentRecipe.needed).every(count => count <= 0); }
        
        function handleGameWon() { showMessage("¡Felicitaciones!", "¡Has dominado la cocina!", [{ text: "Jugar de Nuevo", action: () => showScreen(homeScreenEl), primary: true }]); }
        function handleTrashClick() {
            if (gameState.isAnimating || !gameState.selectedStack || gameState.trashUsesLeft <= 0) return;
            const { fromPlate, stack } = gameState.selectedStack; if (stack[0].type === specialItems.bomb.id) return;
            gameState.trashUsesLeft--; gameState.isAnimating = true; gameState.selectedStack = null;
            const trashedIngredients = gameState.plates[fromPlate].splice(-stack.length); renderGame();
            const trashRect = trashCanEl.getBoundingClientRect(); const startRect = document.getElementById(`plate-${fromPlate}`).parentElement.getBoundingClientRect();
            trashedIngredients.reverse().forEach((ingredientData, index) => {
                const clone = createAnimatedClone(ingredientData); Object.assign(clone.style, { position: 'fixed', zIndex: 1000 - index, transition: 'all 0.5s cubic-bezier(0.5, -0.5, 0.2, 1)', left: `${startRect.left + (startRect.width / 2) - 20}px`, top: `${startRect.top + (startRect.height / 2) - 20}px` });
                animationLayer.appendChild(clone);
                setTimeout(() => Object.assign(clone.style, { left: `${trashRect.left + (trashRect.width / 2) - 15}px`, top: `${trashRect.top + (trashRect.height / 2) - 15}px`, transform: 'scale(0.3)', opacity: '0' }), index * 50);
                setTimeout(() => { clone.remove(); if(index === trashedIngredients.length - 1) { gameState.isAnimating = false; renderGame(); } }, index * 50 + 500);
            });
        }
        function clearPlateWithBomb(targetPlateIndex, bombPlateIndex) {
            if (gameState.isAnimating) return; gameState.isAnimating = true; gameState.selectedStack = null; gameState.plates[bombPlateIndex].pop();
            const ingredientsToClear = [...gameState.plates[targetPlateIndex]]; gameState.plates[targetPlateIndex] = []; renderGame();
            const targetRect = document.getElementById(`plate-${targetPlateIndex}`).parentElement.getBoundingClientRect();
            if(ingredientsToClear.length === 0) { gameState.isAnimating = false; renderGame(); return; }
            ingredientsToClear.forEach((ingredient, index) => {
                const clone = createAnimatedClone(ingredient); Object.assign(clone.style, { position: 'fixed', zIndex: 1000 - index, transition: 'all 0.5s ease-out', left: `${targetRect.left + (targetRect.width / 2) - 20}px`, top: `${targetRect.top + (targetRect.height / 2) - 20}px` });
                animationLayer.appendChild(clone);
                setTimeout(() => {
                    const angle = Math.random() * 2 * Math.PI, distance = 150 + Math.random() * 50;
                    clone.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5) rotate(${Math.random() * 360}deg)`;
                    clone.style.opacity = '0';
                }, 50);
                setTimeout(() => { clone.remove(); if(index === ingredientsToClear.length - 1) { gameState.isAnimating = false; renderGame(); } }, 550);
            });
        }
        
        // --- INITIALIZATION & LISTENERS ---
        startGameButton.addEventListener('click', showLevelMap);
        resetProgressButton.addEventListener('click', resetProgress);
        backToHomeButton.addEventListener('click', () => showScreen(homeScreenEl));
        backToMapButton.addEventListener('click', showLevelMap);
        dealButton.addEventListener('click', dealRow);
        orderInfoEl.addEventListener('click', handleRecipeClick);
        trashCanEl.addEventListener('click', handleTrashClick);
        const openHowToPlayModal = () => { howToPlayModal.classList.remove('opacity-0', 'pointer-events-none'); howToPlayContent.classList.remove('scale-95'); };
        const closeHowToPlayModal = () => { howToPlayModal.classList.add('opacity-0'); howToPlayContent.classList.add('scale-95'); setTimeout(() => howToPlayModal.classList.add('pointer-events-none'), 300); };
        howToPlayButton.addEventListener('click', openHowToPlayModal);
        howToPlayCloseButton.addEventListener('click', closeHowToPlayModal);
        howToPlayCloseButtonX.addEventListener('click', closeHowToPlayModal);
        howToPlayModal.addEventListener('click', (e) => e.target === howToPlayModal && closeHowToPlayModal());
        window.addEventListener('beforeunload', () => { if(window.firebaseIntegration) saveProgress(); });
        window.dishDashGame = { loadProgress, resetGameStateToDefault };
    });
