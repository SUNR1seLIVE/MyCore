import View from "./view.js";
import Core from "../../core.js";
export default class SceneView extends View {
    handlers = {
        onContainerResize: () => this.onContainerResize(),
    };
    eventCanvasResize = new CustomEvent("canvas-resize", {
        detail: { w: 0, h: 0 },
    });
    maxAnisotropy = 1;
    constructor(canvas, name) {
        super(name);
        this.canvas = canvas;
        this.init();
    }
    init() {
    }
    onContainerResize() {
        this.setCanvasSize();
    }
    setCanvasSize() {
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
//# sourceMappingURL=sceneView.js.map