import DomControl from "./viewer/domControl.js";
export default class Core {
    static domControl;
    // static project: Project;
    // static roomControl: RoomControl;
    // static keyEvents: KeyEvents;
    // static interactive: Interactive;
    static init() {
        Core.domControl = new DomControl();
    }
}
//# sourceMappingURL=core.js.map