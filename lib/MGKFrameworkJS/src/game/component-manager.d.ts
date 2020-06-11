import { Component } from "./component.js";
export declare class ComponentManager {
    private components;
    comDir: string;
    get count(): number;
    constructor(comPath: string);
    GetByName<T>(name: string): T | null;
    GetArrayByType<T>(type: string): T[] | null;
    Create(name: string, type: string): string;
    Add(component: Component): boolean;
    Remove(name: string): boolean;
    Clear(): void;
    Init(): void;
    Update(): void;
    Shutdown(): void;
}
//# sourceMappingURL=component-manager.d.ts.map