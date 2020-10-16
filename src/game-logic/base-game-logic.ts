//#region Imports
import { GameCore } from "./../game/game-core.js";
import { ViewManager } from "../game-views/game-view-manager.js";
import { HumanView } from "./../game-views/types/human-view.js";
import { IGameState } from "./game-state-interface.js";
import { StateManager } from "./game-state-manager.js";
//#endregion

export class BaseGameLogic {
    //#region Fields
    public preInitFunc: Function;
    protected paused: boolean = false;
    protected isInitialized: boolean = false;
    public isServerLogic: boolean = false;
    public viewMan: ViewManager;
    public createdViews: string[] = [];
    protected reInit: boolean = true;
    protected requestShutdown: boolean = false;
    protected stateManager: StateManager;
    //#endregion

    constructor(viewPath: string, statePath: string) {
        this.viewMan = new ViewManager(viewPath);
        this.stateManager = new StateManager(statePath);
    }

    //#region Control Method Overrides
    // OVERRIDES
    public CreateGameState(name: string, type: string): void {

    }

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