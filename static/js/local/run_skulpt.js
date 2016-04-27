
var done = 'success';
function outf(text) {
    // console.log(text);
    var mypre = document.getElementById("wrapper"); //document.getElementById("log");
    mypre.innerHTML = mypre.innerHTML + "<div style='margin-left:10px;font-family: Monaco, Consolas, monospace;'>"+  text + "</div>";
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
    console.log("Entering Skulpt");
    var prog;
    if (isBlockly) {
        prog = document.getElementById("python_code").value;
    } else {
        prog = editor.getValue();
    }
    if (done == 'success') {
        done = '';
        if (prog.search('import turtle') != -1) {
            modalOutput();
        }
    } else {
        alert("Please wait while the last program finishes.")
    }

    var mypre = document.getElementById("wrapper"); //document.getElementById("log");
    mypre.innerHTML = '';
    Sk.pre = "log";
    Sk.configure({output: outf, read: builtinRead});

    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';

    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function (mod) {
            //console.log("the wasCanvasClosed variable is " + wasCanvasClosed);
            console.log('success');
            done = 'success';
            if (wasCanvasClosed == true) {
                alert('The last program has finished!');
            } else {
                wasCanvasClosed = false;
            }
        },
        function (err) {
            done = 'success';
            var e = err.toString();
            console.log(e);

            outf(e);

            wasCanvasClosed = false;
        }
    );
}
