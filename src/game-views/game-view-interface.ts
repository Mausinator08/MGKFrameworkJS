export interface IGameView {
    //#region Methods
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    VIsInitialized(): boolean;
    VReInit(): void;
    VIsReInit(): boolean;
    VShutdownRequested(): boolean;
    VRequestShutdown(): void;
    //#endregion

    //#region Fields
    name: string;
    type: string;
    autoUpdate: boolean;
    reInit: boolean;
    requestShutdown: boolean;
    //#endregion
}