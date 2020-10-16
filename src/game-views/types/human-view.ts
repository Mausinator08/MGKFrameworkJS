//#region Imports
import { IGameView } from "../game-view-interface.js";
import { Renderer } from "../../components/types/renderer.js";
import { GameCore } from "../../game/game-core.js";
//#endregion

export class HumanView implements IGameView {
    //#region Fields
    public name: string = "HumanView";
    public type: string = "HumanView";
    public autoUpdate: boolean = false;
    public reInit: boolean = true;
    public requestShutdown: boolean = false;
    private rendererName: string = "";
    private isInitialized: boolean = false;
    private clearColor: any = {
        r: 0.0,
        g: 0.0,
        b: 0.0,
        a: 0.0
    };

    private cbSceneLoader: Function = function (scene: BABYLON.Scene, canvas: HTMLCanvasElement): BABYLON.Scene {
        let defaultCamera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera_default", new BABYLON.Vector3(-5, 10, -5), scene);

        defaultCamera.setTarget(BABYLON.Vector3.Zero());
        defaultCamera.attachControl(canvas, true);

        return scene;
    };
    //#endregion
    
    //#region Accessors
    public VIsInitialized(): boolean {
        return this.isInitialized;
    }

    public VReInit(): void {
        this.reInit = true;
    }

    public VIsReInit(): boolean {
        return this.reInit;
    }

    public VShutdownRequested(): boolean {
        return this.requestShutdown;
    }

    public VRequestShutdown(): void {
        this.requestShutdown = true;
    }

    public SetBackgroundColor(r: number, g: number, b: number, a: number): void {
        this.clearColor.r = r;
        this.clearColor.g = g;
        this.clearColor.b = b;
        this.clearColor.a = a;
    }

    public SetRendererName(name: string) {
        this.rendererName = name;
    }

    public SetSceneLoader(cbSceneFunc: Function): void {
        this.cbSceneLoader = cbSceneFunc;
    }
    //#endregion
    
    constructor(name: string) {
        this.name = name;
    }

    //#region Control Method Overrides
    public VInit(): boolean {
        let renderer = GameCore.game.comMan.GetByName<Renderer>(this.rendererName);

        renderer.CreateScene(this.cbSceneLoader);

        this.isInitialized = true;
        this.reInit = false;
        return true;
    }

    public VUpdate(): void {
        if (GameCore.game.Quitting() === true) {
            this.requestShutdown = true;
        }

        if (this.isInitialized === false) {
            console.warn("HumanView: VUpdate() -> The human view [" + this.name + "] called update without being initialized!\n" +
            "Call the VInit() function and ensure it returns true before calling VUpdate().");
            return;
        }

        let renderer = GameCore.game.comMan.GetByName<Renderer>(this.rendererName);

        if (renderer.IsInitialized === false) {
            console.warn("HumanView: VUpdate() -> The human view has detected that the renderer is not initialized!");
            return;
        }

        // Grab and clear the background color to start the scene rendering.
        let cc = this.clearColor;
        renderer.BeginScene(cc.r, cc.g, cc.b, cc.a);
        // Call this to end the rendering scene and present it to the screen.
        renderer.EndScene();
    }

    public VShutdown(): void {
        if (this.requestShutdown === true) {
            this.isInitialized = false;
            this.requestShutdown = false;
        }
    }
    //#endregion
}

// Renderer component creator
export function Create(name: string): HumanView {
    return new HumanView(name);
}
