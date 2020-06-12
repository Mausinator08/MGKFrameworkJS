"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGameLogic = void 0;
const game_core_js_1 = require("./../game/game-core.js");
const game_view_manager_js_1 = require("./../game-logic/game-view-manager.js");
class BaseGameLogic {
    constructor(viewPath) {
        this.paused = false;
        this.isInitialized = false;
        this.isServerLogic = false;
        this.createdViews = [];
        this.reInit = true;
        this.requestShutdown = false;
        this.viewMan = new game_view_manager_js_1.ViewManager(viewPath);
    }
    VInit() {
        if (this.reInit === true) {
            if (this.preInitFunc !== null) {
                if (this.preInitFunc(this) === false) {
                    game_core_js_1.GameCore.game.Quit();
                    return false;
                }
                else {
                    this.viewMan.Init();
                    this.isInitialized = true;
                }
            }
        }
        else {
            this.viewMan.Init();
        }
        this.reInit = false;
        return true;
    }
    VUpdate() {
        // Do not continue any further if we are not initialized or the game logic is paused.
        if (this.paused === true || this.isInitialized === false) {
            // At least check the human view if this is not set on a server so that a working dialog can still appear and be used for exit prompts and warnings/errors.
            if (this.isServerLogic === true) {
                // TODO: Something needs to check for whetehr or not we are shutting down the server here:
                return;
            }
            // Render all humans!
            if (this.viewMan.GetArrayByType("HumanView").length > 0) {
                this.viewMan.GetArrayByType("HumanView").forEach(hv => {
                    if (hv.VIsInitialized() === true) {
                        hv.VUpdate();
                    }
                });
            }
            return;
        }
        // Update views that have autoUpdate set to true;
        this.viewMan.Update();
        // If this is the game server, no further updates are needed. (No HumanViews on game server... DESTROY ALL HUMANS! "Um... Lambert? Am I being stealthy enough?" : "Keep it up Fisher, you're doing great!")
        if (this.isServerLogic === true) {
            return;
        }
        // Render all humans!
        if (this.viewMan.GetArrayByType("HumanView").length > 0) {
            this.viewMan.GetArrayByType("HumanView").forEach(hv => {
                if (hv.VIsInitialized() === true) {
                    hv.VUpdate();
                }
            });
        }
    }
    VShutdown() {
        this.viewMan.Shutdown();
        if (game_core_js_1.GameCore.game.Quitting() === true) {
            this.viewMan.Clear();
            this.isInitialized = false;
        }
    }
}
exports.BaseGameLogic = BaseGameLogic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1nYW1lLWxvZ2ljLmpzIiwic291cmNlUm9vdCI6Ii4vLi4vIiwic291cmNlcyI6WyJNR0tGcmFtZXdvcmtKUy9zcmMvZ2FtZS1sb2dpYy9iYXNlLWdhbWUtbG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseURBQWtEO0FBQ2xELCtFQUFtRTtBQUduRSxNQUFhLGFBQWE7SUFVdEIsWUFBWSxRQUFnQjtRQVJsQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtDQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLEtBQUs7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ2xDLHVCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNyQixPQUFPLEtBQUssQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7aUJBQzdCO2FBQ0o7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPO1FBQ1YscUZBQXFGO1FBQ3JGLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDdEQsMkpBQTJKO1lBQzNKLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLDBGQUEwRjtnQkFDMUYsT0FBTzthQUNWO1lBRUQscUJBQXFCO1lBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQVksV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQVksV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUM3RCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0JBQzlCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU87U0FDVjtRQUVELGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRCLDJNQUEyTTtRQUMzTSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQzdCLE9BQU87U0FDVjtRQUVELHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFZLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQVksV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM3RCxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQzlCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLFNBQVM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXhCLElBQUksdUJBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDOUI7SUFDTCxDQUFDO0NBQ0o7QUFoRkQsc0NBZ0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUNvcmUgfSBmcm9tIFwiLi8uLi9nYW1lL2dhbWUtY29yZS5qc1wiO1xyXG5pbXBvcnQgeyBWaWV3TWFuYWdlciB9IGZyb20gXCIuLy4uL2dhbWUtbG9naWMvZ2FtZS12aWV3LW1hbmFnZXIuanNcIjtcclxuaW1wb3J0IHsgSHVtYW5WaWV3IH0gZnJvbSBcIi4vLi4vZ2FtZS12aWV3cy9odW1hbi12aWV3LmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZUdhbWVMb2dpYyB7XHJcbiAgICBwdWJsaWMgcHJlSW5pdEZ1bmM6IEZ1bmN0aW9uO1xyXG4gICAgcHJvdGVjdGVkIHBhdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc1NlcnZlckxvZ2ljOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdmlld01hbjogVmlld01hbmFnZXI7XHJcbiAgICBwdWJsaWMgY3JlYXRlZFZpZXdzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIHJlSW5pdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcm90ZWN0ZWQgcmVxdWVzdFNodXRkb3duOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3Iodmlld1BhdGg6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudmlld01hbiA9IG5ldyBWaWV3TWFuYWdlcih2aWV3UGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFZJbml0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnJlSW5pdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmVJbml0RnVuYyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlSW5pdEZ1bmModGhpcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUNvcmUuZ2FtZS5RdWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNYW4uSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdNYW4uSW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZUluaXQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVlVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBEbyBub3QgY29udGludWUgYW55IGZ1cnRoZXIgaWYgd2UgYXJlIG5vdCBpbml0aWFsaXplZCBvciB0aGUgZ2FtZSBsb2dpYyBpcyBwYXVzZWQuXHJcbiAgICAgICAgaWYgKHRoaXMucGF1c2VkID09PSB0cnVlIHx8IHRoaXMuaXNJbml0aWFsaXplZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gQXQgbGVhc3QgY2hlY2sgdGhlIGh1bWFuIHZpZXcgaWYgdGhpcyBpcyBub3Qgc2V0IG9uIGEgc2VydmVyIHNvIHRoYXQgYSB3b3JraW5nIGRpYWxvZyBjYW4gc3RpbGwgYXBwZWFyIGFuZCBiZSB1c2VkIGZvciBleGl0IHByb21wdHMgYW5kIHdhcm5pbmdzL2Vycm9ycy5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZXJ2ZXJMb2dpYyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU29tZXRoaW5nIG5lZWRzIHRvIGNoZWNrIGZvciB3aGV0ZWhyIG9yIG5vdCB3ZSBhcmUgc2h1dHRpbmcgZG93biB0aGUgc2VydmVyIGhlcmU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBhbGwgaHVtYW5zIVxyXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3TWFuLkdldEFycmF5QnlUeXBlPEh1bWFuVmlldz4oXCJIdW1hblZpZXdcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TWFuLkdldEFycmF5QnlUeXBlPEh1bWFuVmlldz4oXCJIdW1hblZpZXdcIikuZm9yRWFjaChodiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh2LlZJc0luaXRpYWxpemVkKCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHYuVlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdmlld3MgdGhhdCBoYXZlIGF1dG9VcGRhdGUgc2V0IHRvIHRydWU7XHJcbiAgICAgICAgdGhpcy52aWV3TWFuLlVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBnYW1lIHNlcnZlciwgbm8gZnVydGhlciB1cGRhdGVzIGFyZSBuZWVkZWQuIChObyBIdW1hblZpZXdzIG9uIGdhbWUgc2VydmVyLi4uIERFU1RST1kgQUxMIEhVTUFOUyEgXCJVbS4uLiBMYW1iZXJ0PyBBbSBJIGJlaW5nIHN0ZWFsdGh5IGVub3VnaD9cIiA6IFwiS2VlcCBpdCB1cCBGaXNoZXIsIHlvdSdyZSBkb2luZyBncmVhdCFcIilcclxuICAgICAgICBpZiAodGhpcy5pc1NlcnZlckxvZ2ljID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbmRlciBhbGwgaHVtYW5zIVxyXG4gICAgICAgIGlmICh0aGlzLnZpZXdNYW4uR2V0QXJyYXlCeVR5cGU8SHVtYW5WaWV3PihcIkh1bWFuVmlld1wiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hbi5HZXRBcnJheUJ5VHlwZTxIdW1hblZpZXc+KFwiSHVtYW5WaWV3XCIpLmZvckVhY2goaHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGh2LlZJc0luaXRpYWxpemVkKCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBodi5WVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVlNodXRkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlld01hbi5TaHV0ZG93bigpO1xyXG5cclxuICAgICAgICBpZiAoR2FtZUNvcmUuZ2FtZS5RdWl0dGluZygpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hbi5DbGVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=