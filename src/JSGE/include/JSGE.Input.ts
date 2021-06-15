import GameEvent from "./JSGE.GameEvent.js";

module Input {
    export enum KeyCode {
        KeyA = "KeyA",
        KeyB = "KeyB",
        KeyC = "KeyC",
        KeyD = "KeyD",
        KeyE = "KeyE",
        KeyF = "KeyF",
        KeyG = "KeyG",
        KeyH = "KeyH",
        KeyI = "KeyI",
        KeyJ = "KeyJ",
        KeyK = "KeyK",
        KeyL = "KeyL",
        KeyM = "KeyM",
        KeyN = "KeyN",
        KeyO = "KeyO",
        KeyP = "KeyP",
        KeyQ = "KeyQ",
        KeyR = "KeyR",
        KeyS = "KeyS",
        KeyT = "KeyT",
        KeyU = "KeyU",
        KeyV = "KeyV",
        KeyW = "KeyW",
        KeyX = "KeyX",
        KeyY = "KeyY",
        KeyZ = "KeyZ",
        Digit0 = "Digit0",
        Digit1 = "Digit1",
        Digit2 = "Digit2",
        Digit3 = "Digit3",
        Digit4 = "Digit4",
        Digit5 = "Digit5",
        Digit6 = "Digit6",
        Digit7 = "Digit7",
        Digit8 = "Digit8",
        Digit9 = "Digit9",
        Numpad0 = "Numpad0",
        Numpad1 = "Numpad1",
        Numpad2 = "Numpad2",
        Numpad3 = "Numpad3",
        Numpad4 = "Numpad4",
        Numpad5 = "Numpad5",
        Numpad6 = "Numpad6",
        Numpad7 = "Numpad7",
        Numpad8 = "Numpad8",
        Numpad9 = "Numpad9",
        F1 = "F1",
        F2 = "F2",
        F3 = "F3",
        F4 = "F4",
        F5 = "F5",
        F6 = "F6",
        F7 = "F7",
        F8 = "F8",
        F9 = "F9",
        F10 = "F10",
        F11 = "F11",
        F12 = "F12",
        Backquote = "Backquote",
        Tab = "Tab",
        CapsLock = "CapsLock",
        ShiftLeft = "ShiftLeft",
        ShiftRight = "ShiftRight",
        ControlLeft = "ControlLeft",
        MetaLeft = "MetaLeft",
        AltLeft = "AltLeft",
        Space = "Space",
        AltRight = "AltRight",
        ControlRight = "ControlRight",
        Enter = "Enter",
        Backslash = "Backslash",
        Backspace = "Backspace",
        Equal = "Equal",
        Minus = "Minus",
        BracketLeft = "BracketLeft",
        BracketRight = "BracketRight",
        Semicolon = "Semicolon",
        Quote = "Quote",
        Comma = "Comma",
        Period = "Period",
        Slash = "Slash",
        ArrowUp = "ArrowUp",
        ArrowDown = "ArrowDown",
        ArrowLeft = "ArrowLeft",
        ArrowRight = "ArrowRight"

    }


    class AnyKeyboardEvent extends GameEvent<[KeyCode]> {

    }

    class AnyMouseEvent extends GameEvent<[MouseEvent]> {

    }

    export const KeyPressed = new AnyKeyboardEvent();
    export const KeyDown = new AnyKeyboardEvent();
    export const KeyUp = new AnyKeyboardEvent();

    export const MouseClick = new AnyMouseEvent();
}

export default Input;