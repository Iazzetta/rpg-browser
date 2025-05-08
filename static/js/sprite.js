class SpriteManager {
    constructor(element, config) {
        this.element = element;
        this.config = config;
        this.state = 'idle';
        this.slowedBy = 0;
        this.slowFrameRate = 4;

        this.element.style.width = `${this.config[this.state].width}px`;
        this.element.style.height = `${this.config[this.state].height}px`;
    }

    update() {
       this.draw()
    }

    setState(state) {
        this.state = state;
    }

    draw() {
        const selectedFrame = this.config[this.state];

        if (this.slowedBy >= this.slowFrameRate) {
            if (selectedFrame.frame >= selectedFrame.frames) {
                selectedFrame.frame = 1;
            } else {
                selectedFrame.frame++;
            }
            this.slowedBy = 0;
        } else {
            this.slowedBy++;
        }
        const frameX = selectedFrame.frame * selectedFrame.width;
        this.element.style.backgroundImage = `url(${selectedFrame.src})`
        this.element.style.backgroundPosition = `${-frameX}px ${selectedFrame.height}px`
    }
}