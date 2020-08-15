import { ComponentManager } from "./component-manager.js";
import { BrowserWindow, TouchBarSlider, remote } from "electron";
import { BaseGameLogic } from "./../game-logic/base-game-logic.js";

var gameLoaded: boolean = false;

export class GameCore {
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

    static game: GameCore;

    static SetGameType<T>(gameType: T): void {
        GameCore.game = gameType as unknown as GameCore;
    }

    constructor(canvasElement: string, comPath: string, logic: BaseGameLogic) {
        this.gameLogic = logic;
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.comMan = new ComponentManager(comPath);
    }

    public get ReInit(): boolean {
        return this.reInit;
    }

    public ReInitialize(): void {
        this.reInit = true;
        this.isInitialized = false;
    }

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
            let _window: BrowserWindow = remote.getCurrentWindow();
            _window.on("close", () => {
                this.Exit();
            });
        }
    }

    public VShutdown(): void {
        this.gameLogic.VShutdown();
        this.comMan.Shutdown();

        if (this.quitting === true) {
            this.comMan.Clear();
            process.exit(this.exitCode);
        }
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
}

var loadGame: Function;

export function OnDOMContentLoaded(cbLoadGame: Function): void {
    loadGame = cbLoadGame;
}

window.addEventListener('DOMContentLoaded', () => {
    if (!gameLoaded){
        loadGame();
        gameLoaded = true;
    }
});