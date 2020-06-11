import { IGameView } from "./../game-view-interface.js";
export declare class ViewManager {
    private views;
    viewDir: string;
    get count(): number;
    constructor(viewPath: string);
    GetByName<T>(name: string): T | null;
    GetArrayByType<T>(type: string): T[] | null;
    Create(name: string, type: string): string;
    Add(view: IGameView): boolean;
    Remove(name: string): boolean;
    Clear(): void;
    Init(): void;
    Update(): void;
    Shutdown(): void;
}
//# sourceMappingURL=game-view-manager.d.ts.map