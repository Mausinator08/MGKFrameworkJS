"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4vLi4vIiwic291cmNlcyI6WyJNR0tGcmFtZXdvcmtKUy9zcmMvZ2FtZS9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLFNBQVM7SUFPbEIsWUFBWSxJQUFZLEVBQUUsSUFBWTtRQU41QixTQUFJLEdBQVcsV0FBVyxDQUFDO1FBQzNCLFNBQUksR0FBVyxXQUFXLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUd2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxrQkFBa0I7SUFDWCxLQUFLO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpRkFBaUYsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ25KO0lBQ0wsQ0FBQztJQUVNLFNBQVM7UUFDWixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsb0NBQW9DO0lBQzdCLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBM0RELDhCQTJEQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb21wb25lbnQge1xyXG4gICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZyA9IFwiY29tcG9uZW50XCI7XHJcbiAgICBwcm90ZWN0ZWQgdHlwZTogc3RyaW5nID0gXCJjb21wb25lbnRcIjtcclxuICAgIHByb3RlY3RlZCBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgcmVJbml0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByb3RlY3RlZCByZXF1ZXN0U2h1dGRvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IElzSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbml0aWFsaXplZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFJlSW5pdCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZUluaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlSW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlSW5pdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNodXRkb3duUmVxdWVzdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RTaHV0ZG93bjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVxdWVzdFNodXRkb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdFNodXRkb3duID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb21wb25lbnQgZnVuY3Rpb25zIHRvIGJlIG92ZXJyaWRlbi5cclxuICAgIC8vIENvcmUgZnVuY3Rpb25zLlxyXG4gICAgcHVibGljIFZJbml0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMucmVJbml0ID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbml0aWFsaXplZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVlVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50OiBWVXBkYXRlKCkgLT4gQ29tcG9uZW50IG5vdCBpbml0aWFsaXplZCEgQ291bGQgbm90IHVwZGF0ZSBjb21wb25lbnQgW1wiICsgdGhpcy5uYW1lICsgXCJdIG9mIHR5cGUgPFwiICsgdGhpcy50eXBlICsgXCI+LlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFZTaHV0ZG93bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlcXVlc3RTaHV0ZG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5hbWUgYW5kIFR5cGUgcmV0cmlldmFsIGZ1bmN0aW9uc1xyXG4gICAgcHVibGljIFZHZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVkdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfVxyXG59Il19