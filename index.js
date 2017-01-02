const SmartHome = require("./lib/smarthome");

const smartHome = new SmartHome();

smartHome.on("needsAuthorization", function (auth) {
    console.log(auth);
});

smartHome.on("stateChanged", function (objectWhichStateHasChanged) {
    console.log("stateChanged");
});

smartHome.on("initializationComplete", function () {
    console.log("INIT COMPLETE!");

    var testSwitch = smartHome.getCapabilityById("461a98f206db40c0b0e1433d2bb240dd");
    testSwitch.setState(false);
});

smartHome.init();