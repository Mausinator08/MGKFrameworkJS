/** @module components/types */

//#region Imports
import * as BABYLON from 'babylonjs';
import { Component } from './../component';
import { Color4 } from 'babylonjs';
import { GameCore } from './../../game/game-core';
//#endregion

// BabylonJS renderer - this needs to be created and initialized after all other dependent components.
/**
 *
 *
 * @export
 * @class Renderer
 * @extends {Component}
 */
export class Renderer extends Component {
    //#region Fields
    /**
     *
     *
     * @private
     * @type {HTMLCanvasElement}
     * @memberof Renderer
     */
    private _canvas: HTMLCanvasElement;
    /**
     *
     *
     * @private
     * @type {BABYLON.Engine}
     * @memberof Renderer
     */
    private _engine: BABYLON.Engine;
    /**
     *
     *
     * @private
     * @type {BABYLON.Scene}
     * @memberof Renderer
     */
    private _scene: BABYLON.Scene;
    /**
     *
     *
     * @private
     * @type {GameCore}
     * @memberof Renderer
     */
    private gameCore: GameCore;
    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberof Renderer
     */
    private runLoop: boolean = false;
    //#endregion

    /**
     * Creates an instance of Renderer.
     * @param {string} name
     * @memberof Renderer
     */
    constructor(name: string) {
        super(name, "renderer");
    }

    //#region Properties
    /**
     *
     *
     * @type {HTMLCanvasElement}
     * @memberof Renderer
     */
    public get Canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    /**
     *
     *
     * @memberof Renderer
     */
    public set Canvas(value: HTMLCanvasElement) {
        this._canvas = value;
    }

    /**
     *
     *
     * @type {BABYLON.Engine}
     * @memberof Renderer
     */
    public get Engine(): BABYLON.Engine {
        return this._engine;
    }

    /**
     *
     *
     * @memberof Renderer
     */
    public set Engine(value: BABYLON.Engine) {
        this._engine = value;
    }

    /**
     *
     *
     * @type {BABYLON.Scene}
     * @memberof Renderer
     */
    public get Scene(): BABYLON.Scene {
        return this._scene;
    }

    /**
     *
     *
     * @memberof Renderer
     */
    public set Scene(value: BABYLON.Scene) {
        this._scene = value;
    }
    //#endregion

    //#region Accessors
    /**
     *
     *
     * @param {GameCore} game
     * @memberof Renderer
     */
    public SetGameCore(game: GameCore): void {
        this.gameCore = game;
    }

    /**
     *
     *
     * @param {HTMLCanvasElement} canvas
     * @memberof Renderer
     */
    public SetCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
    }

    /**
     *
     *
     * @param {Function} cbModifyScene
     * @memberof Renderer
     */
    public ModifyScene(cbModifyScene: Function): void {
        this._scene = cbModifyScene(this._scene, this._canvas);
    }
    //#endregion

    //#region CRUD Ops
    /**
     *
     *
     * @param {Function} cbLoadScene
     * @memberof Renderer
     */
    public CreateScene(cbLoadScene: Function): void {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(this._engine);
        this._scene = scene;

        this._scene = cbLoadScene(scene, this._canvas);
    }
    //#endregion
    
    //#region Scene Rendering
    /**
     *
     *
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     * @memberof Renderer
     */
    public BeginScene(r: number, g: number, b: number, a: number): void {
        this._scene.clearColor = new Color4(r, g, b, a);
    }

    /**
     *
     *
     * @memberof Renderer
     */
    public EndScene(): void {
        this._scene.render(false);
    }

    /**
     *
     *
     * @memberof Renderer
     */
    public StartRendering(): void {
        this.runLoop = true;
    }

    /**
     *
     *
     * @memberof Renderer
     */
    public StopRendering(): void {
        this._engine.stopRenderLoop();
    }
    //#endregion

    //#region Control Method Overrides
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof Renderer
     */
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

    /**
     *
     *
     * @memberof Renderer
     */
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

    /**
     *
     *
     * @memberof Renderer
     */
    public VShutdown(): void {
        super.VShutdown();
        this.runLoop = false;
    }
    //#endregion
};

// Renderer component creator
/**
 *
 *
 * @export
 * @param {string} name
 * @return {*}  {Renderer}
 */
export function Create(name: string): Renderer {
    return new Renderer(name);
}
