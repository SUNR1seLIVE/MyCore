import View from "./view.js";
import Core from "../../core.js";
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class SceneView extends View{
    private handlers: {
        onContainerResize: () => void;
    } = {
        onContainerResize: () => this.onContainerResize(),
    }

    private eventCanvasResize: CustomEvent<{ w: number; h: number }> =
        new CustomEvent("canvas-resize", {
            detail: { w: 0, h: 0 },
        });

    declare canvas: HTMLCanvasElement;

    declare scene: Scene;

    declare renderer: WebGLRenderer;
    declare camera: PerspectiveCamera;
    declare controls: OrbitControls;

    maxAnisotropy = 1;

    constructor(canvas: HTMLCanvasElement, name: string) {
        super(name);
        this.canvas = canvas;

        this.init();
    }
    
    init(){

    }

    private onContainerResize(): void {
        this.setCanvasSize();
    }

    private setCanvasSize(): void {
        const container = Core.domControl.getContainer();
        const rect = container.getBoundingClientRect();

        const w = rect.right - rect.left;
        const h = rect.bottom - rect.top;

        if (this.camera) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        }

        this.renderer.setSize(w, h);

        this.eventCanvasResize.detail.w = this.canvas.width;
        this.eventCanvasResize.detail.h = this.canvas.height;
        this.canvas.dispatchEvent(this.eventCanvasResize);

        Core.project.renderRequest();
    }
}