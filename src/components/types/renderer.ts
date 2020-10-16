//#region Imports
import * as BABYLON from 'babylonjs';
import { Component } from './../component.js';
import { Color4 } from 'babylonjs';
import { GameCore } from './../../game/game-core.js';
//#endregion

// BabylonJS renderer - this needs to be created and initialized after all other dependent components.
export class Renderer extends Component {
    //#region Fields
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private gameCore: GameCore;
    private runLoop: boolean = false;
    //#endregion

    constructor(name: string) {
        super(name, "renderer");
    }

    //#region Properties
    public get Canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public set Canvas(value: HTMLCanvasElement) {
        this._canvas = value;
    }

    public get Engine(): BABYLON.Engine {
        return this._engine;
    }

    public set Engine(value: BABYLON.Engine) {
        this._engine = value;
    }

    public get Scene(): BABYLON.Scene {
        return this._scene;
    }

    public set Scene(value: BABYLON.Scene) {
        this._scene = value;
    }
    //#endregion

    //#region Accessors
    public SetGameCore(game: GameCore): void {
        this.gameCore = game;
    }

    public SetCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
    }

    public ModifyScene(cbModifyScene: Function): void {
        this._scene = cbModifyScene(this._scene, this._canvas);
    }
    //#endregion

    //#region CRUD Ops
    public CreateScene(cbLoadScene: Function): void {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(this._engine);
        this._scene = scene;

        this._scene = cbLoadScene(scene, this._canvas);
    }
    //#endregion
    
    //#region Scene Rendering
    public BeginScene(r: number, g: number, b: number, a: number): void {
        this._scene.clearColor = new Color4(r, g, b, a);
    }

    public EndScene(): void {
        this._scene.render(false);
    }

    public StartRendering(): void {
        this.runLoop = true;
    }

    public StopRendering(): void {
        this._engine.stopRenderLoop();
    }
    //#endregion

    //#region Control Method Overrides
    public VInit(): boolean {
        if (BABYLON.Engine.isSupported()) {
            const engine = new BABYLON.Engine(this._canvas, true);
            this._engine = engine;

            window.addEventListener('resize', function () {
                engine.resize();
            });

            this.isInitialized = true;
            return super.VInit();
        } else {
            return false;
        }
    }

    public VUpdate(): void {
        if (GameCore.game.Quitting() === true) {
            this.requestShutdown = true;
        }

        if (this.isInitialized) {
            if (this.runLoop) {
                this._engine.runRenderLoop(() => {
                    if (this.gameCore.VInit() === true) {
                        this.gameCore.VUpdate();
                    }

                    this.gameCore.VShutdown();
                });
                this.runLoop = false;
            }
        }
        super.VUpdate();
    }

    public VShutdown(): void {
        super.VShutdown();
        this.runLoop = false;
    }
    //#endregion
};

// Renderer component creator
export function Create(name: string): Renderer {
    return new Renderer(name);
}
