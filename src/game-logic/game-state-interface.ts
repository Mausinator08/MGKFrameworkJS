export interface IGameState {
    //#region Methods
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    VIsInitialized(): boolean;
    VReInit(): void;
    VIsReInit(): boolean;
    VShutdownRequested(): boolean;
    VRequestShutdown(): void;
    VCanClear(): boolean;
    //#endregion

    //#region Fields
    name: string;
    type: string;
    autoUpdate: boolean;
    reInit: boolean;
    requestShutdown: boolean;
    canClear: boolean;
    //#endregion
}