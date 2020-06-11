export declare class Component {
    protected name: string;
    protected type: string;
    protected isInitialized: boolean;
    protected reInit: boolean;
    protected requestShutdown: boolean;
    constructor(name: string, type: string);
    get IsInitialized(): boolean;
    get ReInit(): boolean;
    ReInitialize(): void;
    ShutdownRequested(): boolean;
    RequestShutdown(): void;
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    VGetName(): string;
    VGetType(): string;
}
//# sourceMappingURL=component.d.ts.map