"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiLi8uLi8iLCJzb3VyY2VzIjpbIk1HS0ZyYW1ld29ya0pTL3NyYy9nYW1lL2NvbXBvbmVudC1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxnQkFBZ0I7SUFRekIsWUFBWSxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQVBELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQU9NLFNBQVMsQ0FBSSxJQUFZO1FBQzVCLElBQUk7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNERBQTRELEdBQUcsSUFBSSxHQUFHLCtDQUErQyxDQUFDLENBQUM7Z0JBQ3JJLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBaUIsQ0FBQztTQUNwRDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsR0FBRyxJQUFJLEdBQUcsTUFBTTtnQkFDMUYsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRU0sY0FBYyxDQUFJLElBQVk7UUFDakMsSUFBSTtZQUNBLElBQUksSUFBSSxHQUFRLElBQUksS0FBSyxFQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBbUIsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw4RUFBOEUsR0FBRyxJQUFJLEdBQUcsTUFBTTtnQkFDNUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVksRUFBRSxJQUFZO1FBQ3BDLElBQUk7WUFDQSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxHQUFHLElBQUksR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTTtvQkFDakosZ0VBQWdFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNoRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsSUFBSSxHQUFRLENBQUM7WUFFYixJQUFJO2dCQUNBLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQ25EO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSTtvQkFDQSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7aUJBQy9EO2dCQUFDLE9BQU8sSUFBSSxFQUFFO29CQUNYLE9BQU8sQ0FBQyxLQUFLLENBQ2IsS0FBSzt3QkFDTCxTQUFTO3dCQUNULHdCQUF3Qjt3QkFDeEIsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLFVBQVUsR0FBRyxJQUFJLEdBQUcsSUFBSTt3QkFDeEIsU0FBUzt3QkFDVCxHQUFHLENBQ0YsQ0FBQztpQkFDTDthQUNKO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxHQUFHLElBQUksR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLE1BQU07Z0JBQ2pILHVIQUF1SDtnQkFDdkgsaUdBQWlHO2dCQUNqRyxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFFTSxHQUFHLENBQUMsU0FBb0I7UUFDM0IsSUFBSTtZQUNBLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0RBQXNELEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTTtvQkFDM0ksNENBQTRDLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNO2dCQUMzSSxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVk7UUFDdEIsSUFBSTtZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsR0FBRyxJQUFJLEdBQUcsTUFBTTtvQkFDMUYsNENBQTRDLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDREQUE0RCxHQUFHLElBQUksR0FBRyxNQUFNO2dCQUMxRixjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsT0FBTztTQUNWO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyw4REFBOEQsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztxQkFDMUk7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsSUFBSTtvQkFDQSxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7d0JBQ25CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDakI7aUJBQ0o7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyw0REFBNEQsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNO3dCQUNySSxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUk7b0JBQ0EsSUFBSSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0JBQ2xDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztxQkFDbkI7aUJBQ0o7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnRUFBZ0UsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNO3dCQUN6SSxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FDSjtBQXRLRCw0Q0FzS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnQuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgY29tcG9uZW50czogTWFwPHN0cmluZywgQ29tcG9uZW50PjtcclxuICAgIHB1YmxpYyBjb21EaXI6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHMuc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21QYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwPHN0cmluZywgQ29tcG9uZW50PigpO1xyXG4gICAgICAgIHRoaXMuY29tRGlyID0gY29tUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0QnlOYW1lPFQ+KG5hbWU6IHN0cmluZyk6IFQgfCBudWxsIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50cy5oYXMobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBHZXRCeU5hbWUoKSAtPiBDb3VsZCBub3QgZ2V0IGNvbXBvbmVudCBbXCIgKyBuYW1lICsgXCJdISBBIGNvbXBvbmVudCB3aXRoIHRoYXQgbmFtZSBkb2VzIG5vdCBleGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cy5nZXQobmFtZSkgYXMgdW5rbm93biBhcyBUO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogR2V0QnlOYW1lKCkgLT4gQ291bGQgbm90IGdldCBjb21wb25lbnQgW1wiICsgbmFtZSArIFwiXSFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0QXJyYXlCeVR5cGU8VD4odHlwZTogc3RyaW5nKTogVFtdIHwgbnVsbCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvbXM6IFRbXSA9IG5ldyBBcnJheTxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaChjb20gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tcy5wdXNoKGNvbSBhcyB1bmtub3duIGFzIFQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb21zO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogR2V0QXJyYXlCeVR5cGUoKSAtPiBDb3VsZCBub3QgZ2V0IGFueSBjb21wb25lbnRzIG9mIHR5cGUgPFwiICsgdHlwZSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ3JlYXRlKG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IENyZWF0ZSgpIC0+IENvdWxkIG5vdCBjcmVhdGUgY29tcG9uZW50IFtcIiArIG5hbWUgKyBcIl0gb2YgdHlwZSA8XCIgKyB0aGlzLmNvbXBvbmVudHMuZ2V0KG5hbWUpLlZHZXRUeXBlKCkgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgIFwiQSBjb21wb25lbnQgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHMuIEV4cGVjdGVkIHR5cGUgd2FzIDxcIiArIHR5cGUgKyBcIj4uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgY29tTmFtZTogbmFtZSwgY29kZTogXCJleGlzdHNcIiB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNvbTogYW55O1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbSA9IHJlcXVpcmUodGhpcy5jb21EaXIgKyBcIi9cIiArIHR5cGUgKyBcIi5qc1wiKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbSA9IHJlcXVpcmUoX19kaXJuYW1lICsgXCIvLi4vY29tcG9uZW50cy9cIiArIHR5cGUgKyBcIi5qc1wiKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycjIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgIFwie1xcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAge1xcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgICMjIyBFUlJPUiAxOlxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgICAgIFwiICsgZXJyICsgXCJcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICAjIyMgRVJST1IgMjpcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiICAgICAgICBcIiArIGVycjIgKyBcIlxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgICAgfVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ9XCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KG5hbWUsIGNvbS5DcmVhdGUobmFtZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBjb21OYW1lOiBuYW1lLCBjb2RlOiBcImNyZWF0ZWRcIiB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IENyZWF0ZSgpIC0+IENvdWxkIG5vdCBjcmVhdGUgY29tcG9uZW50IFtcIiArIG5hbWUgKyBcIl0gb2YgdHlwZSA8XCIgKyB0eXBlICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgIFwiRW5zdXJlIHlvdSBkaWQgbm90IG1pc3R5cGUgdGhlIHN0cmluZyBmb3IgdGhlIDx0eXBlPiBwYXJhbWV0ZXIuIEFsc28gbWFrZSBzdXJlIHRoZSBjb21wb25lbnQgdHlwZSBiZWluZyByZWZlcmVuY2VkIFxcblwiICsgXHJcbiAgICAgICAgICAgIFwiZXhpc3RzIHVuZGVyICcuL2NvbXBvbmVudHMvKi50cycgYW5kIG5vdCBpbiBhIGRpZmZlcmVudCBmb2xkZXIgYXMgd2VsbCBhcyBub3QgaW4gYSBzdWJmb2xkZXIuXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBjb21OYW1lOiBuYW1lLCBjb2RlOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGQoY29tcG9uZW50OiBDb21wb25lbnQpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzLmhhcyhjb21wb25lbnQuVkdldE5hbWUoKSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBBZGQoKSAtPiBDb3VsZCBub3QgYWRkIGNvbXBvbmVudCBbXCIgKyBjb21wb25lbnQuVkdldE5hbWUoKSArIFwiXSBvZiB0eXBlIDxcIiArIGNvbXBvbmVudC5WR2V0VHlwZSgpICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgICAgICBcIkEgY29tcG9uZW50IHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChjb21wb25lbnQuVkdldE5hbWUoKSwgY29tcG9uZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBBZGQoKSAtPiBDb3VsZCBub3QgYWRkIGNvbXBvbmVudCBbXCIgKyBjb21wb25lbnQuVkdldE5hbWUoKSArIFwiXSBvZiB0eXBlIDxcIiArIGNvbXBvbmVudC5WR2V0VHlwZSgpICsgXCI+IVxcblwiICsgXHJcbiAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVtb3ZlKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb21wb25lbnRzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IFJlbW92ZSgpIC0+IENvdWxkIG5vdCByZW1vdmUgY29tcG9uZW50IFtcIiArIG5hbWUgKyBcIl0hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgIFwiQSBjb21wb25lbnQgd2l0aCB0aGF0IG5hbWUgZG9lcyBub3QgZXhpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IFJlbW92ZSgpIC0+IENvdWxkIG5vdCByZW1vdmUgY29tcG9uZW50IFtcIiArIG5hbWUgKyBcIl0hXFxuXCIgKyBcclxuICAgICAgICAgICAgXCIjIyMgRVJST1I6XFxuXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5jbGVhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLndhcm4oXCJDb21wb25lbnRNYW5hZ2VyOiBSZW1vdmUoKSAtPiBObyBjb21wb25lbnRzIHRvIGNsZWFyISBJJ20gZW1wdHkhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goY29tID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb20uUmVJbml0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb20uVkluaXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ29tcG9uZW50TWFuYWdlcjogSW5pdCgpIC0+IGNvdWxkIG5vdCBpbml0aWFsaXplIGNvbXBvbmVudCBbXCIgKyBjb20uVkdldE5hbWUoKSArIFwiXSBvZiB0eXBlIDxcIiArIGNvbS5WR2V0VHlwZSgpICsgXCI+IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudHMuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goY29tID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbS5Jc0luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbS5WVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNvbXBvbmVudE1hbmFnZXI6IFVwZGF0ZSgpIC0+IGNvdWxkIG5vdCB1cGRhdGUgY29tcG9uZW50IFtcIiArIGNvbS5WR2V0TmFtZSgpICsgXCJdIG9mIHR5cGUgPFwiICsgY29tLlZHZXRUeXBlKCkgKyBcIj4hXFxuXCIgKyBcclxuICAgICAgICAgICAgICAgICAgICBcIiMjIyBFUlJPUjpcXG5cIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2h1dGRvd24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50cy5zaXplID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaChjb20gPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tLlNodXRkb3duUmVxdWVzdGVkKCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tLlZTaHV0ZG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb21wb25lbnRNYW5hZ2VyOiBTaHV0ZG93bigpIC0+IGNvdWxkIG5vdCBzaHV0ZG93biBjb21wb25lbnQgW1wiICsgY29tLlZHZXROYW1lKCkgKyBcIl0gb2YgdHlwZSA8XCIgKyBjb20uVkdldFR5cGUoKSArIFwiPiFcXG5cIiArIFxyXG4gICAgICAgICAgICAgICAgICAgIFwiIyMjIEVSUk9SOlxcblwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19