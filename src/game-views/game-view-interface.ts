/** @module game-views */

//#region Imports
import { BaseGameLogic } from "./../game-logic/base-game-logic"
//#endregion

/**
 *
 *
 * @export
 * @interface IGameView
 */
export interface IGameView {
    //#region Methods
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameView
     */
    VInit(): boolean;
    /**
     *
     *
     * @memberof IGameView
     */
    VUpdate(): void;
    /**
     *
     *
     * @memberof IGameView
     */
    VShutdown(): void;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameView
     */
    VIsInitialized(): boolean;
    /**
     *
     *
     * @memberof IGameView
     */
    VReInit(): void;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameView
     */
    VIsReInit(): boolean;
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof IGameView
     */
    VShutdownRequested(): boolean;
    /**
     *
     *
     * @memberof IGameView
     */
    VRequestShutdown(): void;
    //#endregion

    //#region Fields
    /**
     *
     *
     * @type {string}
     * @memberof IGameView
     */
    name: string;
    /**
     *
     *
     * @type {string}
     * @memberof IGameView
     */
    type: string;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameView
     */
    autoUpdate: boolean;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameView
     */
    reInit: boolean;
    /**
     *
     *
     * @type {boolean}
     * @memberof IGameView
     */
    requestShutdown: boolean;
    /**
     *
     *
     * @type {BaseGameLogic}
     * @memberof IGameView
     */
    gameLogic: BaseGameLogic;
    //#endregion
}