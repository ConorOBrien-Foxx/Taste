// modified from https://github.com/jxxcarlson/elm-platform-worker-example
const repl = require("repl");

// Link to Elm code
const { Elm } = require("./comp/taste-compiled.node.js");
const main = Elm.NodeOp.init();

// Eval function for the repl
const eval = (input, _, __, callback) => {
  main.ports.put.subscribe(
    function putCallback (data) {
      main.ports.put.unsubscribe(putCallback);
      callback(null, data.split("\n"));
    }
  );
  main.ports.get.send(input);
}

repl.start({ prompt: "> ", eval: eval });
