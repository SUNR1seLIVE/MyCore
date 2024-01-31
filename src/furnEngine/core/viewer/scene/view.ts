import {Group, Object3D, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {IPosition2D} from "../../types/commonTypes.js";

export default class View{
    declare canvas: HTMLCanvasElement;

    declare scene: Scene;

    declare renderer: WebGLRenderer;
    declare camera: PerspectiveCamera;
    declare controls: OrbitControls;

    declare maxAnisotropy: number;

    declare name: string;

    furnGroup: Group;
    roomGroup: Group;
    helperGroup: Group;

    constructor(name: string) {
        this.name = name;
    }

    initFurnGroup(){
        this.furnGroup = new Group();
        this.furnGroup.name = "furnGroup";
        this.scene.add(this.furnGroup);
    }

    initRoomGroup(){
        this.roomGroup = new Group();
        this.roomGroup.name = "roomGroup";
        this.scene.add(this.roomGroup);
    }

    /**
     * Перерасчёт настроек рендера и камеры, при изменении размера окна
     */
    renderResize(): void {
        const aspect = this.canvas.width / this.canvas.height;
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    render(): void {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    getMaxAnisotropy(): number {
        return this.renderer.capabilities.getMaxAnisotropy();
    }

    addObjectToScene(object3D: Object3D): void {
        const genus = object3D.userData.genus;
        if (genus === "furn") {
            this.furnGroup.add(object3D);
        } else if (genus === "room") {
            this.roomGroup.add(object3D);
        } else if (genus === "helper") {
            this.helperGroup.add(object3D);
        } else {
            this.scene.add(object3D);
        }
    }

    removeObjectFromScene(object3D: Object3D): void {
        const genus = object3D.userData.genus;
        if (genus === "furn") {
            this.furnGroup.remove(object3D);
        } else if (genus === "room") {
            this.roomGroup.remove(object3D);
        } else if (genus === "helper") {
            this.helperGroup.remove(object3D);
        } else {
            this.scene.remove(object3D);
        }
    }

    remove(): void {
        this.clear();
        this.renderer.dispose();
    }

    getName(): string {
        return this.name;
    }

    getScene(): Scene {
        return this.scene;
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getPerspectiveCamera(): PerspectiveCamera {
        return this.camera;
    }

    clearFurn(): void {
        this.furnGroup.clear();
    }

    clearRoom(): void {
        this.roomGroup.clear();
    }

    clear(): void {
        this.clearFurn();
        this.clearRoom();
    }
    getRelativePointerXY(x: number, y: number): IPosition2D {
        const rect = this.canvas.getBoundingClientRect();

        return { x: x - rect.left, y: y - rect.top };
    }

    enableOrbitControls(): void {
        this.controls.enabled = true;
    }

    disableOrbitControls(): void {
        this.controls.enabled = false;
    }
}