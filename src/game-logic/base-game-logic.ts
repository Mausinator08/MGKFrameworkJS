/** @module game-logic */

//#region Imports
import { GameCore } from "./../game/game-core";
import { ViewManager } from "../game-views/game-view-manager";
import { HumanView } from "./../game-views/types/human-view";
import { IGameState } from "./game-state-interface";
import { StateManager } from "./game-state-manager";
//#endregion

/**
 *
 *
 * @export
 * @class BaseGameLogic
 */
export class BaseGameLogic {
    //#region Fields
    /**
     *
     *
     * @type {Function}
     * @memberof BaseGameLogic
     */
    /**
     *
     *
     * @type {Function}
     * @memberof BaseGameLogic
     */
    public preInitFunc: Function;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof BaseGameLogic
     */
    protected paused: boolean = false;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof BaseGameLogic
     */
    protected isInitialized: boolean = false;
    /**
     *
     *
     * @type {boolean}
     * @memberof BaseGameLogic
     */
    public isServerLogic: boolean = false;
    /**
     *
     *
     * @type {ViewManager}
     * @memberof BaseGameLogic
     */
    public viewMan: ViewManager;
    /**
     *
     *
     * @type {string[]}
     * @memberof BaseGameLogic
     */
    public createdViews: string[] = [];
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof BaseGameLogic
     */
    protected reInit: boolean = true;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof BaseGameLogic
     */
    protected requestShutdown: boolean = false;
    /**
     *
     *
     * @protected
     * @type {StateManager}
     * @memberof BaseGameLogic
     */
    protected stateManager: StateManager;
    //#endregion

    /**
     * Creates an instance of BaseGameLogic.
     * @param {string} viewPath
     * @param {string} statePath
     * @memberof BaseGameLogic
     */
    constructor(viewPath: string, statePath: string) {
        this.viewMan = new ViewManager(viewPath);
        this.stateManager = new StateManager(statePath);
    }

    //#region Control Method Overrides
    // OVERRIDES
    /**
     *
     *
     * @param {string} name
     * @param {string} type
     * @memberof BaseGameLogic
     */
    public CreateGameState(name: string, type: string): void {

    }

    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof BaseGameLogic
     */
    public VInit(): boolean {
        if (this.reInit === true) {
            if (this.preInitFunc !== null) {
                if (this.preInitFunc(this) === false) {
                    GameCore.game.Quit();
                    return false;
                } else {
                    this.viewMan.Init();
                    this.isInitialized = true;
                }
            }
        } else {
            this.viewMan.Init();
        }

        this.reInit = false;
        return true;
    }

    /**
     *
     *
     * @return {*}  {void}
     * @memberof BaseGameLogic
     */
    public VUpdate(): void {
        // Do not continue any further if we are not initialized or the game logic is paused.
        if (this.paused === true || this.isInitialized === false) {
            // At least check the human view if this is not set on a server so that a working dialog can still appear and be used for exit prompts and warnings/errors.
            if (this.isServerLogic === true) {
                // TODO: Something needs to check for whether or not we are shutting down the server here:
                return;
            }

            // Render all humans!
            if (this.viewMan.GetArrayByType<HumanView>("HumanView").length > 0) {
                this.viewMan.GetArrayByType<HumanView>("HumanView").forEach(hv => {
                    if (hv.VIsInitialized() === true) {
                        hv.VUpdate();
                    }
                });
            }

            return;
        }

        // Update views that have autoUpdate set to true;
        this.viewMan.Update();

        // If this is the game server, no further updates are needed. (No HumanViews on game server... DESTROY ALL HUMANS! "Um... Lambert? Am I being stealthy enough?" : "Keep it up Fisher, you're doing great!")
        if (this.isServerLogic === true) {
            return;
        }

        // Render all humans!
        if (this.viewMan.GetArrayByType<HumanView>("HumanView").length > 0) {
            this.viewMan.GetArrayByType<HumanView>("HumanView").forEach(hv => {
                if (hv.VIsInitialized() === true) {
                    hv.VUpdate();
                }
            });
        }
    }

    /**
     *
     *
     * @memberof BaseGameLogic
     */
    public VShutdown(): void {
        this.viewMan.Shutdown();

        if (GameCore.game.Quitting() === true) {
            this.viewMan.Clear();
            this.isInitialized = false;
        }
    }
    // END OVERRIDES
    //#endregion
}