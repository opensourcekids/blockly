/**
 * Created by anthony on 10/25/15.
 */

if (isBlockly == false) {
    var editor = CodeMirror.fromTextArea(document.getElementById("python_code"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
    });

    editor.getDoc().setValue(default_python_code);
    var input = document.getElementById("select");

    function selectTheme() {
        var theme = input.options[input.selectedIndex].textContent;
        editor.setOption("theme", theme);
        location.hash = "#" + theme;
    }

    var choice = (location.hash && location.hash.slice(1)) ||
        (document.location.search &&
        decodeURIComponent(document.location.search.slice(1)));
    if (choice) {
        input.value = choice;
        editor.setOption("theme", choice);
    }
    CodeMirror.on(window, "hashchange", function () {
        var theme = location.hash.slice(1);
        if (theme) {
            input.value = theme;
            selectTheme();
        }
    });
}

function initCodeMirror() {

    //var container = document.getElementById('content_area');

    if (isBlockly) {
        //var content_blocks = document.getElementById('content_blocks');
        var blocklyArea = document.getElementById('content_area');
        var blocklyDiv = document.getElementById('content_blocks');

        var onresize = function (e) {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            var element = blocklyArea;
            h = blocklyArea.offsetHeight + 5;
            w = blocklyArea.offsetWidth + 5;
            //console.log(h);
            var x = 0;
            var y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            } while (element);
            // Position blocklyDiv over blocklyArea.

            blocklyDiv.style.left = x + 'px';
            blocklyDiv.style.top = y + 'px';
            blocklyDiv.style.width = w + 'px';
            blocklyDiv.style.height = h + 'px';

            //blocklyArea.style.height = (blocklyArea.style.height - 0) + 'px';

        };
        window.addEventListener('resize', onresize, false);
        onresize();




        initLoadEvent();

        //load from url parameter (single param)
        //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
        var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
        if (dest) {
            load_by_url(dest);
        }
    }
}
