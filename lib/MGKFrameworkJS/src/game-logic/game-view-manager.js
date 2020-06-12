"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewManager = void 0;
class ViewManager {
    constructor(viewPath) {
        this.views = new Map();
        this.viewDir = viewPath;
    }
    get count() {
        return this.views.size;
    }
    GetByName(name) {
        try {
            if (!this.views.has(name)) {
                console.error("ViewManager: GetByName() -> Could not get view [" + name + "]! A view with that name does not exist.");
                return null;
            }
            return this.views.get(name);
        }
        catch (err) {
            console.error("ViewManager: GetByName() -> Could not get view [" + name + "]!\n" +
                "### ERROR:\n" + err);
            return null;
        }
    }
    GetArrayByType(type) {
        try {
            let coms = new Array();
            this.views.forEach(com => {
                coms.push(com);
            });
            return coms;
        }
        catch (err) {
            console.error("ViewManager: GetArrayByType() -> Could not get any views of type <" + type + ">!\n" +
                "### ERROR:\n" + err);
            return null;
        }
    }
    Create(name, type) {
        try {
            if (this.views.has(name)) {
                console.error("ViewManager: Create() -> Could not create view [" + name + "] of type <" + this.views.get(name).type + ">!\n" +
                    "A view with that name already exists. Expected type was <" + type + ">.");
                return JSON.stringify({ viewName: name, code: "exists" });
            }
            let view;
            try {
                view = require(this.viewDir + "/" + type + ".js");
            }
            catch (err) {
                try {
                    view = require(__dirname + "/../game-views/" + type + ".js");
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
            this.views.set(name, view.Create(name));
            return JSON.stringify({ viewName: name, code: "created" });
        }
        catch (err) {
            console.error("ViewManager: Create() -> Could not create view [" + name + "] of type <" + type + ">!\n" +
                "Ensure you did not mistype the string for the <type> parameter. Also make sure the view type being referenced \n" +
                "exists under './views/*.ts' and not in a different folder as well as not in a subfolder.\n" +
                "### ERROR:\n" + err);
            return JSON.stringify({ viewName: name, code: "error" });
        }
    }
    Add(view) {
        try {
            if (this.views.has(view.name)) {
                console.error("ViewManager: Add() -> Could not add view [" + view.name + "] of type <" + view.type + ">!\n" +
                    "A view with that name already exists.");
                return false;
            }
            this.views.set(view.name, view);
            return true;
        }
        catch (err) {
            console.error("ViewManager: Add() -> Could not add view [" + view.name + "] of type <" + view.type + ">!\n" +
                "### ERROR:\n" + err);
            return false;
        }
    }
    Remove(name) {
        try {
            if (!this.views.has(name)) {
                console.error("ViewManager: Remove() -> Could not remove view [" + name + "]!\n" +
                    "A view with that name does not exist.");
                return false;
            }
            return this.views.delete(name);
        }
        catch (err) {
            console.error("ViewManager: Remove() -> Could not remove view [" + name + "]!\n" +
                "### ERROR:\n" + err);
            return false;
        }
    }
    Clear() {
        if (this.views.size > 0) {
            this.views.clear();
            return;
        }
        console.warn("ViewManager: Remove() -> No views to clear! I'm empty!");
    }
    Init() {
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
    Update() {
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
                }
                catch (err) {
                    console.error("ViewManager: Update() -> could not update view [" + vu.name + "] of type <" + vu.type + ">!\n" +
                        "### ERROR:\n" + err);
                }
            });
        }
    }
    Shutdown() {
        if (this.views.size > 0) {
            this.views.forEach(vu => {
                try {
                    if (vu.VShutdownRequested() === true) {
                        vu.VShutdown();
                    }
                }
                catch (err) {
                    console.error("ViewManager: Shutdown() -> could not shutdown view [" + vu.name + "] of type <" + vu.type + ">!\n" +
                        "### ERROR:\n" + err);
                }
            });
        }
    }
}
exports.ViewManager = ViewManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS12aWV3LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi8uLi8iLCJzb3VyY2VzIjpbIk1HS0ZyYW1ld29ya0pTL3NyYy9nYW1lLWxvZ2ljL2dhbWUtdmlldy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsV0FBVztJQVFwQixZQUFZLFFBQWdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQVBELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQU9NLFNBQVMsQ0FBSSxJQUFZO1FBQzVCLElBQUk7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0RBQWtELEdBQUcsSUFBSSxHQUFHLDBDQUEwQyxDQUFDLENBQUM7Z0JBQ3RILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBaUIsQ0FBQztTQUMvQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrREFBa0QsR0FBRyxJQUFJLEdBQUcsTUFBTTtnQkFDaEYsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRU0sY0FBYyxDQUFJLElBQVk7UUFDakMsSUFBSTtZQUNBLElBQUksSUFBSSxHQUFRLElBQUksS0FBSyxFQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBbUIsQ0FBQyxDQUFDO1lB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LEdBQUcsYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTTt3QkFDakgsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0o7QUEzS0Qsa0NBMktDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUdhbWVWaWV3IH0gZnJvbSBcIi4vLi4vZ2FtZS12aWV3LWludGVyZmFjZS5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgdmlld3M6IE1hcDxzdHJpbmcsIElHYW1lVmlldz47XHJcbiAgICBwdWJsaWMgdmlld0Rpcjogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld3Muc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih2aWV3UGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy52aWV3cyA9IG5ldyBNYXA8c3RyaW5nLCBJR2FtZVZpZXc+KCk7XHJcbiAgICAgICAgdGhpcy52aWV3RGlyID0gdmlld1BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEJ5TmFtZTxUPihuYW1lOiBzdHJpbmcpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZXdzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBHZXRCeU5hbWUoKSAtPiBDb3VsZCBub3QgZ2V0IHZpZXcgW1wiICsgbmFtZSArIFwiXSEgQSB2aWV3IHdpdGggdGhhdCBuYW1lIGRvZXMgbm90IGV4aXN0LlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3cy5nZXQobmFtZSkgYXMgdW5rbm93biBhcyBUO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IEdldEJ5TmFtZSgpIC0+IENvdWxkIG5vdCBnZXQgdmlldyBbXCIgKyBuYW1lICsgXCJdIVxcblwiICsgXHJcbiAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRBcnJheUJ5VHlwZTxUPih0eXBlOiBzdHJpbmcpOiBUW10gfCBudWxsIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgY29tczogVFtdID0gbmV3IEFycmF5PFQ+KCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld3MuZm9yRWFjaChjb20gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tcy5wdXNoKGNvbSBhcyB1bmtub3duIGFzIFQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb21zO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IEdldEFycmF5QnlUeXBlKCkgLT4gQ291bGQgbm90IGdldCBhbnkgdmlld3Mgb2YgdHlwZSA8XCIgKyB0eXBlICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDcmVhdGUobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBDcmVhdGUoKSAtPiBDb3VsZCBub3QgY3JlYXRlIHZpZXcgW1wiICsgbmFtZSArIFwiXSBvZiB0eXBlIDxcIiArIHRoaXMudmlld3MuZ2V0KG5hbWUpLnR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgIFwiQSB2aWV3IHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzLiBFeHBlY3RlZCB0eXBlIHdhcyA8XCIgKyB0eXBlICsgXCI+LlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IHZpZXdOYW1lOiBuYW1lLCBjb2RlOiBcImV4aXN0c1wiIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldzogYW55O1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZpZXcgPSByZXF1aXJlKHRoaXMudmlld0RpciArIFwiL1wiICsgdHlwZSArIFwiLmpzXCIpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldyA9IHJlcXVpcmUoX19kaXJuYW1lICsgXCIvLi4vZ2FtZS12aWV3cy9cIiArIHR5cGUgKyBcIi5qc1wiKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycjIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgIFwie1xcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAge1xcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICMjIyBFUlJPUiAxOlxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgIFwiICsgZXJyICsgXCJcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICAjIyMgRVJST1IgMjpcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICBcIiArIGVycjIgKyBcIlxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgfVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ9XCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZXdzLnNldChuYW1lLCB2aWV3LkNyZWF0ZShuYW1lKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IHZpZXdOYW1lOiBuYW1lLCBjb2RlOiBcImNyZWF0ZWRcIiB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBDcmVhdGUoKSAtPiBDb3VsZCBub3QgY3JlYXRlIHZpZXcgW1wiICsgbmFtZSArIFwiXSBvZiB0eXBlIDxcIiArIHR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCJFbnN1cmUgeW91IGRpZCBub3QgbWlzdHlwZSB0aGUgc3RyaW5nIGZvciB0aGUgPHR5cGU+IHBhcmFtZXRlci4gQWxzbyBtYWtlIHN1cmUgdGhlIHZpZXcgdHlwZSBiZWluZyByZWZlcmVuY2VkIFxcblwiICsgXHJcbiAgICAgICAgICAgIFwiZXhpc3RzIHVuZGVyICcuL3ZpZXdzLyoudHMnIGFuZCBub3QgaW4gYSBkaWZmZXJlbnQgZm9sZGVyIGFzIHdlbGwgYXMgbm90IGluIGEgc3ViZm9sZGVyLlxcblwiICsgXHJcbiAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgdmlld05hbWU6IG5hbWUsIGNvZGU6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZCh2aWV3OiBJR2FtZVZpZXcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3cy5oYXModmlldy5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBBZGQoKSAtPiBDb3VsZCBub3QgYWRkIHZpZXcgW1wiICsgdmlldy5uYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdmlldy50eXBlICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICBcIkEgdmlldyB3aXRoIHRoYXQgbmFtZSBhbHJlYWR5IGV4aXN0cy5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlld3Muc2V0KHZpZXcubmFtZSwgdmlldyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IEFkZCgpIC0+IENvdWxkIG5vdCBhZGQgdmlldyBbXCIgKyB2aWV3Lm5hbWUgKyBcIl0gb2YgdHlwZSA8XCIgKyB2aWV3LnR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZW1vdmUobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnZpZXdzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBSZW1vdmUoKSAtPiBDb3VsZCBub3QgcmVtb3ZlIHZpZXcgW1wiICsgbmFtZSArIFwiXSFcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCJBIHZpZXcgd2l0aCB0aGF0IG5hbWUgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3cy5kZWxldGUobmFtZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWaWV3TWFuYWdlcjogUmVtb3ZlKCkgLT4gQ291bGQgbm90IHJlbW92ZSB2aWV3IFtcIiArIG5hbWUgKyBcIl0hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3cy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUud2FybihcIlZpZXdNYW5hZ2VyOiBSZW1vdmUoKSAtPiBObyB2aWV3cyB0byBjbGVhciEgSSdtIGVtcHR5IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3cy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdzLmZvckVhY2godnUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZ1LlZJc1JlSW5pdCgpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2dS5WSW5pdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWaWV3TWFuYWdlcjogSW5pdCgpIC0+IGNvdWxkIG5vdCBpbml0aWFsaXplIHZpZXcgW1wiICsgdnUubmFtZSArIFwiXSBvZiB0eXBlIDxcIiArIHZ1LnR5cGUgKyBcIj4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlld3Muc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3cy5mb3JFYWNoKHZ1ID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdXBkYXRpbmcgaXMgc3VwcG9zZWQgdG8gYmUgbWFudWFsLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ1LmF1dG9VcGRhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlNraXAgdGhpcyB2aWV3LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2dS5WSXNJbml0aWFsaXplZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ1LlZVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IFVwZGF0ZSgpIC0+IGNvdWxkIG5vdCB1cGRhdGUgdmlldyBbXCIgKyB2dS5uYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdnUudHlwZSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaHV0ZG93bigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3cy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdzLmZvckVhY2godnUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnUuVlNodXRkb3duUmVxdWVzdGVkKCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnUuVlNodXRkb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBTaHV0ZG93bigpIC0+IGNvdWxkIG5vdCBzaHV0ZG93biB2aWV3IFtcIiArIHZ1Lm5hbWUgKyBcIl0gb2YgdHlwZSA8XCIgKyB2dS50eXBlICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=