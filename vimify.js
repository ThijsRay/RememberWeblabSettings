let editors = window.wrappedJSObject.aceEditorInstances;

// Check if the item is valid
function isValid(x) {
    return (x !== undefined && x !== null) ? true : false;
}

// Retrieve the settings
function retrieveSettings() {
    let keyboard = browser.storage.sync.get("keyboard").then(onGetKeyboard, onError);
    let theme = browser.storage.sync.get("theme").then(onGetTheme, onError);

    function onGetKeyboard(setting) {
        let keyboard = setting.keyboard;
        if (isValid(keyboard)) {
            for (let item of editors) {
                item.setKeyboardHandler(keyboard);
            }
        }
    }

    function onGetTheme(setting) {
        let theme = setting.theme;
        if (isValid(theme)) {
            for (let item of editors) {
                item.setTheme(theme);
            }
        }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

}

function saveSettings() {
    if (editors.length > 0) {
        let keyboardHandler = editors[0].getKeyboardHandler()["$id"];
        let theme = editors[0].getTheme();
        if (isValid(theme)) {
            browser.storage.sync.set({
                "theme": theme
            });
        }

        if (isValid(keyboardHandler)) {
            browser.storage.sync.set({
                "keyboard": keyboardHandler
            });
        }
    }
}

retrieveSettings();
document.addEventListener("click", saveSettings);
