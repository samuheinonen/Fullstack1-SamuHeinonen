


function processMouse(event: PointerEvent): void {
    console.log('Mouse event detected');
}

function mouse_click(ev: PointerEvent): void {
    switch (ev.pointerType) {
        case "mouse":
            processMouse(ev);
            break;
    }
}


export function pointerInit(): void {
    const el = document.getElementById("mouse1");
    if (el) {
        el.onpointerdown = mouse_click;
    }
}

document.addEventListener("DOMContentLoaded", pointerInit);