import { IGameView } from "./../game-view-interface.js";
export declare class HumanView implements IGameView {
    constructor(name: string);
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    VIsInitialized(): boolean;
    VReInit(): void;
    VIsReInit(): boolean;
    VShutdownRequested(): boolean;
    VRequestShutdown(): void;
    SetBackgroundColor(r: number, g: number, b: number, a: number): void;
    SetRendererName(name: string): void;
    name: string;
    type: string;
    autoUpdate: boolean;
    reInit: boolean;
    requestShutdown: boolean;
    private rendererName;
    private isInitialized;
    private clearColor;
}
export declare function Create(name: string): HumanView;
//# sourceMappingURL=human-view.d.ts.map