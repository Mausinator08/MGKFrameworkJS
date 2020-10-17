/** @module components */

/**
 *
 *
 * @export
 * @class Component
 */
export class Component {
    //#region Fields
    /**
     *
     *
     * @protected
     * @type {string}
     * @memberof Component
     */
    protected name: string = "component";
    /**
     *
     *
     * @protected
     * @type {string}
     * @memberof Component
     */
    protected type: string = "component";
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof Component
     */
    protected isInitialized: boolean = false;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof Component
     */
    protected reInit: boolean = true;
    /**
     *
     *
     * @protected
     * @type {boolean}
     * @memberof Component
     */
    protected requestShutdown: boolean = false;
    //#endregion
    
    /**
     * Creates an instance of Component.
     * @param {string} name
     * @param {string} type
     * @memberof Component
     */
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    //#region Accessors
    /**
     *
     *
     * @readonly
     * @type {boolean}
     * @memberof Component
     */
    public get IsInitialized(): boolean {
        return this.isInitialized;
    }

    /**
     *
     *
     * @readonly
     * @type {boolean}
     * @memberof Component
     */
    public get ReInit(): boolean {
        return this.reInit;
    }
    /**
     *
     *
     * @memberof Component
     */
    public ReInitialize(): void {
        this.reInit = true;
        this.isInitialized = false;
    }

    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof Component
     */
    public ShutdownRequested(): boolean {
        return this.requestShutdown;
    }

    /**
     *
     *
     * @memberof Component
     */
    public RequestShutdown(): void {
        this.requestShutdown = true;
    }
    //#endregion

    //#region Control Method Overrides
    // Core functions.
    /**
     *
     *
     * @return {*}  {boolean}
     * @memberof Component
     */
    public VInit(): boolean {
        this.reInit = false;
        return this.isInitialized;
    }

    /**
     *
     *
     * @memberof Component
     */
    public VUpdate(): void {
        if (!this.isInitialized) {
            console.error("Component: VUpdate() -> Component not initialized! Could not update component [" + this.name + "] of type <" + this.type + ">.");
        }
    }

    /**
     *
     *
     * @memberof Component
     */
    public VShutdown(): void {
        this.isInitialized = false;
        this.requestShutdown = false;
    }
    // END OVERRIDES
    //#endregion

    //#region Name and Type retrieval functions
    /**
     *
     *
     * @return {*}  {string}
     * @memberof Component
     */
    public VGetName(): string {
        return this.name;
    }

    /**
     *
     *
     * @return {*}  {string}
     * @memberof Component
     */
    public VGetType(): string {
        return this.type;
    }
    //#endregion
}