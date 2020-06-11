import { Component } from './../game/component.js';
import { GameCore } from './../game/game-core.js';
export declare class Renderer extends Component {
    private _canvas;
    private _engine;
    private _scene;
    private gameCore;
    private runLoop;
    constructor(name: string);
    SetGameCore(game: GameCore): void;
    SetCanvas(canvas: HTMLCanvasElement): void;
    CreateScene(cbLoadScene: Function): void;
    BeginScene(r: number, g: number, b: number, a: number): void;
    EndScene(): void;
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    StartRendering(): void;
    StopRendering(): void;
}
export declare function Create(name: string): Renderer;
//# sourceMappingURL=renderer.d.ts.map