class SpriteManager {
    constructor(element, config) {
        this.$element = element;
        this.config = config;
        this.state = 'idle';
        this.slowedBy = 0;
        this.slowFrameRate = 4;
        this.stopped = false;
        this.lastState = 'idle';

        this.$element.style.width = `${this.config[this.state].width}px`;
        this.$element.style.height = `${this.config[this.state].height}px`;
    }

    update() {
       this.draw()
    }

    setState(state) {
        if (this.stopped) return;
        if (this.lastState !== state) {
            this.config[state].frame = 1;
        };
        this.state = state;
        this.lastState = state;
    }

    draw() {
        if (this.stopped) {
            this.$element.style.backgroundImage = 'none';
            this.$element.style.backgroundPosition = '0px 0px';
            return;
        }
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
        this.$element.style.backgroundImage = `url(${selectedFrame.src})`
        this.$element.style.backgroundPosition = `${-frameX}px ${selectedFrame.height}px`
    }
}