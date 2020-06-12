"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentManager = void 0;
class ComponentManager {
    constructor(comPath) {
        this.components = new Map();
        this.comDir = comPath;
    }
    get count() {
        return this.components.size;
    }
    GetByName(name) {
        try {
            if (!this.components.has(name)) {
                console.error("ComponentManager: GetByName() -> Could not get component [" + name + "]! A component with that name does not exist.");
                return null;
            }
            return this.components.get(name);
        }
        catch (err) {
            console.error("ComponentManager: GetByName() -> Could not get component [" + name + "]!\n" +
                "### ERROR:\n" + err);
            return null;
        }
    }
    GetArrayByType(type) {
        try {
            let coms = new Array();
            this.components.forEach(com => {
                coms.push(com);
            });
            return coms;
        }
        catch (err) {
            console.error("ComponentManager: GetArrayByType() -> Could not get any components of type <" + type + ">!\n" +
                "### ERROR:\n" + err);
            return null;
        }
    }
    Create(name, type) {
        try {
            if (this.components.has(name)) {
                console.error("ComponentManager: Create() -> Could not create component [" + name + "] of type <" + this.components.get(name).VGetType() + ">!\n" +
                    "A component with that name already exists. Expected type was <" + type + ">.");
                return JSON.stringify({ comName: name, code: "exists" });
            }
            let com;
            try {
                com = require(this.comDir + "/" + type + ".js");
            }
            catch (err) {
                try {
                    com = require(__dirname + "/../components/" + type + ".js");
                }
                catch (err2) {
                    console.error("{\n" +
                        "    {\n" +
                        "        ### ERROR 1:\n" +
                        "        " + err + "\n" +
                        "        ### ERROR 2:\n" +
                        "        " + err2 + "\n" +
                        "    }\n" +
                        "}");
                }
            }
            this.components.set(name, com.Create(name));
            return JSON.stringify({ comName: name, code: "created" });
        }
        catch (err) {
            console.error("ComponentManager: Create() -> Could not create component [" + name + "] of type <" + type + ">!\n" +
                "Ensure you did not mistype the string for the <type> parameter. Also make sure the component type being referenced \n" +
                "exists under './components/*.ts' and not in a different folder as well as not in a subfolder.\n" +
                "### ERROR:\n" + err);
            return JSON.stringify({ comName: name, code: "error" });
        }
    }
    Add(component) {
        try {
            if (this.components.has(component.VGetName())) {
                console.error("ComponentManager: Add() -> Could not add component [" + component.VGetName() + "] of type <" + component.VGetType() + ">!\n" +
                    "A component with that name already exists.");
                return false;
            }
            this.components.set(component.VGetName(), component);
            return true;
        }
        catch (err) {
            console.error("ComponentManager: Add() -> Could not add component [" + component.VGetName() + "] of type <" + component.VGetType() + ">!\n" +
                "### ERROR:\n" + err);
            return false;
        }
    }
    Remove(name) {
        try {
            if (!this.components.has(name)) {
                console.error("ComponentManager: Remove() -> Could not remove component [" + name + "]!\n" +
                    "A component with that name does not exist.");
                return false;
            }
            return this.components.delete(name);
        }
        catch (err) {
            console.error("ComponentManager: Remove() -> Could not remove component [" + name + "]!\n" +
                "### ERROR:\n" + err);
            return false;
        }
    }
    Clear() {
        if (this.components.size > 0) {
            this.components.clear();
            return;
        }
        console.warn("ComponentManager: Remove() -> No components to clear! I'm empty!");
    }
    Init() {
        if (this.components.size > 0) {
            this.components.forEach(com => {
                if (com.ReInit === true) {
                    if (!com.VInit()) {
                        console.error("ComponentManager: Init() -> could not initialize component [" + com.VGetName() + "] of type <" + com.VGetType() + ">!");
                    }
                }
            });
        }
    }
    Update() {
        if (this.components.size > 0) {
            this.components.forEach(com => {
                try {
                    if (com.IsInitialized) {
                        com.VUpdate();
                    }
                }
                catch (err) {
                    console.error("ComponentManager: Update() -> could not update component [" + com.VGetName() + "] of type <" + com.VGetType() + ">!\n" +
                        "### ERROR:\n" + err);
                }
            });
        }
    }
    Shutdown() {
        if (this.components.size > 0) {
            this.components.forEach(com => {
                try {
                    if (com.ShutdownRequested() === true) {
                        com.VShutdown();
                    }
                }
                catch (err) {
                    console.error("ComponentManager: Shutdown() -> could not shutdown component [" + com.VGetName() + "] of type <" + com.VGetType() + ">!\n" +
                        "### ERROR:\n" + err);
                }
            });
        }
    }
}
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi8uLi8iLCJzb3VyY2VzIjpbIk1HS0ZyYW1ld29ya0pTL3NyYy9nYW1lL2NvbXBvbmVudC1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsZ0JBQWdCO0lBUXpCLFlBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFxQixDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFQRCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFPTSxTQUFTLENBQUksSUFBWTtRQUM1QixJQUFJO1lBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxHQUFHLElBQUksR0FBRywrQ0FBK0MsQ0FBQyxDQUFDO2dCQUNySSxPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQWlCLENBQUM7U0FDcEQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELEdBQUcsSUFBSSxHQUFHLE1BQU07Z0JBQzFGLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVNLGNBQWMsQ0FBSSxJQUFZO1FBQ2pDLElBQUk7WUFDQSxJQUFJLElBQUksR0FBUSxJQUFJLEtBQUssRUFBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQW1CLENBQUMsQ0FBQztZQUNuQyxD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TUFBTTt3QkFDekksY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0o7QUF0S0QsNENBc0tDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50LmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGNvbXBvbmVudHM6IE1hcDxzdHJpbmcsIENvbXBvbmVudD47XHJcbiAgICBwdWJsaWMgY29tRGlyOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGdldCBjb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLnNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcDxzdHJpbmcsIENvbXBvbmVudD4oKTtcclxuICAgICAgICB0aGlzLmNvbURpciA9IGNvbVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEJ5TmFtZTxUPihuYW1lOiBzdHJpbmcpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudHMuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogR2V0QnlOYW1lKCkgLT4gQ291bGQgbm90IGdldCBjb21wb25lbnQgW1wiICsgbmFtZSArIFwiXSEgQSBjb21wb25lbnQgd2l0aCB0aGF0IG5hbWUgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuZ2V0KG5hbWUpIGFzIHVua25vd24gYXMgVDtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IEdldEJ5TmFtZSgpIC0+IENvdWxkIG5vdCBnZXQgY29tcG9uZW50IFtcIiArIG5hbWUgKyBcIl0hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEFycmF5QnlUeXBlPFQ+KHR5cGU6IHN0cmluZyk6IFRbXSB8IG51bGwge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjb21zOiBUW10gPSBuZXcgQXJyYXk8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goY29tID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbXMucHVzaChjb20gYXMgdW5rbm93biBhcyBUKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29tcztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IEdldEFycmF5QnlUeXBlKCkgLT4gQ291bGQgbm90IGdldCBhbnkgY29tcG9uZW50cyBvZiB0eXBlIDxcIiArIHR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENyZWF0ZShuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBDcmVhdGUoKSAtPiBDb3VsZCBub3QgY3JlYXRlIGNvbXBvbmVudCBbXCIgKyBuYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdGhpcy5jb21wb25lbnRzLmdldChuYW1lKS5WR2V0VHlwZSgpICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICBcIkEgY29tcG9uZW50IHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzLiBFeHBlY3RlZCB0eXBlIHdhcyA8XCIgKyB0eXBlICsgXCI+LlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IGNvbU5hbWU6IG5hbWUsIGNvZGU6IFwiZXhpc3RzXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjb206IGFueTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb20gPSByZXF1aXJlKHRoaXMuY29tRGlyICsgXCIvXCIgKyB0eXBlICsgXCIuanNcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjb20gPSByZXF1aXJlKF9fZGlybmFtZSArIFwiLy4uL2NvbXBvbmVudHMvXCIgKyB0eXBlICsgXCIuanNcIik7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBcIntcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgIHtcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICAjIyMgRVJST1IgMTpcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICBcIiArIGVyciArIFwiXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiAgICAgICAgIyMjIEVSUk9SIDI6XFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiAgICAgICAgXCIgKyBlcnIyICsgXCJcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgIH1cXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwifVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChuYW1lLCBjb20uQ3JlYXRlKG5hbWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgY29tTmFtZTogbmFtZSwgY29kZTogXCJjcmVhdGVkXCIgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBDcmVhdGUoKSAtPiBDb3VsZCBub3QgY3JlYXRlIGNvbXBvbmVudCBbXCIgKyBuYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdHlwZSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIkVuc3VyZSB5b3UgZGlkIG5vdCBtaXN0eXBlIHRoZSBzdHJpbmcgZm9yIHRoZSA8dHlwZT4gcGFyYW1ldGVyLiBBbHNvIG1ha2Ugc3VyZSB0aGUgY29tcG9uZW50IHR5cGUgYmVpbmcgcmVmZXJlbmNlZCBcXG5cIiArIFxyXG4gICAgICAgICAgICBcImV4aXN0cyB1bmRlciAnLi9jb21wb25lbnRzLyoudHMnIGFuZCBub3QgaW4gYSBkaWZmZXJlbnQgZm9sZGVyIGFzIHdlbGwgYXMgbm90IGluIGEgc3ViZm9sZGVyLlxcblwiICsgXHJcbiAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgY29tTmFtZTogbmFtZSwgY29kZTogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkKGNvbXBvbmVudDogQ29tcG9uZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5oYXMoY29tcG9uZW50LlZHZXROYW1lKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogQWRkKCkgLT4gQ291bGQgbm90IGFkZCBjb21wb25lbnQgW1wiICsgY29tcG9uZW50LlZHZXROYW1lKCkgKyBcIl0gb2YgdHlwZSA8XCIgKyBjb21wb25lbnQuVkdldFR5cGUoKSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCJBIGNvbXBvbmVudCB3aXRoIHRoYXQgbmFtZSBhbHJlYWR5IGV4aXN0cy5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoY29tcG9uZW50LlZHZXROYW1lKCksIGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogQWRkKCkgLT4gQ291bGQgbm90IGFkZCBjb21wb25lbnQgW1wiICsgY29tcG9uZW50LlZHZXROYW1lKCkgKyBcIl0gb2YgdHlwZSA8XCIgKyBjb21wb25lbnQuVkdldFR5cGUoKSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlbW92ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBSZW1vdmUoKSAtPiBDb3VsZCBub3QgcmVtb3ZlIGNvbXBvbmVudCBbXCIgKyBuYW1lICsgXCJdIVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICBcIkEgY29tcG9uZW50IHdpdGggdGhhdCBuYW1lIGRvZXMgbm90IGV4aXN0LlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cy5kZWxldGUobmFtZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBSZW1vdmUoKSAtPiBDb3VsZCBub3QgcmVtb3ZlIGNvbXBvbmVudCBbXCIgKyBuYW1lICsgXCJdIVxcblwiICsgXHJcbiAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMuY2xlYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ29tcG9uZW50TWFuYWdlcjogUmVtb3ZlKCkgLT4gTm8gY29tcG9uZW50cyB0byBjbGVhciEgSSdtIGVtcHR5IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKGNvbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tLlJlSW5pdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29tLlZJbml0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IEluaXQoKSAtPiBjb3VsZCBub3QgaW5pdGlhbGl6ZSBjb21wb25lbnQgW1wiICsgY29tLlZHZXROYW1lKCkgKyBcIl0gb2YgdHlwZSA8XCIgKyBjb20uVkdldFR5cGUoKSArIFwiPiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKGNvbSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb20uSXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb20uVlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBVcGRhdGUoKSAtPiBjb3VsZCBub3QgdXBkYXRlIGNvbXBvbmVudCBbXCIgKyBjb20uVkdldE5hbWUoKSArIFwiXSBvZiB0eXBlIDxcIiArIGNvbS5WR2V0VHlwZSgpICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNodXRkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goY29tID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbS5TaHV0ZG93blJlcXVlc3RlZCgpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbS5WU2h1dGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogU2h1dGRvd24oKSAtPiBjb3VsZCBub3Qgc2h1dGRvd24gY29tcG9uZW50IFtcIiArIGNvbS5WR2V0TmFtZSgpICsgXCJdIG9mIHR5cGUgPFwiICsgY29tLlZHZXRUeXBlKCkgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==