import DomControl from "./viewer/domControl.js";
export default class Core{
    static domControl: DomControl;

    // static project: Project;
    // static roomControl: RoomControl;

    // static keyEvents: KeyEvents;
    // static interactive: Interactive;

    static init(): void{
        Core.domControl = new DomControl();
    }
}