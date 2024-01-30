import Core from "./core/core.js";

export default class FurnEngine{
    init(container: HTMLDivElement, id: number){
        Core.init();
        Core.domControl.init(container);
    }
 }