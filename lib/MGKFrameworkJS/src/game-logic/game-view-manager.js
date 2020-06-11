"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS12aWV3LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi8uLi8iLCJzb3VyY2VzIjpbIk1HS0ZyYW1ld29ya0pTL3NyYy9nYW1lLWxvZ2ljL2dhbWUtdmlldy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxXQUFXO0lBUXBCLFlBQVksUUFBZ0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBUEQsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBT00sU0FBUyxDQUFJLElBQVk7UUFDNUIsSUFBSTtZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxrREFBa0QsR0FBRyxJQUFJLEdBQUcsMENBQTBDLENBQUMsQ0FBQztnQkFDdEgsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFpQixDQUFDO1NBQy9DO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxHQUFHLElBQUksR0FBRyxNQUFNO2dCQUNoRixjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTSxjQUFjLENBQUksSUFBWTtRQUNqQyxJQUFJO1lBQ0EsSUFBSSxJQUFJLEdBQVEsSUFBSSxLQUFLLEVBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFtQixDQUFDLENBQUM7WUFD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R0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDLElBQUksR0FBRyxNQUFNO3dCQUNqSCxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FDSjtBQTNLRCxrQ0EyS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJR2FtZVZpZXcgfSBmcm9tIFwiLi8uLi9nYW1lLXZpZXctaW50ZXJmYWNlLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmlld01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSB2aWV3czogTWFwPHN0cmluZywgSUdhbWVWaWV3PjtcclxuICAgIHB1YmxpYyB2aWV3RGlyOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGdldCBjb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aWV3cy5zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZpZXdQYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnZpZXdzID0gbmV3IE1hcDxzdHJpbmcsIElHYW1lVmlldz4oKTtcclxuICAgICAgICB0aGlzLnZpZXdEaXIgPSB2aWV3UGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0QnlOYW1lPFQ+KG5hbWU6IHN0cmluZyk6IFQgfCBudWxsIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudmlld3MuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IEdldEJ5TmFtZSgpIC0+IENvdWxkIG5vdCBnZXQgdmlldyBbXCIgKyBuYW1lICsgXCJdISBBIHZpZXcgd2l0aCB0aGF0IG5hbWUgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdzLmdldChuYW1lKSBhcyB1bmtub3duIGFzIFQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWaWV3TWFuYWdlcjogR2V0QnlOYW1lKCkgLT4gQ291bGQgbm90IGdldCB2aWV3IFtcIiArIG5hbWUgKyBcIl0hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEFycmF5QnlUeXBlPFQ+KHR5cGU6IHN0cmluZyk6IFRbXSB8IG51bGwge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjb21zOiBUW10gPSBuZXcgQXJyYXk8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3cy5mb3JFYWNoKGNvbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21zLnB1c2goY29tIGFzIHVua25vd24gYXMgVCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbXM7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWaWV3TWFuYWdlcjogR2V0QXJyYXlCeVR5cGUoKSAtPiBDb3VsZCBub3QgZ2V0IGFueSB2aWV3cyBvZiB0eXBlIDxcIiArIHR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENyZWF0ZShuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmlld3MuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IENyZWF0ZSgpIC0+IENvdWxkIG5vdCBjcmVhdGUgdmlldyBbXCIgKyBuYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdGhpcy52aWV3cy5nZXQobmFtZSkudHlwZSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgXCJBIHZpZXcgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHMuIEV4cGVjdGVkIHR5cGUgd2FzIDxcIiArIHR5cGUgKyBcIj4uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgdmlld05hbWU6IG5hbWUsIGNvZGU6IFwiZXhpc3RzXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3OiBhbnk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmlldyA9IHJlcXVpcmUodGhpcy52aWV3RGlyICsgXCIvXCIgKyB0eXBlICsgXCIuanNcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3ID0gcmVxdWlyZShfX2Rpcm5hbWUgKyBcIi8uLi9nYW1lLXZpZXdzL1wiICsgdHlwZSArIFwiLmpzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ7XFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiAgICB7XFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiAgICAgICAgIyMjIEVSUk9SIDE6XFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiAgICAgICAgXCIgKyBlcnIgKyBcIlxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICMjIyBFUlJPUiAyOlxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgIFwiICsgZXJyMiArIFwiXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiAgICB9XFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIn1cIlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlld3Muc2V0KG5hbWUsIHZpZXcuQ3JlYXRlKG5hbWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgdmlld05hbWU6IG5hbWUsIGNvZGU6IFwiY3JlYXRlZFwiIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IENyZWF0ZSgpIC0+IENvdWxkIG5vdCBjcmVhdGUgdmlldyBbXCIgKyBuYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdHlwZSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIkVuc3VyZSB5b3UgZGlkIG5vdCBtaXN0eXBlIHRoZSBzdHJpbmcgZm9yIHRoZSA8dHlwZT4gcGFyYW1ldGVyLiBBbHNvIG1ha2Ugc3VyZSB0aGUgdmlldyB0eXBlIGJlaW5nIHJlZmVyZW5jZWQgXFxuXCIgKyBcclxuICAgICAgICAgICAgXCJleGlzdHMgdW5kZXIgJy4vdmlld3MvKi50cycgYW5kIG5vdCBpbiBhIGRpZmZlcmVudCBmb2xkZXIgYXMgd2VsbCBhcyBub3QgaW4gYSBzdWJmb2xkZXIuXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyB2aWV3TmFtZTogbmFtZSwgY29kZTogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkKHZpZXc6IElHYW1lVmlldyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdzLmhhcyh2aWV3Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IEFkZCgpIC0+IENvdWxkIG5vdCBhZGQgdmlldyBbXCIgKyB2aWV3Lm5hbWUgKyBcIl0gb2YgdHlwZSA8XCIgKyB2aWV3LnR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgIFwiQSB2aWV3IHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3cy5zZXQodmlldy5uYW1lLCB2aWV3KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWaWV3TWFuYWdlcjogQWRkKCkgLT4gQ291bGQgbm90IGFkZCB2aWV3IFtcIiArIHZpZXcubmFtZSArIFwiXSBvZiB0eXBlIDxcIiArIHZpZXcudHlwZSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlbW92ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudmlld3MuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IFJlbW92ZSgpIC0+IENvdWxkIG5vdCByZW1vdmUgdmlldyBbXCIgKyBuYW1lICsgXCJdIVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICBcIkEgdmlldyB3aXRoIHRoYXQgbmFtZSBkb2VzIG5vdCBleGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdzLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBSZW1vdmUoKSAtPiBDb3VsZCBub3QgcmVtb3ZlIHZpZXcgW1wiICsgbmFtZSArIFwiXSFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiVmlld01hbmFnZXI6IFJlbW92ZSgpIC0+IE5vIHZpZXdzIHRvIGNsZWFyISBJJ20gZW1wdHkhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld3MuZm9yRWFjaCh2dSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodnUuVklzUmVJbml0KCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZ1LlZJbml0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlZpZXdNYW5hZ2VyOiBJbml0KCkgLT4gY291bGQgbm90IGluaXRpYWxpemUgdmlldyBbXCIgKyB2dS5uYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdnUudHlwZSArIFwiPiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3cy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdzLmZvckVhY2godnUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB1cGRhdGluZyBpcyBzdXBwb3NlZCB0byBiZSBtYW51YWwuLi5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodnUuYXV0b1VwZGF0ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLi4uU2tpcCB0aGlzIHZpZXcuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ1LlZJc0luaXRpYWxpemVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnUuVlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJWaWV3TWFuYWdlcjogVXBkYXRlKCkgLT4gY291bGQgbm90IHVwZGF0ZSB2aWV3IFtcIiArIHZ1Lm5hbWUgKyBcIl0gb2YgdHlwZSA8XCIgKyB2dS50eXBlICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNodXRkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld3MuZm9yRWFjaCh2dSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2dS5WU2h1dGRvd25SZXF1ZXN0ZWQoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2dS5WU2h1dGRvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVmlld01hbmFnZXI6IFNodXRkb3duKCkgLT4gY291bGQgbm90IHNodXRkb3duIHZpZXcgW1wiICsgdnUubmFtZSArIFwiXSBvZiB0eXBlIDxcIiArIHZ1LnR5cGUgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==