/** @module game-logic */

/**
 *
 *
 * @export
 * @interface IGameState
 */
export interface IGameState {
    //#region Methods
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameState
     */
    VInit(): boolean;
    /**
     *
     *
     * @memberof IGameState
     */
    VUpdate(): void;
    /**
     *
     *
     * @memberof IGameState
     */
    VShutdown(): void;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameState
     */
    VIsInitialized(): boolean;
    /**
     *
     *
     * @memberof IGameState
     */
    VReInit(): void;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameState
     */
    VIsReInit(): boolean;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameState
     */
    VShutdownRequested(): boolean;
    /**
     *
     *
     * @memberof IGameState
     */
    VRequestShutdown(): void;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameState
     */
    VCanClear(): boolean;
    //#endregion

    //#region Fields
    /**
     *
     *
     * @type {string}
     * @memberof IGameState
     */
    /**
     *
     *
     * @type {string}
     * @memberof IGameState
     */
    /**
     *
     *
     * @type {string}
     * @memberof IGameState
     */
    name: string;
    /**
     *
     *
     * @type {string}
     * @memberof IGameState
     */
    type: string;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameState
     */
    autoUpdate: boolean;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameState
     */
    reInit: boolean;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameState
     */
    requestShutdown: boolean;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameState
     */
    canClear: boolean;
    //#endregion
}