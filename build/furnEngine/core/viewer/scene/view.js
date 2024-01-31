import { Group } from "three";
export default class View {
    furnGroup;
    roomGroup;
    helperGroup;
    constructor(name) {
        this.name = name;
    }
    initFurnGroup() {
        this.furnGroup = new Group();
        this.furnGroup.name = "furnGroup";
        this.scene.add(this.furnGroup);
    }
    initRoomGroup() {
        this.roomGroup = new Group();
        this.roomGroup.name = "roomGroup";
        this.scene.add(this.roomGroup);
    }
    /**
     * Перерасчёт настроек рендера и камеры, при изменении размера окна
     */
    renderResize() {
        const aspect = this.canvas.width / this.canvas.height;
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }
    getMaxAnisotropy() {
        return this.renderer.capabilities.getMaxAnisotropy();
    }
    addObjectToScene(object3D) {
        const genus = object3D.userData.genus;
        if (genus === "furn") {
            this.furnGroup.add(object3D);
        }
        else if (genus === "room") {
            this.roomGroup.add(object3D);
        }
        else if (genus === "helper") {
            this.helperGroup.add(object3D);
        }
        else {
            this.scene.add(object3D);
        }
    }
    removeObjectFromScene(object3D) {
        const genus = object3D.userData.genus;
        if (genus === "furn") {
            this.furnGroup.remove(object3D);
        }
        else if (genus === "room") {
            this.roomGroup.remove(object3D);
        }
        else if (genus === "helper") {
            this.helperGroup.remove(object3D);
        }
        else {
            this.scene.remove(object3D);
        }
    }
    remove() {
        this.clear();
        this.renderer.dispose();
    }
    getName() {
        return this.name;
    }
    getScene() {
        return this.scene;
    }
    getCanvas() {
        return this.canvas;
    }
    getPerspectiveCamera() {
        return this.camera;
    }
    clearFurn() {
        this.furnGroup.clear();
    }
    clearRoom() {
        this.roomGroup.clear();
    }
    clear() {
        this.clearFurn();
        this.clearRoom();
    }
    getRelativePointerXY(x, y) {
        const rect = this.canvas.getBoundingClientRect();
        return { x: x - rect.left, y: y - rect.top };
    }
    enableOrbitControls() {
        this.controls.enabled = true;
    }
    disableOrbitControls() {
        this.controls.enabled = false;
    }
}
//# sourceMappingURL=view.js.map