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

        if ((window.player.x + window.player.size) > this.worldWidth) {
            this.setNextMap();
        }
        else if (window.player.x < 0){
            this.setPreviousMap();
        }
    }

    setMap(index, from = 'next') {
        if (this.isChangingMap) return;
        this.isChangingMap = true;
        this.openLoadingMap();
        window.player.x = from == 'next' ? window.player.size + 100 : this.worldWidth - window.player.size - 100;

        setTimeout(() => {
            // reset enemies
            window.enemy = getCurrentMonster();

            // set map
            const map = Maps[index]
            this.gameContainer.style.backgroundImage = `url(${map.background})`
            this.gameContainer.style.backgroundRepeat = 'repeat-x';
            this.gameContainer.style.backgroundSize = 'cover';
            this.floor.style.backgroundColor = map.floor;

            this.isChangingMap = false;
            this.closeLoadingMap();
        }, 2000)
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
}