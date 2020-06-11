export interface IGameView {
    VInit(): boolean;
    VUpdate(): void;
    VShutdown(): void;
    VIsInitialized(): boolean;
    VReInit(): void;
    VIsReInit(): boolean;
    VShutdownRequested(): boolean;
    VRequestShutdown(): void;

    name: string;
    type: string;
    autoUpdate: boolean;
    reInit: boolean;
    requestShutdown: boolean;
}