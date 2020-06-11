"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1nYW1lLWxvZ2ljLmpzIiwic291cmNlUm9vdCI6Ii4vLi4vIiwic291cmNlcyI6WyJNR0tGcmFtZXdvcmtKUy9zcmMvZ2FtZS1sb2dpYy9iYXNlLWdhbWUtbG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBa0Q7QUFDbEQsK0VBQW1FO0FBR25FLE1BQWEsYUFBYTtJQVV0QixZQUFZLFFBQWdCO1FBUmxCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDbEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsaUJBQVksR0FBYSxFQUFFLENBQUM7UUFDekIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUd2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDbEMsdUJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3JCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDN0I7YUFDSjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDVixxRkFBcUY7UUFDckYsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssRUFBRTtZQUN0RCwySkFBMko7WUFDM0osSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtnQkFDN0IsMEZBQTBGO2dCQUMxRixPQUFPO2FBQ1Y7WUFFRCxxQkFBcUI7WUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBWSxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBWSxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzdELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRTt3QkFDOUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUNoQjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsT0FBTztTQUNWO1FBRUQsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdEIsMk1BQTJNO1FBQzNNLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDN0IsT0FBTztTQUNWO1FBRUQscUJBQXFCO1FBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQVksV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBWSxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQzdELElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDOUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sU0FBUztRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFeEIsSUFBSSx1QkFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM5QjtJQUNMLENBQUM7Q0FDSjtBQWhGRCxzQ0FnRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQ29yZSB9IGZyb20gXCIuLy4uL2dhbWUvZ2FtZS1jb3JlLmpzXCI7XHJcbmltcG9ydCB7IFZpZXdNYW5hZ2VyIH0gZnJvbSBcIi4vLi4vZ2FtZS1sb2dpYy9nYW1lLXZpZXctbWFuYWdlci5qc1wiO1xyXG5pbXBvcnQgeyBIdW1hblZpZXcgfSBmcm9tIFwiLi8uLi9nYW1lLXZpZXdzL2h1bWFuLXZpZXcuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlR2FtZUxvZ2ljIHtcclxuICAgIHB1YmxpYyBwcmVJbml0RnVuYzogRnVuY3Rpb247XHJcbiAgICBwcm90ZWN0ZWQgcGF1c2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzU2VydmVyTG9naWM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyB2aWV3TWFuOiBWaWV3TWFuYWdlcjtcclxuICAgIHB1YmxpYyBjcmVhdGVkVmlld3M6IHN0cmluZ1tdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgcmVJbml0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByb3RlY3RlZCByZXF1ZXN0U2h1dGRvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih2aWV3UGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy52aWV3TWFuID0gbmV3IFZpZXdNYW5hZ2VyKHZpZXdQYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVkluaXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVJbml0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByZUluaXRGdW5jICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVJbml0RnVuYyh0aGlzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQ29yZS5nYW1lLlF1aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01hbi5Jbml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld01hbi5Jbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlSW5pdCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBWVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIERvIG5vdCBjb250aW51ZSBhbnkgZnVydGhlciBpZiB3ZSBhcmUgbm90IGluaXRpYWxpemVkIG9yIHRoZSBnYW1lIGxvZ2ljIGlzIHBhdXNlZC5cclxuICAgICAgICBpZiAodGhpcy5wYXVzZWQgPT09IHRydWUgfHwgdGhpcy5pc0luaXRpYWxpemVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyBBdCBsZWFzdCBjaGVjayB0aGUgaHVtYW4gdmlldyBpZiB0aGlzIGlzIG5vdCBzZXQgb24gYSBzZXJ2ZXIgc28gdGhhdCBhIHdvcmtpbmcgZGlhbG9nIGNhbiBzdGlsbCBhcHBlYXIgYW5kIGJlIHVzZWQgZm9yIGV4aXQgcHJvbXB0cyBhbmQgd2FybmluZ3MvZXJyb3JzLlxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NlcnZlckxvZ2ljID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTb21ldGhpbmcgbmVlZHMgdG8gY2hlY2sgZm9yIHdoZXRlaHIgb3Igbm90IHdlIGFyZSBzaHV0dGluZyBkb3duIHRoZSBzZXJ2ZXIgaGVyZTpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIGFsbCBodW1hbnMhXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdNYW4uR2V0QXJyYXlCeVR5cGU8SHVtYW5WaWV3PihcIkh1bWFuVmlld1wiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNYW4uR2V0QXJyYXlCeVR5cGU8SHVtYW5WaWV3PihcIkh1bWFuVmlld1wiKS5mb3JFYWNoKGh2ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaHYuVklzSW5pdGlhbGl6ZWQoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodi5WVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB2aWV3cyB0aGF0IGhhdmUgYXV0b1VwZGF0ZSBzZXQgdG8gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZpZXdNYW4uVXBkYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGdhbWUgc2VydmVyLCBubyBmdXJ0aGVyIHVwZGF0ZXMgYXJlIG5lZWRlZC4gKE5vIEh1bWFuVmlld3Mgb24gZ2FtZSBzZXJ2ZXIuLi4gREVTVFJPWSBBTEwgSFVNQU5TISBcIlVtLi4uIExhbWJlcnQ/IEFtIEkgYmVpbmcgc3RlYWx0aHkgZW5vdWdoP1wiIDogXCJLZWVwIGl0IHVwIEZpc2hlciwgeW91J3JlIGRvaW5nIGdyZWF0IVwiKVxyXG4gICAgICAgIGlmICh0aGlzLmlzU2VydmVyTG9naWMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVuZGVyIGFsbCBodW1hbnMhXHJcbiAgICAgICAgaWYgKHRoaXMudmlld01hbi5HZXRBcnJheUJ5VHlwZTxIdW1hblZpZXc+KFwiSHVtYW5WaWV3XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3TWFuLkdldEFycmF5QnlUeXBlPEh1bWFuVmlldz4oXCJIdW1hblZpZXdcIikuZm9yRWFjaChodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaHYuVklzSW5pdGlhbGl6ZWQoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh2LlZVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBWU2h1dGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3TWFuLlNodXRkb3duKCk7XHJcblxyXG4gICAgICAgIGlmIChHYW1lQ29yZS5nYW1lLlF1aXR0aW5nKCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3TWFuLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==