/** @module game-logic/game-state-manager */

//#region Imports
import { IGameState } from "./game-state-interface";
//#endregion

/**
 *
 *
 * @export
 * @class StateManager
 */
export class StateManager {
    //#region Fields
    /**
     *
     *
     * @private
     * @type {Map<string, IGameState>}
     * @memberof StateManager
     */
    private states: Map<string, IGameState>;
    /**
     *
     *
     * @type {string}
     * @memberof StateManager
     */
    public stateDir: string;
    /**
     *
     *
     * @type {Map<string, IGameState>}
     * @memberof StateManager
     */
    public activeStates: Map<string, IGameState>;
    //#endregion

    //#region Properties
    /**
     *
     *
     * @readonly
     * @memberof StateManager
     */
    public get count() {
        return this.states.size;
    }
    //#endregion

    /**
     * Creates an instance of StateManager.
     * @param {string} statePath
     * @memberof StateManager
     */
    constructor(statePath: string) {
        this.states = new Map<string, IGameState>();
        this.stateDir = statePath;
    }

    //#region Accessors
    /**
     *
     *
     * @template T
     * @param {string} name
     * @return {*}  {(T | null)}
     * @memberof StateManager
     */
    public GetByName<T>(name: string): T | null {
        try {
            if (!this.states.has(name)) {
                console.error("StateManager: GetByName() -> Could not get state [" + name + "]! A state with that name does not exist.");
                return null;
            }

            return this.states.get(name) as unknown as T;
        } catch (err) {
            console.error("StateManager: GetByName() -> Could not get state [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return null;
        }
    }

    /**
     *
     *
     * @template T
     * @param {string} type
     * @return {*}  {(T[] | null)}
     * @memberof StateManager
     */
    public GetArrayByType<T>(type: string): T[] | null {
        try {
            let sts: T[] = new Array<T>();
            this.states.forEach(st => {
                sts.push(st as unknown as T);
            });

            return sts;
        } catch (err) {
            console.error("StateManager: GetArrayByType() -> Could not get any states of type <" + type + ">!\n" + 
            "### ERROR:\n" + err);
            return null;
        }
    }

    /**
     *
     *
     * @template T
     * @param {string} name
     * @return {*}  {(T | null)}
     * @memberof StateManager
     */
    public GetActiveByName<T>(name: string): T | null {
        try {
            if (!this.activeStates.has(name)) {
                console.error("StateManager: GetActiveByName() -> Could not get active state [" + name + "]! A state with that name is not active.");
                return null;
            }

            return this.activeStates.get(name) as unknown as T;
        } catch (err) {
            console.error("StateManager: GetActiveByName() -> Could not get active state [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return null;
        }
    }

    /**
     *
     *
     * @template T
     * @param {string} type
     * @return {*}  {(T[] | null)}
     * @memberof StateManager
     */
    public GetActiveArrayByType<T>(type: string): T[] | null {
        try {
            let sts: T[] = new Array<T>();
            this.activeStates.forEach(st => {
                sts.push(st as unknown as T);
            });

            return sts;
        } catch (err) {
            console.error("StateManager: GetActiveArrayByType() -> Could not get any active states of type <" + type + ">!\n" + 
            "### ERROR:\n" + err);
            return null;
        }
    }
    //#endregion

    //#region CRUD Ops
    /**
     *
     *
     * @param {string} name
     * @param {string} type
     * @return {*}  {string}
     * @memberof StateManager
     */
    public Create(name: string, type: string): string {
        try {
            if (this.states.has(name)) {
                console.error("StateManager: Create() -> Could not create state [" + name + "] of type <" + this.states.get(name).type + ">!\n" + 
                "A state with that name already exists. Expected type was <" + type + ">.");
                return JSON.stringify({ stateName: name, code: "exists" });
            }

            let state: any;

            try {
                state = require(this.stateDir + "/" + type + ".js");
            } catch (err) {
                try {
                    state = require(__dirname + "/../game-state/" + type + ".js");
                } catch (err2) {
                    console.error(
                    "{\n" + 
                    "    {\n" + 
                    "        ### ERROR 1:\n" + 
                    "        " + err + "\n" + 
                    "        ### ERROR 2:\n" + 
                    "        " + err2 + "\n" + 
                    "    }\n" + 
                    "}"
                    );
                }
            }

            this.states.set(name, state.Create(name));
            return JSON.stringify({ stateName: name, code: "created" });
        } catch (err) {
            console.error("StateManager: Create() -> Could not create state [" + name + "] of type <" + type + ">!\n" + 
            "Ensure you did not mistype the string for the <type> parameter. Also make sure the state type being referenced \n" + 
            "exists under './game-states/*.ts' and not in a different folder as well as not in a subfolder.\n" + 
            "### ERROR:\n" + err);
            return JSON.stringify({ stateName: name, code: "error" });
        }
    }

    /**
     *
     *
     * @param {IGameState} state
     * @return {*}  {boolean}
     * @memberof StateManager
     */
    public Add(state: IGameState): boolean {
        try {
            if (this.states.has(state.name) === true) {
                console.error("StateManager: Add() -> Could not add state [" + state.name + "] of type <" + state.type + ">!\n" + 
                "A state with that name already exists.");
                return false;
            }

            this.states.set(state.name, state);
            return true;
        } catch (err) {
            console.error("StateManager: Add() -> Could not add state [" + state.name + "] of type <" + state.type + ">!\n" + 
            "### ERROR:\n" + err);
            return false;
        }
    }

    /**
     *
     *
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof StateManager
     */
    public Remove(name: string): boolean {
        try {
            if (!this.states.has(name)) {
                console.error("StateManager: Remove() -> Could not remove state [" + name + "]!\n" + 
                "A state with that name does not exist.");
                return false;
            }

            return this.states.delete(name);
        } catch (err) {
            console.error("StateManager: Remove() -> Could not remove state [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return false;
        }
    }

    /**
     *
     *
     * @return {*}  {void}
     * @memberof StateManager
     */
    public Clear(): void {
        if (this.states.size > 0) {
            this.states.clear();
            return;
        }

        console.warn("StateManager: Remove() -> No states to clear! I'm empty!");
    }

    /**
     *
     *
     * @memberof StateManager
     */
    public ClearActive(): void {
        if (this.activeStates.size > 0) {
            let st = this.activeStates.clear();
        }
    }
    //#endregion

    //#region Game State Manipulation Methods
    /**
     *
     *
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof StateManager
     */
    public Activate(name: string): boolean {
        try {
            if (this.states.has(name) === false) {
                console.error("StateManager: Activate() -> Could not activate state [" + name + "] because the state does not exist!\n");
                return false;
            }

            if (this.activeStates.has(name) === true) {
                console.error("StateManager: Activate() -> Could not activate state [" + name + "] because it is already active!\n");
                return false;
            }

            this.activeStates.set(name, this.states.get(name));
        } catch (err) {
            console.error("StateManager: Activate() -> Could not activate state [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return false;
        }
    }

    /**
     *
     *
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof StateManager
     */
    public Deactivate(name: string): boolean {
        try {
            if (this.states.has(name) === false) {
                console.warn("StateManager: Deactivate() -> Deactivating state [" + name + "] while state does not exist!\n");
                return false;
            }

            if (this.activeStates.has(name) === false) {
                console.error("StateManager: Deactivate() -> Could not deactivate state [" + name + "] because it is not active!\n");
                return false;
            }

            this.activeStates.delete(name);
        } catch (err) {
            console.error("StateManager: Deactivate() -> Could not deactivate state [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return false;
        }
    }
    //#endregion

    //#region Control Methods
    /**
     *
     *
     * @memberof StateManager
     */
    public Init(): void {
        if (this.activeStates.size > 0) {
            this.activeStates.forEach(st => {
                if (st.VIsReInit() === true) {
                    if (!st.VInit()) {
                        console.error("StateManager: Init() -> could not initialize state [" + st.name + "] of type <" + st.type + ">!");
                    }
                }
            });
        }
    }

    /**
     *
     *
     * @memberof StateManager
     */
    public Update(): void {
        if (this.activeStates.size > 0) {
            this.activeStates.forEach(st => {
                try {
                    // If updating is supposed to be manual...
                    if (st.autoUpdate === false) {
                        // ...Skip this state.
                        return;
                    }
                    
                    if (st.VIsInitialized()) {
                        st.VUpdate();
                    }
                } catch (err) {
                    console.error("StateManager: Update() -> could not update state [" + st.name + "] of type <" + st.type + ">!\n" + 
                    "### ERROR:\n" + err);
                }
            });
        }
    }

    /**
     *
     *
     * @memberof StateManager
     */
    public Shutdown(): void {
        if (this.activeStates.size > 0) {
            this.activeStates.forEach(st => {
                try {
                    if (st.VShutdownRequested() === true) {
                        st.VShutdown();
                    }
                } catch (err) {
                    console.error("StateManager: Shutdown() -> could not shutdown state [" + st.name + "] of type <" + st.type + ">!\n" + 
                    "### ERROR:\n" + err);
                }
            });
        }
    }
    //#endregion
}