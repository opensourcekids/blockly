/**
 * Created by anthony on 10/25/15.
 */


/**
 * Called from pbapp/templates/classes/classes_layout_skulpt.html
 */



/**
* Populate the currently selected pane with content generated from the blocks.
*/
function renderContent() {
    var content = document.getElementById('content_blocks'); // + selected);
    // Initialize the pane.
    if (content.id == 'content_blocks') {
        // If the workspace was changed by the XML tab, Firefox will have performed
        // an incomplete rendering due to Blockly being invisible.  Rerender.
        Blockly.mainWorkspace.render();
    }
}
//
// /**
//  * Compute the absolute coordinates and dimensions of an HTML element.
//  * @param {!Element} element Element to match.
//  * @return {!Object} Contains height, width, x, and y properties.
//  * @private
//  */
// function getBBox_(element) {
//     if (isBlockly) {
//         var height = element.offsetHeight;
//         var width = element.offsetWidth;
//         var x = 0;
//         var y = 0;
//         do {
//             x += element.offsetLeft;
//             y += element.offsetTop;
//             element = element.offsetParent;
//         } while (element);
//         return {
//             height: height,
//             width: width,
//             x: x,
//             y: y
//         };
//     }
// }
//
// /**
//  * Initialize Blockly.  Called on page load.
//  */
// function initBlockly() {
//     if (isBlockly) {
//
//         //var content_blocks = document.getElementById('content_blocks');
//         var blocklyArea = document.getElementById('content_area');
//         var blocklyDiv = document.getElementById('content_blocks');
//         var workspace = Blockly.inject(blocklyDiv,
//             {
//                 grid: {
//                     spacing: 25,
//                     length: 3,
//                     colour: '#ccc',
//                     snap: true
//                 },
//                 media: '/static/blockly/media/',
//                 toolbox: toolbox,
//                 zoom: {
//                     controls: true,
//                     wheel: true
//                 }
//             });
//
//         var onresize = function (e) {
//             // Compute the absolute coordinates and dimensions of blocklyArea.
//             var element = blocklyArea;
//             h = blocklyArea.offsetHeight + 5;
//             w = blocklyArea.offsetWidth + 5;
//             var x = 0;
//             var y = 0;
//             do {
//                 x += element.offsetLeft;
//                 y += element.offsetTop;
//                 element = element.offsetParent;
//             } while (element);
//
//             // Position blocklyDiv over blocklyArea.
//             blocklyDiv.style.left = x + 'px';
//             blocklyDiv.style.top = y + 'px';
//             blocklyDiv.style.width = w + 'px';
//             blocklyDiv.style.height = h + 'px';
//         };
//         window.addEventListener('resize', onresize, false);
//         onresize();
//
//         Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, document.getElementById('defaultblocks'));
//         generate_code();
//         Blockly.addChangeListener(generate_code);
//
//         initLoadEvent();
//
//         //load from url parameter (single param)
//         //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
//         var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
//         if (dest) {
//             load_by_url(dest);
//         }
//     }
// }