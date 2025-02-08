// copied from TIO (not done in Elm because why would I do that to myself)
const dummy = document.getElementById("dummyTextboxForCalculatingSizeOfRealTextboxes");
function resize(textArea) {
    textArea = this == window ? textArea : this;
    dummy.style.fontFamily = getComputedStyle(textArea).fontFamily;
    dummy.style.width = getComputedStyle(textArea).width;
    dummy.value = textArea.value;
    textArea.style.height = Math.max(dummy.scrollHeight, textArea.dataset.baseHeight || 27) + "px";
    dummy.value = "";
};

const app = Elm.Main.init({
    node: document.getElementById("ElmApp"),
    flags: {
        code: sessionStorage.code ?? "5r", // example code
        input: sessionStorage.input ?? ""
    }
});

const output = document.getElementById("output");

app.ports.storeCode.subscribe(code => sessionStorage.code = code);
app.ports.storeInput.subscribe(input => sessionStorage.input = input);
app.ports.syncOutput.subscribe(() => {
    // this doesn't work in the frame that the Elm model updates the output
    // so we need to do this after the view has updated
    setTimeout(() => resize(output), 0);
});

// we handle this here, rather than in Elm, because Elm is dead:
// https://package.elm-lang.org/packages/elm/html/latest/Html.Events
// "Note: It looks like the spec is moving away from event.keyCode and towards event.key. Once this is supported in more browsers, we may add helpers here for onKeyUp, onKeyDown, onKeyPress, etc."
// this was a million years ago so we're not getting anything on Elm's side
// I think we could accomplish this with ports and sending the event to Elm but it's honestly not worth the effort
const submitKeybind = ev => {
    if(ev.ctrlKey && ev.key === "Enter") {
        app.ports.messageReceiver.send("Execute");
    }
};

let textAreas = document.querySelectorAll("textarea")
for(let ta of textAreas) {
    if(ta === dummy) continue;
    ta.addEventListener("input", resize);
    if(ta !== output) {
        ta.addEventListener("keydown", submitKeybind);
    }
    resize(ta);
}

window.addEventListener("resize", () => {
    for(let ta of textAreas) {
        resize(ta);
    }
});
