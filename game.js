"use strict";
const DIRECTION_LABEL = {
    up: "north",
    down: "south",
    left: "west",
    right: "east",
};
const rooms = {
    "spiral-stair": {
        id: "spiral-stair",
        name: "Spiral Stair",
        description: "A narrow iron staircase spirals upward through the stone tower, disappearing into shadow. Cool salt air drifts down from above, carrying the faint smell of oil and rust.",
        mapId: "map-spiral-stair",
        exits: { down: "keepers-kitchen", right: "lamp-room" },
        blocked: {
            up: "The staircase ends just above; there's nothing but the underside of the lamp room floor.",
            left: "A wall of solid stone blocks the way west.",
        },
    },
    "lamp-room": {
        id: "lamp-room",
        name: "Lamp Room",
        description: "Glass panels curve around a great brass lamp, its lens catching the last grey light of dusk. Far below, whitecaps break against the rocks in silence.",
        mapId: "map-lamp-room",
        exits: { down: "rocks", left: "spiral-stair" },
        blocked: {
            up: "The glass dome is sealed tight overhead; there's no way up from here.",
            right: "Only open air and a sheer drop lie to the east.",
        },
    },
    "keepers-kitchen": {
        id: "keepers-kitchen",
        name: "Keeper's Kitchen",
        description: "A blackened kettle sits cold on the stove beside a stack of unopened letters. Dust covers the table, as if the keeper left in a hurry.",
        mapId: "map-keepers-kitchen",
        exits: { up: "spiral-stair", right: "rocks" },
        blocked: {
            down: "The floorboards are solid; there's no cellar beneath the kitchen.",
            left: "A heavy stone wall blocks the way west.",
        },
    },
    rocks: {
        id: "rocks",
        name: "Rocks",
        description: "Waves hiss over dark, barnacled rocks at the base of the lighthouse. The tower looms overhead, its light not yet lit.",
        mapId: "map-rocks",
        exits: { up: "lamp-room", left: "keepers-kitchen" },
        blocked: {
            down: "The rocks drop straight into churning water; going down means drowning.",
            right: "Jagged cliffs block the way east.",
        },
    },
};
let currentRoomId = "rocks";
let isTransitioning = false;
const FADE_MS = 220;
const sceneEl = document.getElementById("scene");
const roomNameEl = document.getElementById("room-name");
const roomDescriptionEl = document.getElementById("room-description");
const roomExitsEl = document.getElementById("room-exits");
const messageEl = document.getElementById("message");
const mapRoomEls = document.querySelectorAll(".map-room");
const illustrationEls = document.querySelectorAll(".room-illustration");
function render() {
    const room = rooms[currentRoomId];
    document.body.className = `room-${room.id}`;
    roomNameEl.textContent = room.name;
    roomDescriptionEl.textContent = room.description;
    const exitLabels = Object.keys(room.exits).map((dir) => DIRECTION_LABEL[dir]);
    roomExitsEl.textContent =
        exitLabels.length > 0
            ? `You can go: ${exitLabels.join(", ")}.`
            : "There is nowhere to go from here.";
    mapRoomEls.forEach((el) => {
        el.classList.toggle("current", el.id === room.mapId);
    });
    illustrationEls.forEach((el) => {
        el.classList.toggle("current", el.id === `illustration-${room.id}`);
    });
}
function move(direction) {
    var _a;
    if (isTransitioning) {
        return;
    }
    const room = rooms[currentRoomId];
    const nextRoomId = room.exits[direction];
    if (nextRoomId) {
        isTransitioning = true;
        messageEl.textContent = "";
        sceneEl.classList.add("fading");
        setTimeout(() => {
            currentRoomId = nextRoomId;
            render();
            sceneEl.classList.remove("fading");
            isTransitioning = false;
        }, FADE_MS);
        return;
    }
    messageEl.textContent = (_a = room.blocked[direction]) !== null && _a !== void 0 ? _a : "You can't go that way.";
}
const KEY_TO_DIRECTION = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
};
document.addEventListener("keydown", (event) => {
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
        event.preventDefault();
        move(direction);
    }
});
render();
