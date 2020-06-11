import { ViewManager } from "./../game-logic/game-view-manager.js";
export declare class BaseGameLogic {
    preInitFunc: Function;
    protected paused: boolean;
    protected isInitialized: boolean;
    isServerLogic: boolean;
    viewMan: ViewManager;
    createdViews: string[];
    protected reInit: boolean;
    protected requestShutdown: boolean;
    constructor(viewPath: string);
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
}
//# sourceMappingURL=base-game-logic.d.ts.map