class GameEvent {
    subscribe(callback) {
        this._callbacks.push(callback);
    }
    unsubscribe(callback) {
        const index = this._callbacks.findIndex((cb) => cb === callback);
        if (index != -1) {
            this._callbacks.splice(index);
        }
    }
    invoke(args) {
        this._callbacks.forEach(cb => {
            cb(...args);
        });
    }
}
export var KeyCode;
(function (KeyCode) {
    KeyCode["A"] = "KeyA";
    KeyCode["B"] = "KeyB";
    KeyCode["C"] = "KeyC";
    KeyCode["D"] = "KeyD";
    KeyCode["E"] = "KeyE";
    KeyCode["F"] = "KeyF";
    KeyCode["G"] = "KeyG";
    KeyCode["H"] = "KeyH";
    KeyCode["I"] = "KeyI";
    KeyCode["J"] = "KeyJ";
    KeyCode["K"] = "KeyK";
    KeyCode["L"] = "KeyL";
    KeyCode["M"] = "KeyM";
    KeyCode["N"] = "KeyN";
    KeyCode["O"] = "KeyO";
    KeyCode["P"] = "KeyP";
    KeyCode["Q"] = "KeyQ";
    KeyCode["R"] = "KeyR";
    KeyCode["S"] = "KeyS";
    KeyCode["T"] = "KeyT";
    KeyCode["U"] = "KeyU";
    KeyCode["V"] = "KeyV";
    KeyCode["W"] = "KeyW";
    KeyCode["X"] = "KeyX";
    KeyCode["Y"] = "KeyY";
    KeyCode["Z"] = "KeyZ";
    KeyCode["Digit0"] = "Digit0";
    KeyCode["Digit1"] = "Digit1";
    KeyCode["Digit2"] = "Digit2";
    KeyCode["Digit3"] = "Digit3";
    KeyCode["Digit4"] = "Digit4";
    KeyCode["Digit5"] = "Digit5";
    KeyCode["Digit6"] = "Digit6";
    KeyCode["Digit7"] = "Digit7";
    KeyCode["Digit8"] = "Digit8";
    KeyCode["Digit9"] = "Digit9";
    KeyCode["Numpad0"] = "Numpad0";
    KeyCode["Numpad1"] = "Numpad1";
    KeyCode["Numpad2"] = "Numpad2";
    KeyCode["Numpad3"] = "Numpad3";
    KeyCode["Numpad4"] = "Numpad4";
    KeyCode["Numpad5"] = "Numpad5";
    KeyCode["Numpad6"] = "Numpad6";
    KeyCode["Numpad7"] = "Numpad7";
    KeyCode["Numpad8"] = "Numpad8";
    KeyCode["Numpad9"] = "Numpad9";
    KeyCode["F1"] = "F1";
    KeyCode["F2"] = "F2";
    KeyCode["F3"] = "F3";
    KeyCode["F4"] = "F4";
    KeyCode["F5"] = "F5";
    KeyCode["F6"] = "F6";
    KeyCode["F7"] = "F7";
    KeyCode["F8"] = "F8";
    KeyCode["F9"] = "F9";
    KeyCode["F10"] = "F10";
    KeyCode["F11"] = "F11";
    KeyCode["F12"] = "F12";
    KeyCode["Backquote"] = "Backquote";
    KeyCode["Tab"] = "Tab";
    KeyCode["CapsLock"] = "CapsLock";
    KeyCode["ShiftLeft"] = "ShiftLeft";
    KeyCode["ShiftRight"] = "ShiftRight";
    KeyCode["ControlLeft"] = "ControlLeft";
    KeyCode["MetaLeft"] = "MetaLeft";
    KeyCode["AltLeft"] = "AltLeft";
    KeyCode["Space"] = "Space";
    KeyCode["AltRight"] = "AltRight";
    KeyCode["ControlRight"] = "ControlRight";
    KeyCode["Enter"] = "Enter";
    KeyCode["Backslash"] = "Backslash";
    KeyCode["Backspace"] = "Backspace";
    KeyCode["Equal"] = "Equal";
    KeyCode["Minus"] = "Minus";
    KeyCode["BracketLeft"] = "BracketLeft";
    KeyCode["BracketRight"] = "BracketRight";
    KeyCode["Semicolon"] = "Semicolon";
    KeyCode["Quote"] = "Quote";
    KeyCode["Comma"] = "Comma";
    KeyCode["Period"] = "Period";
    KeyCode["Slash"] = "Slash";
    KeyCode["ArrowUp"] = "ArrowUp";
    KeyCode["ArrowDown"] = "ArrowDown";
    KeyCode["ArrowLeft"] = "ArrowLeft";
    KeyCode["ArrowRight"] = "ArrowRight";
})(KeyCode || (KeyCode = {}));
export const KeyPressed = new GameEvent();
export default GameEvent;
