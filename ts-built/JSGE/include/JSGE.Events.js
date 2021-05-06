var Events;
(function (Events) {
    Events.GAME_START = new Event("gamestart");
    Events.ATTACHED_EVENT = new Event("attached");
    Events.POSITION_CHANGED = new Event("positionchanged");
})(Events || (Events = {}));
export default Events;
