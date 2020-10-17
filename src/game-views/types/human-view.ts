/** @module game-views/types */

//#region Imports
import { IGameView } from "../game-view-interface";
import { Renderer } from "../../components/types/renderer";
import { GameCore } from "../../game/game-core";
import { BaseGameLogic } from "../../game-logic/base-game-logic";
//#endregion

/**
 *
 *
 * @export
 * @class HumanView
 * @implements {IGameView}
 */
export class HumanView implements IGameView {
    //#region Fields
    /**
     *
     *
     * @type {string}
     * @memberof HumanView
     */
    public name: string = "HumanView";
    /**
     *
     *
     * @type {string}
     * @memberof HumanView
     */
    public type: string = "HumanView";
    /**
     *
     *
     * @type {boolean}
     * @memberof HumanView
     */
    public autoUpdate: boolean = false;
    /**
     *
     *
     * @type {boolean}
     * @memberof HumanView
     */
    public reInit: boolean = true;
    /**
     *
     *
     * @type {boolean}
     * @memberof HumanView
     */
    public requestShutdown: boolean = false;
    /**
     *
     *
     * @type {BaseGameLogic}
     * @memberof HumanView
     */
    public gameLogic: BaseGameLogic;
    /**
     *
     *
     * @private
     * @type {string}
     * @memberof HumanView
     */
    private rendererName: string = "";
    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberof HumanView
     */
    private isInitialized: boolean = false;
    /**
     *
     *
     * @private
     * @type {*}
     * @memberof HumanView
     */
    private clearColor: any = {
        r: 0.0,
        g: 0.0,
        b: 0.0,
        a: 0.0
    };

    /**
     *
     *
     * @private
     * @type {Function}
     * @memberof HumanView
     */
    private cbSceneLoader: Function = function (scene: BABYLON.Scene, canvas: HTMLCanvasElement): BABYLON.Scene {
        let defaultCamera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera_default", new BABYLON.Vector3(-5, 10, -5), scene);

        defaultCamera.setTarget(BABYLON.Vector3.Zero());
        defaultCamera.attachControl(canvas, true);

        return scene;
    };
    //#endregion
    
    //#region Accessors
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof HumanView
     */
    public VIsInitialized(): boolean {
        return this.isInitialized;
    }

    /**
     *
     *
     * @memberof HumanView
     */
    public VReInit(): void {
        this.reInit = true;
    }

    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof HumanView
     */
    public VIsReInit(): boolean {
        return this.reInit;
    }

    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof HumanView
     */
    public VShutdownRequested(): boolean {
        return this.requestShutdown;
    }

    /**
     *
     *
     * @memberof HumanView
     */
    public VRequestShutdown(): void {
        this.requestShutdown = true;
    }

    /**
     *
     *
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     * @memberof HumanView
     */
    public SetBackgroundColor(r: number, g: number, b: number, a: number): void {
        this.clearColor.r = r;
        this.clearColor.g = g;
        this.clearColor.b = b;
        this.clearColor.a = a;
    }

    /**
     *
     *
     * @param {string} name
     * @memberof HumanView
     */
    public SetRendererName(name: string) {
        this.rendererName = name;
    }

    /**
     *
     *
     * @param {Function} cbSceneFunc
     * @memberof HumanView
     */
    public SetSceneLoader(cbSceneFunc: Function): void {
        this.cbSceneLoader = cbSceneFunc;
    }
    //#endregion
    
    /**
     * Creates an instance of HumanView.
     * @param {string} name
     * @param {BaseGameLogic} gameLogic
     * @memberof HumanView
     */
    constructor(name: string, gameLogic: BaseGameLogic) {
        this.name = name;
        this.gameLogic = gameLogic;
    }

    //#region Control Method Overrides
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof HumanView
     */
    public VInit(): boolean {
        let renderer = GameCore.game.comMan.GetByName<Renderer>(this.rendererName);

        renderer.CreateScene(this.cbSceneLoader);

        this.isInitialized = true;
        this.reInit = false;
        return true;
    }

    /**
     *
     *
     * @return {*}  {void}
     * @memberof HumanView
     */
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

    /**
     *
     *
     * @memberof HumanView
     */
    public VShutdown(): void {
        if (this.requestShutdown === true) {
            this.isInitialized = false;
            this.requestShutdown = false;
        }
    }
    //#endregion
}

// Renderer component creator
/**
 *
 *
 * @export
 * @param {string} name
 * @param {BaseGameLogic} gameLogic
 * @return {*}  {HumanView}
 */
export function Create(name: string, gameLogic: BaseGameLogic): HumanView {
    return new HumanView(name, gameLogic);
}
