export class Component {
    protected name: string = "component";
    protected type: string = "component";
    protected isInitialized: boolean = false;
    protected reInit: boolean = true;
    protected requestShutdown: boolean = false;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    public get IsInitialized(): boolean {
        return this.isInitialized;
    }

    public get ReInit(): boolean {
        return this.reInit;
    }

    public ReInitialize(): void {
        this.reInit = true;
        this.isInitialized = false;
    }

    public ShutdownRequested(): boolean {
        return this.requestShutdown;
    }

    public RequestShutdown(): void {
        this.requestShutdown = true;
    }

    // Component functions to be overriden.
    // Core functions.
    public VInit(): boolean {
        this.reInit = false;
        return this.isInitialized;
    }

    public VUpdate(): void {
        if (!this.isInitialized) {
            console.error("Component: VUpdate() -> Component not initialized! Could not update component [" + this.name + "] of type <" + this.type + ">.");
        }
    }

    public VShutdown(): void {
        this.isInitialized = false;
        this.requestShutdown = false;
    }

    // Name and Type retrieval functions
    public VGetName(): string {
        return this.name;
    }

    public VGetType(): string {
        return this.type;
    }
}