module Events {
    export const GAME_START = new Event("gamestart");
    export const ATTACHED_EVENT = new Event("attached");
    export const POSITION_CHANGED = new Event("positionchanged");
}

export default Events;