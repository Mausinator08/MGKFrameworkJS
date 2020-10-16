//#region Imports
import { ComponentManager } from "./../components/component-manager.js";
import { BrowserWindow, remote } from "electron";
import { BaseGameLogic } from "./../game-logic/base-game-logic.js";
import { SystemDialog } from "./../system/system-dialog.js";
//#endregion

//#region Globals
var gameLoaded: boolean = false;
var loadGame: Function;
//#endregion

export class GameCore {
    //#region Fields
    public preInitFunc: Function = null;
    public _canvas: HTMLCanvasElement;
    public comMan: ComponentManager;
    protected quitting: boolean = false;
    protected exitting: boolean = false;
    public createdComponents: string[] = [];
    protected exitCode: number = 0;
    public gameLogic: BaseGameLogic;
    protected isInitialized: boolean = false;
    protected reInit: boolean = true;

    protected systemDialog: SystemDialog = new SystemDialog();
    //#endregion

    //#region Static Fields
    static game: GameCore;
    //#endregion

    //#region Static Accessors
    static SetGameType<T>(gameType: T): void {
        GameCore.game = gameType as unknown as GameCore;
    }
    //#endregion

    constructor(canvasElement: string, comPath: string, logic: BaseGameLogic) {
        this.gameLogic = logic;
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.comMan = new ComponentManager(comPath);
    }

    //#region Accessors
    public get ReInit(): boolean {
        return this.reInit;
    }

    // Returns wether the program is terminating or still running
    public Quitting(): boolean {
        return this.quitting;
    }

    // Tell engine to start shutting down and then terminate
    public Quit(): void {
        this.quitting = true;
    }

    // Returns whether the user requested to exit
    public Exitting(): boolean {
        return this.exitting;
    }

    // The user requested to exit
    public Exit(): void {
        this.exitting = true;
    }

    // The user decided not to exit after initial exit request... (make up your mind!!!)
    public CancelExit(): void {
        this.exitting = false;
    }

    public ReInitialize(): void {
        this.reInit = true;
        this.isInitialized = false;
    }
    //#endregion

    //#region Dialog Methods
    public Fatal(message: string, action: Function, exitCode: number): HTMLElement {
        return this.systemDialog.Fatal(message, action, exitCode);
    }

    public QuitPrompt(): HTMLElement {
        return this.systemDialog.QuitPrompt();
    }
    //#endregion

    //#region Control Method Overrides
    // OVERRIDES
    public VInit(): boolean {
        try {
            if (this.preInitFunc !== null) {
                let preState: boolean = true;
                    
                if (this.reInit === true) {
                    preState = this.preInitFunc(this);
                }

                if (preState === true) {
                    this.comMan.Init();

                    if (!this.gameLogic.VInit()) {
                        return false;
                    }

                    if (this.reInit === true) {
                        this.reInit = false;
                        this.isInitialized = true;
                        this.VUpdate();
                    }
                } else {
                    this.reInit = false;
                    this.Quit();
                    return false;
                }
            }

            this.isInitialized = true;
            if (this.reInit === true) {
                this.reInit = false;
            }
            return true;
        } catch (err) {
            if (this.reInit === true) {
                this.isInitialized = false;
                this.reInit = false;
            }

            console.error("GameCore: VInit() -> ### ERROR:\n" + err);
            return false;
        }
    }

    public VUpdate(): void {
        if (!this.quitting) {
            if (this.reInit === true) {
                return;
            }

            if (this.isInitialized === false) {
                return;
            }

            // Update components
            this.comMan.Update();
            this.gameLogic.VUpdate();

            // Get the current window and define how its events are handled.
            window.onbeforeunload = (events: { returnValue: boolean; preventDefault: () => void; }) => {
                if (this.Quitting() === false) {
                    events.returnValue = false;
                    events.preventDefault();
                    this.Exit();
                    return;
                }
            };
        }
    }

    public VShutdown(): void {
        this.gameLogic.VShutdown();
        this.comMan.Shutdown();

        if (this.quitting === true) {
            this.comMan.Clear();
            let _window: BrowserWindow = remote.getCurrentWindow();
            _window.destroy();
            process.exit(this.exitCode);
        }
    }
    // END OVERRIDES
    //#endregion
}

//#region Exports
export function OnDOMContentLoaded(cbLoadGame: Function): void {
    loadGame = cbLoadGame;
}
//#endregion

//#region Global Execution
// Add event listener for when to start the game engine after the electron application is loaded.
window.addEventListener('DOMContentLoaded', () => {
    if (!gameLoaded){
        loadGame();
        gameLoaded = true;
    }
});
//#endregion