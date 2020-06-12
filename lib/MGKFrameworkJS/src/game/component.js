"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(name, type) {
        this.name = "component";
        this.type = "component";
        this.isInitialized = false;
        this.reInit = true;
        this.requestShutdown = false;
        this.name = name;
        this.type = type;
    }
    get IsInitialized() {
        return this.isInitialized;
    }
    get ReInit() {
        return this.reInit;
    }
    ReInitialize() {
        this.reInit = true;
        this.isInitialized = false;
    }
    ShutdownRequested() {
        return this.requestShutdown;
    }
    RequestShutdown() {
        this.requestShutdown = true;
    }
    // Component functions to be overriden.
    // Core functions.
    VInit() {
        this.reInit = false;
        return this.isInitialized;
    }
    VUpdate() {
        if (!this.isInitialized) {
            console.error("Component: VUpdate() -> Component not initialized! Could not update component [" + this.name + "] of type <" + this.type + ">.");
        }
    }
    VShutdown() {
        this.isInitialized = false;
        this.requestShutdown = false;
    }
    // Name and Type retrieval functions
    VGetName() {
        return this.name;
    }
    VGetType() {
        return this.type;
    }
}
exports.Component = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4vLi4vIiwic291cmNlcyI6WyJNR0tGcmFtZXdvcmtKUy9zcmMvZ2FtZS9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxTQUFTO0lBT2xCLFlBQVksSUFBWSxFQUFFLElBQVk7UUFONUIsU0FBSSxHQUFXLFdBQVcsQ0FBQztRQUMzQixTQUFJLEdBQVcsV0FBVyxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU0sWUFBWTtRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsa0JBQWtCO0lBQ1gsS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRU0sT0FBTztRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUZBQWlGLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNuSjtJQUNMLENBQUM7SUFFTSxTQUFTO1FBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELG9DQUFvQztJQUM3QixRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQTNERCw4QkEyREMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcclxuICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmcgPSBcImNvbXBvbmVudFwiO1xyXG4gICAgcHJvdGVjdGVkIHR5cGU6IHN0cmluZyA9IFwiY29tcG9uZW50XCI7XHJcbiAgICBwcm90ZWN0ZWQgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIHJlSW5pdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcm90ZWN0ZWQgcmVxdWVzdFNodXRkb3duOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJc0luaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzSW5pdGlhbGl6ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBSZUluaXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVJbml0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZUluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZUluaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaHV0ZG93blJlcXVlc3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0U2h1dGRvd247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlcXVlc3RTaHV0ZG93bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3RTaHV0ZG93biA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcG9uZW50IGZ1bmN0aW9ucyB0byBiZSBvdmVycmlkZW4uXHJcbiAgICAvLyBDb3JlIGZ1bmN0aW9ucy5cclxuICAgIHB1YmxpYyBWSW5pdCgpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLnJlSW5pdCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzSW5pdGlhbGl6ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFZVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudDogVlVwZGF0ZSgpIC0+IENvbXBvbmVudCBub3QgaW5pdGlhbGl6ZWQhIENvdWxkIG5vdCB1cGRhdGUgY29tcG9uZW50IFtcIiArIHRoaXMubmFtZSArIFwiXSBvZiB0eXBlIDxcIiArIHRoaXMudHlwZSArIFwiPi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBWU2h1dGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2h1dGRvd24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOYW1lIGFuZCBUeXBlIHJldHJpZXZhbCBmdW5jdGlvbnNcclxuICAgIHB1YmxpYyBWR2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFZHZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH1cclxufSJdfQ==