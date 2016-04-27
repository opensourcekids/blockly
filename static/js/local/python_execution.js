/**
 * Created by anthony on 10/25/15.
 */

function save_python() {
    console.log("in save_python");
    var text_to_save = document.getElementById("python_code").value;
    var blob = new Blob([text_to_save], {type: 'text/text'});
    console.log(blob);
    saveAs(blob, 'pyblocks.py');
}

function pretty() {
    $('#code2').removeClass('prettyprinted');
    prettyPrint();
}

// Generates python code from work area.
function generate_code() {
    if (NO_SKULPT) {
        $('#log').empty();
    }
    var pycode = document.getElementById("python_code");
    pycode.value = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
    pycode.innerHTML = pycode.value;

    $('#code2').empty();
    $('#code2').text(Blockly.Python.workspaceToCode(Blockly.getMainWorkspace()));

    pretty();
}

// This function causes the output tab click to function like a run button click.
function execute_code() {
    t = document.getElementsByClassName("row");
    for (i = 0; i < t.length; i++) {
        if (t[i].attributes.getNamedItem('order').nodeValue == 'two') {
            if (document.getElementById("panel_output").attributes.getNamedItem('data-status').nodeValue == 'opened') {
                t[i].nodeValue = Output(old);
            } else {
                t[i].nodeValue = Output;
            }
        }
    }
}

/**
 * This function runs when the run button is clicked or the ouput tab is clicked
 * If the ouptut tab is clicked the execute_code function first (above).
 */
function run_code() {
    // if (document.getElementById("panel_output").attributes.getNamedItem('data-status').nodeValue == 'closed'){
    //     t = document.getElementsByClassName("toggler");
    //     for (i = 0; i < t.length; i++) {
    //         if (t[i].attributes.getNamedItem('order').nodeValue == 'two'){
    //
    //             t[i].click();
    //         }
    //     }
    // }
    // console.log("in run_code()");
    var output_layout = myLayout.east.children.layout1;
    myLayout.open("east");
    output_layout.open("south");
    var code_val = '';

    if (isBlockly) {
        var pycode = document.getElementById("python_code");

        pycode.value = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
        pycode.innerHTML = pycode.value;
        code_val = Blockly.Python.workspaceToCode(Blockly.getMainWorkspace());
        backup_blocks();
    } else {
        code_val = editor.getValue();
    }
    // AJL: Should now be able to remove this and the textarea referenced.  Or not because of Skulpt
    $('#code2').empty();
    $('#code2').text(code_val);

    pretty();
    
    if (NO_SKULPT == false) {
        runit();
    }
    Blockly.fireUiEvent(window, 'resize');
    return code_val;
}