// modified from https://github.com/jxxcarlson/elm-platform-worker-example
const repl = require("repl");

// Link to Elm code
const { Elm } = require("./comp/taste-compiled.node.js");
const main = Elm.NodeOp.init();

// Eval function for the repl
const tasteEval = (input, _, __, callback) => {
  main.ports.put.subscribe(
    function putCallback (data) {
      main.ports.put.unsubscribe(putCallback);
      callback(null, data.split("\n"));
    }
  );
  main.ports.get.send(input);
}

if(process.argv[2]) {
  tasteEval(process.argv[2], null, null, (_, data) => console.log(data));
}
else {
  repl.start({ prompt: "> ", eval: tasteEval });
}
