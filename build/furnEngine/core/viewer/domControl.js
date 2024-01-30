export default class DomControl {
    resizeTimer;
    eventContainerResize = new CustomEvent('container-resize');
    container;
    canvas;
    constructor() { }
    init(container) {
        this.container = container;
        this.canvas = this.createCanvas();
        this.container.appendChild(this.canvas);
        new ResizeObserver(() => {
            window.requestAnimationFrame(() => {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = window.setTimeout(() => {
                    this.onContainerResize();
                }, 100);
            });
        }).observe(this.container);
        this.addCanvasClassName("furn-engine-canvas");
    }
    onContainerResize() {
        this.canvas.dispatchEvent(this.eventContainerResize);
    }
    createCanvas() {
        return document.createElement("canvas");
    }
    addCanvasClassName(className) {
        this.canvas.classList.add(className);
    }
    getCanvasResolution() {
        return { w: this.canvas.width, h: this.canvas.height };
    }
    addContainerClassName(className) {
        this.container.classList.add(className);
    }
    getCanvas() {
        return this.canvas;
    }
    getContainer() {
        return this.container;
    }
    setCursorStyle(style) {
        this.canvas.style.cursor = style;
    }
    resetCursorStyle() {
        this.canvas.style.cursor = "default";
    }
}
//# sourceMappingURL=domControl.js.map