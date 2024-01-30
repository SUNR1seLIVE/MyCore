export default class DomControl{
    private resizeTimer: number;
    private eventContainerResize: CustomEvent = new CustomEvent(
        'container-resize'
    )

    private container: HTMLDivElement;
    public canvas: HTMLCanvasElement;

    constructor() {}

    init(container: HTMLDivElement): void{
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
        }).observe(<HTMLDivElement>this.container);

        this.addCanvasClassName("furn-engine-canvas");
    }

    private onContainerResize(): void {
        this.canvas.dispatchEvent(this.eventContainerResize);
    }

    createCanvas(): HTMLCanvasElement {
        return document.createElement("canvas");
    }

    addCanvasClassName(className: string): void {
        this.canvas.classList.add(className);
    }

    getCanvasResolution(): { w: number; h: number } {
        return { w: this.canvas.width, h: this.canvas.height };
    }

    addContainerClassName(className: string): void {
        this.container.classList.add(className);
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getContainer(): HTMLDivElement {
        return this.container;
    }

    setCursorStyle(style: "pointer" | "grabbing" | "move"): void {
        this.canvas.style.cursor = style;
    }

    resetCursorStyle(): void {
        this.canvas.style.cursor = "default";
    }

}