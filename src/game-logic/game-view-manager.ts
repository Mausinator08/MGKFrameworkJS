import { IGameView } from "./../game-view-interface.js";

export class ViewManager {
    private views: Map<string, IGameView>;
    public viewDir: string;

    public get count() {
        return this.views.size;
    }

    constructor(viewPath: string) {
        this.views = new Map<string, IGameView>();
        this.viewDir = viewPath;
    }

    public GetByName<T>(name: string): T | null {
        try {
            if (!this.views.has(name)) {
                console.error("ViewManager: GetByName() -> Could not get view [" + name + "]! A view with that name does not exist.");
                return null;
            }

            return this.views.get(name) as unknown as T;
        } catch (err) {
            console.error("ViewManager: GetByName() -> Could not get view [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return null;
        }
    }

    public GetArrayByType<T>(type: string): T[] | null {
        try {
            let coms: T[] = new Array<T>();
            this.views.forEach(com => {
                coms.push(com as unknown as T);
            });

            return coms;
        } catch (err) {
            console.error("ViewManager: GetArrayByType() -> Could not get any views of type <" + type + ">!\n" + 
            "### ERROR:\n" + err);
            return null;
        }
    }

    public Create(name: string, type: string): string {
        try {
            if (this.views.has(name)) {
                console.error("ViewManager: Create() -> Could not create view [" + name + "] of type <" + this.views.get(name).type + ">!\n" + 
                "A view with that name already exists. Expected type was <" + type + ">.");
                return JSON.stringify({ viewName: name, code: "exists" });
            }

            let view: any;

            try {
                view = require(this.viewDir + "/" + type + ".js");
            } catch (err) {
                try {
                    view = require(__dirname + "/../game-views/" + type + ".js");
                } catch (err2) {
                    console.error(
                    "{\n" + 
                    "    {\n" + 
                    "        ### ERROR 1:\n" + 
                    "        " + err + "\n" + 
                    "        ### ERROR 2:\n" + 
                    "        " + err2 + "\n" + 
                    "    }\n" + 
                    "}"
                    );
                }
            }

            this.views.set(name, view.Create(name));
            return JSON.stringify({ viewName: name, code: "created" });
        } catch (err) {
            console.error("ViewManager: Create() -> Could not create view [" + name + "] of type <" + type + ">!\n" + 
            "Ensure you did not mistype the string for the <type> parameter. Also make sure the view type being referenced \n" + 
            "exists under './views/*.ts' and not in a different folder as well as not in a subfolder.\n" + 
            "### ERROR:\n" + err);
            return JSON.stringify({ viewName: name, code: "error" });
        }
    }

    public Add(view: IGameView): boolean {
        try {
            if (this.views.has(view.name)) {
                console.error("ViewManager: Add() -> Could not add view [" + view.name + "] of type <" + view.type + ">!\n" + 
                "A view with that name already exists.");
                return false;
            }

            this.views.set(view.name, view);
            return true;
        } catch (err) {
            console.error("ViewManager: Add() -> Could not add view [" + view.name + "] of type <" + view.type + ">!\n" + 
            "### ERROR:\n" + err);
            return false;
        }
    }

    public Remove(name: string): boolean {
        try {
            if (!this.views.has(name)) {
                console.error("ViewManager: Remove() -> Could not remove view [" + name + "]!\n" + 
                "A view with that name does not exist.");
                return false;
            }

            return this.views.delete(name);
        } catch (err) {
            console.error("ViewManager: Remove() -> Could not remove view [" + name + "]!\n" + 
            "### ERROR:\n" + err);
            return false;
        }
    }

    public Clear(): void {
        if (this.views.size > 0) {
            this.views.clear();
            return;
        }

        console.warn("ViewManager: Remove() -> No views to clear! I'm empty!");
    }

    public Init(): void {
        if (this.views.size > 0) {
            this.views.forEach(vu => {
                if (vu.VIsReInit() === true) {
                    if (!vu.VInit()) {
                        console.error("ViewManager: Init() -> could not initialize view [" + vu.name + "] of type <" + vu.type + ">!");
                    }
                }
            });
        }
    }

    public Update(): void {
        if (this.views.size > 0) {
            this.views.forEach(vu => {
                try {
                    // If updating is supposed to be manual...
                    if (vu.autoUpdate === false) {
                        // ...Skip this view.
                        return;
                    }
                    if (vu.VIsInitialized()) {
                        vu.VUpdate();
                    }
                } catch (err) {
                    console.error("ViewManager: Update() -> could not update view [" + vu.name + "] of type <" + vu.type + ">!\n" + 
                    "### ERROR:\n" + err);
                }
            });
        }
    }

    public Shutdown(): void {
        if (this.views.size > 0) {
            this.views.forEach(vu => {
                try {
                    if (vu.VShutdownRequested() === true) {
                        vu.VShutdown();
                    }
                } catch (err) {
                    console.error("ViewManager: Shutdown() -> could not shutdown view [" + vu.name + "] of type <" + vu.type + ">!\n" + 
                    "### ERROR:\n" + err);
                }
            });
        }
    }
}