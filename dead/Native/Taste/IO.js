// modified from https://github.com/laszlopandy/elm-console
Elm.Native.Taste = {};
Elm.Native.Taste.IO = {};
Elm.Native.Taste.IO.make = function (localRuntime) {
    
    localRuntime.Native = localRuntime.Native || {};
    localRuntime.Native.Taste = localRuntime.Taste.Native || {};
    localRuntime.Native.Taste.IO = localRuntime.Native.Taste.IO || {};
    if (localRuntime.Native.Taste.IO.values) {
        return localRuntime.Native.Taste.IO.values;
    }
    
    const List = Elm.Native.List.make(localRuntime);
    const Maybe = Elm.Maybe.make(localRuntime);
    const NS = Elm.Native.Signal.make(localRuntime);
    const Task = Elm.Native.Task.make(localRuntime);
    const Utils = Elm.Native.Utils.make(localRuntime);

    let fs = null;

    /* Node.js imports */
    if (typeof module !== "undefined" && module.exports && typeof require !== "undefined") {
        fs = require("fs");

        process.stdin.on("data", function(chunk) {
            process.stdin.pause();
            sendResponseString(chunk.toString());
        });
    }
    
    const responsesSignal = NS.input("Native.IO.responses", Maybe.Nothing);

    const sendResponseString = function(str) {
        let value = Maybe.Nothing;
        if (str !== null && str.length > 0) {
            value = Maybe.Just(str);
        }
        setTimeout(function() {
            localRuntime.notify(responsesSignal.id, value);
        }, 0);
    };

    const sendRequestBatch = function(list) {
        const requests = List.toArray(list);
        if (requests.length == 0) {
            return Task.succeed(Utils.Tuple0);
        }

        return Task.asyncFunction(function(callback) {

            requests.forEach(doRequest);

            var lastReq = requests[requests.length - 1];
            if (lastReq.ctor !== "Get") {
                // if we are not waiting for stdin,
                // trigger the next IO requests immediately
                sendResponseString(null);
            }

            return callback(Task.succeed(Utils.Tuple0));
        });
    };

    const doRequest = function(request) {
        switch(request.ctor) {
            case "Put":
                process.stdout.write(request._0);
                break;
            case "Get":
                process.stdin.resume();
                break;
            case "Exit":
                process.exit(request._0);
                break;
            case "WriteFile":
                fs.writeFileSync(request._0.file, request._0.content);
                break;
            case "Init":
                // trigger the initial IO requests
                sendResponseString(null);
                break;
        }
    };

    return localRuntime.Native.Taste.IO.values = {
        sendRequestBatch: sendRequestBatch,
        responses: responsesSignal
    };
};
