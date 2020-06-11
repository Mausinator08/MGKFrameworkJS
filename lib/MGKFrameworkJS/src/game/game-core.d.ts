import { ComponentManager } from "./component-manager.js";
import { BaseGameLogic } from "./../game-logic/base-game-logic.js";
export declare class GameCore {
    preInitFunc: Function;
    _canvas: HTMLCanvasElement;
    comMan: ComponentManager;
    protected quitting: boolean;
    protected exitting: boolean;
    createdComponents: string[];
    protected exitCode: number;
    gameLogic: BaseGameLogic;
    protected isInitialized: boolean;
    protected reInit: boolean;
    static game: GameCore;
    static SetGameType<T>(gameType: T): void;
    constructor(canvasElement: string, comPath: string, logic: BaseGameLogic);
    get ReInit(): boolean;
    ReInitialize(): void;
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    Quitting(): boolean;
    Quit(): void;
    Exitting(): boolean;
    Exit(): void;
    CancelExit(): void;
}
export declare function OnDOMContentLoaded(cbLoadGame: Function): void;
//# sourceMappingURL=game-core.d.ts.map