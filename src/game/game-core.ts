/** @module game */

//#region Imports
import { ComponentManager } from "./../components/component-manager";
import { BrowserWindow, remote } from "electron";
import { BaseGameLogic } from "./../game-logic/base-game-logic";
import { SystemDialog } from "./../system/system-dialog";
//#endregion

//#region Globals
/** @type {*} */
var gameLoaded: boolean = false;
/** @type {*} */
var loadGame: Function;
//#endregion

/**
 *
 *
 * @export
 * @class GameCore
 */
export class GameCore {
    //#region Fields
    /**
     *
     *
     * @type {Function}
     * @memberof GameCore
     */
    public preInitFunc: Function = null;
    /**
     *
     *
     * @type {HTMLCanvasElement}
     * @memberof GameCore
     */
    public _canvas: HTMLCanvasElement;
    /**
     *
     *
     * @type {ComponentManager}
     * @memberof GameCore
     */
    public comMan: ComponentManager;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof GameCore
     */
    protected quitting: boolean = false;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof GameCore
     */
    protected exitting: boolean = false;
    /**
     *
     *
     * @type {string[]}
     * @memberof GameCore
     */
    public createdComponents: string[] = [];
    /**
     *
     *
     * @protected
     * @type {number}
     * @memberof GameCore
     */
    protected exitCode: number = 0;
    /**
     *
     *
     * @type {BaseGameLogic}
     * @memberof GameCore
     */
    public gameLogic: BaseGameLogic;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof GameCore
     */
    protected isInitialized: boolean = false;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof GameCore
     */
    protected reInit: boolean = true;

    /**
     *
     *
     * @protected
     * @type {SystemDialog}
     * @memberof GameCore
     */
    protected systemDialog: SystemDialog = new SystemDialog();
    //#endregion

    //#region Static Fields
    /**
     *
     *
     * @static
     * @type {GameCore}
     * @memberof GameCore
     */
    static game: GameCore;
    //#endregion

    //#region Static Accessors
    /**
     *
     *
     * @static
     * @template T
     * @param {T} gameType
     * @memberof GameCore
     */
    static SetGameType<T>(gameType: T): void {
        GameCore.game = gameType as unknown as GameCore;
    }
    //#endregion

    /**
     * Creates an instance of GameCore.
     * @param {string} canvasElement
     * @param {string} comPath
     * @param {BaseGameLogic} logic
     * @memberof GameCore
     */
    constructor(canvasElement: string, comPath: string, logic: BaseGameLogic) {
        this.gameLogic = logic;
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.comMan = new ComponentManager(comPath);
    }

    //#region Accessors
    /**
     *
     *
     * @readonly
     * @type {boolean}
     * @memberof GameCore
     */
    public get ReInit(): boolean {
        return this.reInit;
    }

    // Returns wether the program is terminating or still running
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof GameCore
     */
    public Quitting(): boolean {
        return this.quitting;
    }

    // Tell engine to start shutting down and then terminate
    /**
     *
     *
     * @memberof GameCore
     */
    public Quit(): void {
        this.quitting = true;
    }

    // Returns whether the user requested to exit
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof GameCore
     */
    public Exitting(): boolean {
        return this.exitting;
    }

    // The user requested to exit
    /**
     *
     *
     * @memberof GameCore
     */
    public Exit(): void {
        this.exitting = true;
    }

    // The user decided not to exit after initial exit request... (make up your mind!!!)
    /**
     *
     *
     * @memberof GameCore
     */
    public CancelExit(): void {
        this.exitting = false;
    }

    /**
     *
     *
     * @memberof GameCore
     */
    public ReInitialize(): void {
        this.reInit = true;
        this.isInitialized = false;
    }
    //#endregion

    //#region Dialog Methods
    /**
     *
     *
     * @param {string} message
     * @param {Function} action
     * @param {number} exitCode
     * @return {*}  {HTMLElement}
     * @memberof GameCore
     */
    public Fatal(message: string, action: Function, exitCode: number): HTMLElement {
        return this.systemDialog.Fatal(message, action, exitCode);
    }

    /**
     *
     *
     * @return {*}  {HTMLElement}
     * @memberof GameCore
     */
    public QuitPrompt(): HTMLElement {
        return this.systemDialog.QuitPrompt();
    }
    //#endregion

    //#region Control Method Overrides
    // OVERRIDES
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof GameCore
     */
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

    /**
     *
     *
     * @return {*}  {void}
     * @memberof GameCore
     */
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

    /**
     *
     *
     * @memberof GameCore
     */
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
/**
 *
 *
 * @export
 * @param {Function} cbLoadGame
 */
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