class World {
    constructor() {
        this.gameContainer = document.querySelector('.game-container');
        this.floor = document.querySelector('.floor');
        this.currentMapIndex = 0;
        this.worldWidth = window.innerWidth;
        this.worldHeight = window.innerHeight;
        this.isChangingMap = false;
        this.setMap(this.currentMapIndex)
        this.initEvents();
    }

    update() {
        if (this.isChangingMap) return;

        if ((window.player.hitboxX + window.player.hitboxWidth) > this.worldWidth) {
            this.setNextMap();
        }
        else if (window.player.hitboxX < 0){
            this.setPreviousMap();
        }
    }

    setMap(index, from = 'next') {
        if (this.isChangingMap) return;
        window.player.blockMovement = true;
        this.isChangingMap = true;
        this.openLoadingMap();
    
        window.player.x = from == 'next' ? 40 : this.worldWidth - window.player.hitboxWidth - 100;

        setTimeout(() => {
            // reset monsters
            this.initEnemies()

            // set map
            const map = Maps[index]
            this.gameContainer.style.backgroundImage = `url(${map.background})`
            this.gameContainer.style.backgroundRepeat = 'repeat-x';
            this.gameContainer.style.backgroundSize = 'cover';
            this.floor.style.backgroundColor = map.floor;

            this.isChangingMap = false;
            this.closeLoadingMap();
            window.player.blockMovement = false;
        }, 500)
    }

    setPreviousMap() {
        if (this.currentMapIndex > 0) {
            this.currentMapIndex--;
            this.setMap(this.currentMapIndex, 'previous')
        }
    }

    setNextMap() {
        if (this.currentMapIndex < Maps.length - 1) {
            this.currentMapIndex++;
            this.setMap(this.currentMapIndex)
        }
    }

    initEvents() {
        window.addEventListener('resize', (ev) => {
            this.worldWidth = window.innerWidth;
            this.worldHeight = window.innerHeight;
        })
    }

    openLoadingMap() {
        document.querySelector('body').insertAdjacentHTML('beforeend', `
            <div class="loading-map">
                <div class="text">Carregando...</div>
            </div>    
        `)
    }

    closeLoadingMap() {
        try {
            document.querySelector('.loading-map').remove();
        } catch (error) {}
    }
    
    initEnemies() {
        window.enemies = [];
        document.querySelectorAll('.enemy').forEach(el => el.remove())
        for (const e of Maps[this.currentMapIndex].enemies) {
            const enemy = getCurrentMonsterById(e.enemy_id);
            for (let i = 0; i < e.amount; i++) {
                const newEnemy = new Enemy(enemy)
                newEnemy.x = randInt((window.innerWidth / 2) + enemy.size, window.innerWidth - enemy.size)
                newEnemy.speed = randInt(enemy.speed, enemy.speed + 1)
                window.enemies.push(newEnemy)
            }

        }
    }
}