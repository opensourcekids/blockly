/**
 *
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author anthony@lupinetti.us (Anthony Lupinetti)
 */
'use strict';

goog.provide('Blockly.Blocks.objectsalt');

goog.require('Blockly.Blocks');
//goog.require('Blockly.Hue');

var OBJECTS_ALT_HUE = 290;
var OBJECTSALT_USE_COMMA_FOR_CALLSHELL = true;

Blockly.Blocks['objects_shell'] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        // //console.log("objects_shell.init");
        this.setHelpUrl('');
        this.setColour(OBJECTS_ALT_HUE);
        var name = Blockly.Objects.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
        var nameField = new Blockly.FieldTextInput(name, Blockly.Objects.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField('class ')
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');

        this.setMutator(new Blockly.Mutator(['objects_mutatorarg']));
        this.setTooltip('');
        this.arguments_ = ['object '];
        this.setStatements_(true);
        this.statementConnection_ = null;

        this.methods = {};

        this.children = [];

        // //console.log('+++++++++++++');
        // //console.log(this.children);
        // //console.log(this.methods);
        // //console.log('+++++++++++++');
        this.setMethods();
        this.var_assignment = '';
        this.onchange();
    },

    setMethods: function () {
        this.children = this.getDescendants();
        //console.log("Descendants: ");
        //console.log(this.children);
        // //console.log(this.children);
        for (var i = 0; i < this.children.length; i++) {
            // //console.log("FOR LOOP");
            var name = this.children[i].getFieldValue('NAME');
            if (name != this.getFieldValue('NAME') && name != null) {
                var params = this.children[i].arguments_;
                this.methods[name] = params;
            }
        }
        if (this.children.length == 0) {
            this.methods = {};
        }
        //console.log(this);
        //console.log(this.methods);
        //console.log("()()()()() END objects_shell.setMethods ()()()()()");

    },

    getMethodNames: function () {
        var method_names = [];
        if (this.methods) {
            for (var key in this.methods) {
                method_names.push(key);
            }
        }
        return method_names;

    },

    getMethodParameters: function (method_name) {

        return this.methods[method_name];
    },

    onchange: function () {
        //console.log("$$$$$ BEGIN objects_shell.onChange $$$$$");
        this.setMethods();
        var old = [];
        for (var keys in this.methods) {
            old.push(this.methods[keys]);
        }
        // //console.log("OLD");
        // //console.log(old);
        this.children = this.getChildren();
        // //console.log(this.children);
        for (var i = 0; i < this.children.length; i++) {
            // //console.log("FOR LOOP");
            var name = this.children[i].getFieldValue('NAME');
            if (name != this.getFieldValue('NAME')) {
                var params = this.children[i].arguments_;
                this.methods[name] = params;
            }
        }
        if (this.children.length == 0) {
            this.methods = {};
        }
        var new_one = [];
        var changed_keys = [];
        for (var keys in this.methods) {
            new_one.push(this.methods[keys]);
            changed_keys.push(keys);
        }
        //console.log("NEW");
        //console.log(new_one);

        var dependant = null;
        //if (this.workspace != null) {
        var all = this.workspace.getAllBlocks();
        for (var i = 0; i < new_one.length; i++) {

            for (var j = 0; j < all.length; j++) {
                if (all[j].type == 'objects_callshell') {
                    if (all[j].getFieldValue('NAME') == this.getFieldValue('NAME')) {
                        if (this.methods['__init__'] != null) {
                            all[j].setParameters(this.methods['__init__']);
                        }
                    }
                }
            }
        }
        //}
        //console.log(this);
        //console.log(this.methods);
        //console.log("$$$$$ END objects_shell.onChange $$$$$");
    },

    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this Blockly.Block
     */
    setStatements_: function (hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('STACK')
                .appendField('');
            if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
            }
        } else {
            this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function () {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var i = 0; i < this.arguments_.length; i++) {
            if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + this.arguments_[i].toLowerCase()] = true;
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.arguments_.length) {
            paramString = '( ' + this.arguments_.join(', ') + ') :';
        }
        this.setFieldValue(paramString, 'PARAMS');
    },
    /**
     * Create XML to represent the argument inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }

        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
        }
        this.updateParams_();

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'objects_mutatorcontainer');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('RETURN')) {
            containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                'STATEMENTS');
        } else {
            containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
        }

        // Parameter list.
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.arguments_.length; i++) {
            var paramBlock = Blockly.Block.obtain(workspace, 'objects_mutatorarg');
            paramBlock.initSvg();

            // if (this.arguments_[i] != 'object') {
            paramBlock.setFieldValue(this.arguments_[i], 'NAME');
            // Store the old location.
            paramBlock.oldLocation = i;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
            //}
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Objects.mutateCallers(this.getFieldValue('NAME'),
            this.workspace, this.arguments_, null);
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Parameter list.
        this.arguments_ = [];
        this.paramIds_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');

        while (paramBlock) {
            this.arguments_.push(paramBlock.getFieldValue('NAME'));
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Objects.mutateCallers(this.getFieldValue('NAME'),
            this.workspace, this.arguments_, this.paramIds_);

        // Show/hide the statement input.
        var hasStatements = containerBlock.getFieldValue('STATEMENTS');
        if (hasStatements !== null) {
            hasStatements = hasStatements == 'TRUE';
            if (this.hasStatements_ != hasStatements) {
                if (hasStatements) {
                    this.setStatements_(true);
                    // Restore the stack, if one was saved.
                    var stackConnection = this.getInput('STACK').connection;
                    if (stackConnection.targetConnection || !this.statementConnection_ ||
                        this.statementConnection_.targetConnection ||
                        this.statementConnection_.sourceBlock_.workspace !=
                        this.workspace) {
                        // Block no longer exists or has been attached elsewhere.
                        this.statementConnection_ = null;
                    } else {
                        stackConnection.connect(this.statementConnection_);
                    }
                } else {
                    // Save the stack, then disconnect it.
                    var stackConnection = this.getInput('STACK').connection;
                    this.statementConnection_ = stackConnection.targetConnection;
                    if (this.statementConnection_) {
                        var stackBlock = stackConnection.targetBlock();
                        stackBlock.setParent(null);
                        stackBlock.bumpNeighbours_();
                    }
                    this.setStatements_(false);
                }
            }
        }
    },
    /**
     * Dispose of any callers.
     * @this Blockly.Block
     */
    dispose: function () {
        var name = this.getFieldValue('NAME');
        Blockly.Objects.disposeCallers(name, this.workspace);
        // Call parent's destructor.
        this.constructor.prototype.dispose.apply(this, arguments);
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getObjectDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return this.arguments_;
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        var change = false;
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                for (var i = 0, block; block = blocks[i]; i++) {
                    if (block.type == 'objects_mutatorarg' &&
                        Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                        block.setFieldValue(newName, 'NAME');
                    }
                }
            }
        }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        // Add option to create caller.
        var option = {enabled: true};
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        var xmlMutation = goog.dom.createDom('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
            var xmlArg = goog.dom.createDom('arg');
            xmlArg.setAttribute('name', this.arguments_[i]);
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var option = {enabled: true};
                var name = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
                var xmlField = goog.dom.createDom('field', null, name);
                xmlField.setAttribute('name', 'VAR');
                var xmlBlock = goog.dom.createDom('block', null, xmlField);
                xmlBlock.setAttribute('type', 'variables_get');
                option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
                options.push(option);
            }
        }
    },
    callType_: 'objects_callshell'
};

Blockly.Blocks['objects_method_no_return'] = {
    /**
     * Block for defining a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        // //console.log("objects_method_no_return.init");
        this.setHelpUrl('');
        this.setColour(OBJECTS_ALT_HUE);
        var name = Blockly.Objects.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
        var nameField = new Blockly.FieldTextInput(name);//, Blockly.Objects.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField('def ')
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['objects_mutatorarg']));
        this.setTooltip('');
        this.arguments_ = ['self'];
        this.setStatements_(true);
        this.statementConnection_ = null;
        this.parent = [];
    },
    onchange: function () {
        //this.parent = this.getParent();
        // //console.log("No Return: ");
        // //console.log(this.parent);
    },
    /**
     * Add or remove the statement block from this function definition.
     * @param {boolean} hasStatements True if a statement block is needed.
     * @this Blockly.Block
     */
    setStatements_: function (hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('STACK')
                .appendField('');
            if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
            }
        } else {
            this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function () {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var i = 0; i < this.arguments_.length; i++) {
            if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + this.arguments_[i].toLowerCase()] = true;
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.arguments_.length) {
            paramString = '(' + ' ' + this.arguments_.join(', ') + '):';
        }
        this.setFieldValue(paramString, 'PARAMS');
    },
    /**
     * Create XML to represent the argument inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }

        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
        }
        this.updateParams_();

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = Blockly.Block.obtain(workspace, 'objects_mutatorcontainer');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('RETURN')) {
            containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                'STATEMENTS');
        } else {
            containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
        }

        // Parameter list.
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.arguments_.length; i++) {
            var paramBlock = Blockly.Block.obtain(workspace, 'objects_mutatorarg');
            paramBlock.initSvg();
            paramBlock.setFieldValue(this.arguments_[i], 'NAME');
            // Store the old location.
            paramBlock.oldLocation = i;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Objects.mutateCallers(this.getFieldValue('NAME'),
            this.workspace, this.arguments_, null);
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Parameter list.
        this.arguments_ = [];
        this.paramIds_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        while (paramBlock) {
            this.arguments_.push(paramBlock.getFieldValue('NAME'));
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Objects.mutateCallers(this.getFieldValue('NAME'),
            this.workspace, this.arguments_, this.paramIds_);

        // Show/hide the statement input.
        var hasStatements = containerBlock.getFieldValue('STATEMENTS');
        if (hasStatements !== null) {
            hasStatements = hasStatements == 'TRUE';
            if (this.hasStatements_ != hasStatements) {
                if (hasStatements) {
                    this.setStatements_(true);
                    // Restore the stack, if one was saved.
                    var stackConnection = this.getInput('STACK').connection;
                    if (stackConnection.targetConnection || !this.statementConnection_ ||
                        this.statementConnection_.targetConnection ||
                        this.statementConnection_.sourceBlock_.workspace !=
                        this.workspace) {
                        // Block no longer exists or has been attached elsewhere.
                        this.statementConnection_ = null;
                    } else {
                        stackConnection.connect(this.statementConnection_);
                    }
                } else {
                    // Save the stack, then disconnect it.
                    var stackConnection = this.getInput('STACK').connection;
                    this.statementConnection_ = stackConnection.targetConnection;
                    if (this.statementConnection_) {
                        var stackBlock = stackConnection.targetBlock();
                        stackBlock.setParent(null);
                        stackBlock.bumpNeighbours_();
                    }
                    this.setStatements_(false);
                }
            }
        }
    },
    /**
     * Dispose of any callers.
     * @this Blockly.Block
     */
    dispose: function () {
        var name = this.getFieldValue('NAME');
        Blockly.Objects.disposeCallers(name, this.workspace);
        // Call parent's destructor.
        this.constructor.prototype.dispose.apply(this, arguments);
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getObjectDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function () {
        return this.arguments_;
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        var change = false;
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                for (var i = 0, block; block = blocks[i]; i++) {
                    if (block.type == 'objects_mutatorarg' &&
                        Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                        block.setFieldValue(newName, 'NAME');
                    }
                }
            }
        }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        // Add option to create caller.
        var option = {enabled: true};
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        var xmlMutation = goog.dom.createDom('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
            var xmlArg = goog.dom.createDom('arg');
            xmlArg.setAttribute('name', this.arguments_[i]);
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var option = {enabled: true};
                var name = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
                var xmlField = goog.dom.createDom('field', null, name);
                xmlField.setAttribute('name', 'VAR');
                var xmlBlock = goog.dom.createDom('block', null, xmlField);
                xmlBlock.setAttribute('type', 'variables_get');
                option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
                options.push(option);
            }
        }
    },
    callType_: 'objects_callnoreturn'
};

Blockly.Blocks['objects_method_return'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.setColour(OBJECTS_ALT_HUE);
        var name = Blockly.Objects.findLegalName(
            Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
        var nameField = new Blockly.FieldTextInput(name,
            Blockly.Objects.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE)
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);

        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.setMutator(new Blockly.Mutator(['objects_mutatorarg']));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = ['self'];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    setStatements_: Blockly.Blocks['objects_method_no_return'].setStatements_,
    updateParams_: Blockly.Blocks['objects_method_no_return'].updateParams_,
    mutationToDom: Blockly.Blocks['objects_method_no_return'].mutationToDom,
    domToMutation: Blockly.Blocks['objects_method_no_return'].domToMutation,
    decompose: Blockly.Blocks['objects_method_no_return'].decompose,
    compose: Blockly.Blocks['objects_method_no_return'].compose,
    dispose: Blockly.Blocks['objects_method_no_return'].dispose,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks['objects_method_no_return'].getVars,
    renameVar: Blockly.Blocks['objects_method_no_return'].renameVar,
    customContextMenu: Blockly.Blocks['objects_method_no_return'].customContextMenu,
    callType_: 'objects_callreturn'
};

Blockly.Blocks['objects_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(OBJECTS_ALT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput('STACK');
        this.appendDummyInput('STATEMENT_INPUT')
            .appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['objects_mutatorarg'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(OBJECTS_ALT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
            .appendField(new Blockly.FieldTextInput('x', this.validator_), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    /**
     * Obtain a valid name for the procedure.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} newVar User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.Block
     */
    validator_: function (newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        return newVar || null;
    }
};

Blockly.Blocks['objects_callnoreturn'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {

        this.appendDummyInput('OBJ')
        .appendField(new Blockly.FieldVariable('item'), "VAR1");
        this.appendDummyInput('DOT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('.', 'D');
        this.appendDummyInput('TOPROW')
           .appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL)
            .appendField('', 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
        this.parentBlock_ = null;

        this.creator = null;
        this.parameters = [];
        this.my_class = null;
        //this.setCreator();
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.setColour(OBJECTS_ALT_HUE);

    },
    onchange: function () {
        console.log('????? BEGIN objects_callnoreturn ?????');
        if (this.creator == null) {
            this.setCreator();
            //this.getInput('CLASS').setV
        } else if (this.creator.getParent() != null) {
            //console.log("parent");
            //console.log(this.creator.getParent().getParent());
        } else {
        }
        //if (this.creator != null) {
            //this.getValue
            //this.getVariblesOfClass();
            //this.menu.appendField(new Blockly.FieldVariable(this.getVariblesOfClass()), "VAR1")
            //this.getField('VAR1').setValue(this.getVariblesOfClass());
            //this.setFieldValue(this.getVariblesOfClass(), 'VAR1')
        //}

        console.log('????? END objects_callnoreturn ?????');
    },

    getVariblesOfClass: function () {

        var blocks = this.workspace.getAllBlocks();
        //console.log('blocks');
        //console.log(blocks);
        //for (var x = 0; x < blocks.length; x++) {
        //    console.log(blocks[x].type);
        //}
        for (var x = 0; x < blocks.length; x++) {
            if (blocks[x].type == 'variables_set') {

                var value = blocks[x].getInputTargetBlock('VALUE');

                if (value.type == 'objects_callshell') {
                    console.log('this.my_class');
                    console.log(this.my_class);
                    console.log('value.getProcedureCall');
                        console.log(value.getProcedureCall());
                    if (value.getProcedureCall() == this.my_class.getFieldValue('NAME')) {
                        console.log('variable name?');
                        console.log(blocks[x].getFieldValue('VAR'));
                        return blocks[x].getFieldValue('VAR');
                    }
                }
            }
            //console.log("END Objects.className");


        }
        return null;
    },

    setCreator: function () {
        console.log('----- BEGIN setCreator -----');
        //console.log(this.workspace);
        if (this.workspace != null) {
            //console.log('Workspace is not null');
            var blocks = this.workspace.getAllBlocks();
            ////console.log("Blocks!");

            for (var i = 0; i < blocks.length; i++) {
                //console.log(blocks[i].type);
                ////console.log(blocks[i].getFieldValue('NAME') == this.getFieldValue('NAME'));
                if (/*blocks[i].type == 'objects_shell' && */ blocks[i].getFieldValue('NAME') == this.getFieldValue('NAME')) {
                    ////console.log("TRUE");
                    //console.log("Setting Creator and Arguments")
                    this.creator = blocks[i];
                    this.arguments_ = (this.creator.arguments_ || []).concat();
                    this.my_class = this.creator.getSurroundParent();
                    //console.log(this.creator);
                    //console.log(this.arguments_);
                    //    break;
                } else {
                    ////console.log("FALSE");
                }
            }
            //console.log("In setCreator\nTHE CREATOR NOW IS...")
            //console.log(this.creator);
            //console.log(this.arguments_);
            if (this.creator != null) {
                //console.log(this.creator.getMethodParameters('__init__'));
                var tempIds = [];
                var o_list = this.arguments_;// objectsList[x][1];

                //console.log(this.crea)
                for (var t = 0; t < o_list.length; t++) {
                    tempIds[t] = 'ARG' + t;
                }
                this.setParameters(o_list);


                //this.onchange();

            }
        }

        console.log('----- END setCreator -----');
    },


    setParameters: function (params) {
        //console.log("+++++ BEGIN .setParameters +++++");
        //console.log(params);

//this.getVariblesOfClass();
        var newList = (params || []).concat();
        //console.log(newList == params);

        var tempIds = [];
        var my_params = [];

        //console.log(newList);
        if (newList != undefined || newList != []) {
            var self_index = newList.indexOf('self');
            if (self_index == -1) {
                alert("The first argument in must be self.");
            } else {
                for (var i = 0; i < newList.length; i++) {
                    if (newList[i] != 'self') {
                        my_params.push(newList[i]);
                        //}
                    }
                }
            }
        }
        for (var t = 0; t < my_params.length; t++) {
            tempIds[t] = 'ARG' + t;
        }

        if (!tempIds) {
            // Reset the quarks (a mutator is about to open).
            this.quarkConnections_ = {};
            this.quarkArguments_ = null;
            return;
        }
        if (goog.array.equals(this.arguments_, my_params)) {
            // No change.
            this.quarkArguments_ = tempIds;
            return;
        }
        this.setCollapsed(false);

        if (tempIds.length != my_params.length) {
            throw 'Error: paramNames and paramIds must be the same length.';
        }

        if (!this.quarkArguments_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            if (my_params.join('\n') == this.arguments_.join('\n')) {
                // No change to the parameters, allow quarkConnections_ to be
                // populated with the existing connections.
                this.quarkArguments_ = tempIds;
            } else {
                this.quarkArguments_ = [];
            }
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var i = this.arguments_.length - 1; i >= 0; i--) {
            var input = this.getInput('ARG' + i);
            if (input) {
                var connection = input.connection.targetConnection;
                if (connection != null) {
                    this.quarkConnections_[this.quarkArguments_[i]] = connection;
                }
                // Disconnect all argument blocks and remove all inputs.
                this.removeInput('OBJ', true);
                this.removeInput('DOT', true);
                this.removeInput('LEFT', true);
                this.removeInput('ARG' + i, true);
                this.removeInput('RIGHT', true);

            } else {
                // //console.log("ELSE!!!");
                this.removeInput('OBJ', true);
                this.removeInput('DOT', true);
                this.removeInput('LEFT', true);
                this.removeInput('RIGHT', true);
            }
        }
        this.removeInput('OBJ', true);
        this.removeInput('DOT', true);
        this.removeInput('LEFT', true);
        this.removeInput('RIGHT', true);

        var o = this.appendDummyInput('OBJ')
                    .appendField(new Blockly.FieldVariable(this.getVariblesOfClass()), "VAR1");
        o.init();

        var t = this.appendDummyInput('TOPROW')
           .appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL)
            .appendField('', 'NAME');

        t.init();

        var dot = this.appendDummyInput('DOT')
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField('.', 'D');
        dot.init();

        var d = this.appendDummyInput('LEFT')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('(', 'L');

        d.init();

        // Rebuild the block's arguments.
        this.arguments_ = [].concat(my_params);
        this.quarkArguments_ = tempIds;
        for (var i = 0; i < my_params.length; i++) {

            var input = this.appendValueInput('ARG' + i)
                .setAlign(Blockly.ALIGN_RIGHT);
            if (OBJECTSALT_USE_COMMA_FOR_CALLSHELL) {
                if (i != 0) {
                    input.appendField(', ');
                }
            } else {
                input.appendField(my_params[i] + ' =');
            }


            if (this.quarkArguments_) {
                // Reconnect any child blocks.
                var quarkName = this.quarkArguments_[i];
                if (this.quarkConnections_ != null) {
                    if (quarkName in this.quarkConnections_) {
                        var connection = this.quarkConnections_[quarkName];
                        if (!connection || connection.targetConnection ||
                            connection.sourceBlock_.workspace != this.workspace) {
                            // Block no longer exists or has been attached elsewhere.
                            delete this.quarkConnections_[quarkName];
                        } else {
                            input.connection.connect(connection);
                        }
                    }
                }
            }
            input.init();
        }

        var my_this = this.appendDummyInput('RIGHT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(')', 'R');

        my_this.init();

        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }

        this.arguments_.reverse();
        this.arguments_.push('self');
        this.arguments_.reverse();
        //console.log("The params are...");
        //console.log(this.arguments_);
        //console.log("+++++ END .setParameters +++++");
    },

    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        // The NAME field is guaranteed to exist, null will never be returned.

        return /** @type {string} */ (this.getFieldValue('NAME'));
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'NAME');
            this.setTooltip(
                (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
                    Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
                    .replace('%1', newName));
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @this Blockly.Block
     */
    //setProcedureParameters: function (paramNames, paramIds) {
    //    // Data structures:
    //    // this.arguments = ['x', 'y']
    //    //     Existing param names.
    //    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //    //     Look-up of paramIds to connections plugged into the call block.
    //    // this.quarkArguments_ = ['piua', 'f8b_']
    //    //     Existing param IDs.
    //    // Note that quarkConnections_ may include IDs that no longer exist, but
    //    // which might reappear if a param is reattached in the mutator.
    //    if (!paramIds) {
    //        // Reset the quarks (a mutator is about to open).
    //        this.quarkConnections_ = {};
    //        this.quarkArguments_ = null;
    //        return;
    //    }
    //    if (goog.array.equals(this.arguments_, paramNames)) {
    //        // No change.
    //        this.quarkArguments_ = paramIds;
    //        return;
    //    }
    //    this.setCollapsed(false);
    //    if (paramIds.length != paramNames.length) {
    //        throw 'Error: paramNames and paramIds must be the same length.';
    //    }
    //    if (!this.quarkArguments_) {
    //        // Initialize tracking for this block.
    //        this.quarkConnections_ = {};
    //        if (paramNames.join('\n') == this.arguments_.join('\n')) {
    //            // No change to the parameters, allow quarkConnections_ to be
    //            // populated with the existing connections.
    //            this.quarkArguments_ = paramIds;
    //        } else {
    //            this.quarkArguments_ = [];
    //        }
    //    }
    //    // Switch off rendering while the block is rebuilt.
    //    var savedRendered = this.rendered;
    //    this.rendered = false;
    //    // Update the quarkConnections_ with existing connections.
    //    for (var i = this.arguments_.length - 1; i >= 0; i--) {
    //        var input = this.getInput('ARG' + i);
    //        if (input) {
    //            var connection = input.connection.targetConnection;
    //            this.quarkConnections_[this.quarkArguments_[i]] = connection;
    //            // Disconnect all argument blocks and remove all inputs.
    //            this.removeInput('ARG' + i);
    //        }
    //    }
    //    // Rebuild the block's arguments.
    //    this.arguments_ = [].concat(paramNames);
    //    this.quarkArguments_ = paramIds;
    //    for (var i = 0; i < this.arguments_.length; i++) {
    //        var input = this.appendValueInput('ARG' + i)
    //            .setAlign(Blockly.ALIGN_RIGHT)
    //            .appendField(this.arguments_[i]);
    //        if (this.quarkArguments_) {
    //            // Reconnect any child blocks.
    //            var quarkName = this.quarkArguments_[i];
    //            if (quarkName in this.quarkConnections_) {
    //                var connection = this.quarkConnections_[quarkName];
    //                if (!connection || connection.targetConnection ||
    //                    connection.sourceBlock_.workspace != this.workspace) {
    //                    // Block no longer exists or has been attached elsewhere.
    //                    delete this.quarkConnections_[quarkName];
    //                } else {
    //                    input.connection.connect(connection);
    //                }
    //            }
    //        }
    //        input.init();
    //    }
    //    // Add 'with:' if there are parameters.
    //    var input = this.getInput('TOPROW');
    //    if (input) {
    //        if (this.arguments_.length) {
    //            if (!this.getField_('WITH')) {
    //                input.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, 'WITH');
    //                input.init();
    //            }
    //        } else {
    //            if (this.getField_('WITH')) {
    //                input.removeField('WITH');
    //            }
    //        }
    //    }
    //    // Restore rendering and show the changes.
    //    this.rendered = savedRendered;
    //    if (this.rendered) {
    //        this.render();
    //    }
    //},
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.setFieldValue(name, 'NAME');
        this.setTooltip(
            (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
                Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace('%1', name));
        var def = Blockly.Objects.getDefinition(name, this.workspace);
        if (def && def.mutator && def.mutator.isVisible()) {
            // Initialize caller with the mutator's IDs.
            this.setParameters(def.arguments_, def.paramIds_);
        } else {
            var args = [];
            for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
                if (childNode.nodeName.toLowerCase() == 'arg') {
                    args.push(childNode.getAttribute('name'));
                }
            }
            // For the second argument (paramIds) use the arguments list as a dummy
            // list.
            this.setParameters(args, args);
        }
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                this.getInput('ARG' + i).fieldRow[0].setText(newName);
            }
        }
    },
    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var option = {enabled: true};
        option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function () {
            var def = Blockly.Objects.getDefinition(name, workspace);
            def && def.select();
        };
        options.push(option);
    }
};

Blockly.Blocks['objects_callreturn'] = {
    /**
     * Block for calling a procedure with a return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.setColour(OBJECTS_ALT_HUE);
        this.appendDummyInput('TOPROW')
            .appendField(Blockly.Msg.PROCEDURES_CALLRETURN_CALL)
            .appendField('', 'NAME');
        this.setOutput(true);
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
    },
    getProcedureCall: Blockly.Blocks['objects_callnoreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['objects_callnoreturn'].renameProcedure,
    setParameters: Blockly.Blocks['objects_callnoreturn'].setParameters,
    mutationToDom: Blockly.Blocks['objects_callnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['objects_callnoreturn'].domToMutation,
    renameVar: Blockly.Blocks['objects_callnoreturn'].renameVar,
    customContextMenu: Blockly.Blocks['objects_callnoreturn'].customContextMenu
};

Blockly.Blocks['objects_return'] = {
    /**
     * Block for conditionally returning a value from a procedure.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('');
        this.setColour(OBJECTS_ALT_HUE);
        this.appendDummyInput()
            .appendField('return');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.ALIGN_LEFT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.hasReturnValue_ = true;
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('value', Number(this.hasReturnValue_));
        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var value = xmlElement.getAttribute('value');
        this.hasReturnValue_ = (value == 1);
        if (!this.hasReturnValue_) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE')
                .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @this Blockly.Block
     */
    onchange: function () {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        var legal = false;
        // Is the block nested in a procedure?
        var block = this;
        do {
            if (block.type == 'objects_method_no_return' ||
                block.type == 'objects_method_return') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            // If needed, toggle whether this block has a return value.
            if (block.type == 'objects_method_no_return' && this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = false;
            } else if (block.type == 'objects_method_return' && !this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = true;
            }
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
        }
    }
};

Blockly.Blocks['objects_ifreturn'] = {
    /**
     * Block for conditionally returning a value from a procedure.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl('http://c2.com/cgi/wiki?GuardClause');
        this.setColour(OBJECTS_ALT_HUE);
        this.appendValueInput('CONDITION')
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.hasReturnValue_ = true;
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('value', Number(this.hasReturnValue_));
        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var value = xmlElement.getAttribute('value');
        this.hasReturnValue_ = (value == 1);
        if (!this.hasReturnValue_) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE')
                .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @this Blockly.Block
     */
    onchange: function () {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        var legal = false;
        // Is the block nested in a procedure?
        var block = this;
        do {
            if (block.type == 'objects_method_no_return' ||
                block.type == 'objects_method_return') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            // If needed, toggle whether this block has a return value.
            if (block.type == 'objects_method_no_return' && this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = false;
            } else if (block.type == 'objects_method_return' && !this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE')
                    .appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
                this.hasReturnValue_ = true;
            }
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING);
        }
    }
};

Blockly.Blocks['objects_callshell'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(OBJECTS_ALT_HUE);
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME');
        this.setInputsInline(true);
        this.setOutput(true, 'class');
        // Tooltip is set in domToMutation.
        this.arguments_ = [];
        this.quarkConnections_ = null;
        this.quarkArguments_ = null;
        this.parentBlock_ = null;
        this.dropdown = null;
        this.creator = null;
        //this.init_block = null;


        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        //this.setTooltip('');
    },


    setCreator: function () {
        console.log('----- BEGIN setCreator -----');
        //console.log(this.workspace);
        if (this.workspace != null) {
            //console.log('Workspace is not null');
            var blocks = this.workspace.getAllBlocks();
            ////console.log("Blocks!");

            for (var i = 0; i < blocks.length; i++) {
                ////console.log(blocks[i].type);
                ////console.log(blocks[i].getFieldValue('NAME') == this.getFieldValue('NAME'));
                if (blocks[i].type == 'objects_shell' && blocks[i].getFieldValue('NAME') == this.getFieldValue('NAME')) {
                    ////console.log("TRUE");

                    this.creator = blocks[i];
                    console.log(this.creator);
                    //this.arguments_ = (this.creator.arguments_ || []).concat();
                    //    break;
                } else {
                    ////console.log("FALSE");
                }
            }
            //console.log("In setCreator\nTHE CREATOR NOW IS...")
            //console.log(this.creator);

            if (this.creator != null) {
                //console.log(this.creator.getMethodParameters('__init__'));

                this.setParameters(this.creator.getMethodParameters('__init__'));
                //this.onchange();
            }
        }

        console.log('----- END setCreator -----');
    },

    setParameters: function (params) {
        console.log("+++++ BEGIN .setParameters +++++");

        var tempIds = [];
        var my_params = [];
        //console.log("objects_callshell.setParameters params variable");
        //console.log(params);
        if (params != undefined) {
            var self_index = params.indexOf('self');
            //if (self_index == -1) {
            //    //alert("The first argument in __index__ must be self.");
            //} else {
            for (var i = 0; i < params.length; i++) {
                if (params[i] != 'self') {
                    my_params.push(params[i]);
                }
                //    }
                //}
            }
        }
        for (var t = 0; t < my_params.length; t++) {
            tempIds[t] = 'ARG' + t;
        }

        if (!tempIds) {
            // Reset the quarks (a mutator is about to open).
            this.quarkConnections_ = {};
            this.quarkArguments_ = null;
            return;
        }
        if (goog.array.equals(this.arguments_, my_params)) {
            // No change.
            this.quarkArguments_ = tempIds;
            return;
        }
        this.setCollapsed(false);

        if (tempIds.length != my_params.length) {
            throw 'Error: paramNames and paramIds must be the same length.';
        }

        if (!this.quarkArguments_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            if (my_params.join('\n') == this.arguments_.join('\n')) {
                // No change to the parameters, allow quarkConnections_ to be
                // populated with the existing connections.
                this.quarkArguments_ = tempIds;
            } else {
                this.quarkArguments_ = [];
            }
        }
        //console.log(my_params);
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var i = this.arguments_.length - 1; i >= 0; i--) {
            var input = this.getInput('ARG' + i);
            if (input) {
                var connection = input.connection.targetConnection;
                if (connection != null) {
                    this.quarkConnections_[this.quarkArguments_[i]] = connection;
                }
                // Disconnect all argument blocks and remove all inputs.
                this.removeInput('LEFT', true);
                this.removeInput('ARG' + i, true);
                this.removeInput('RIGHT', true);

            } else {
                // //console.log("ELSE!!!");
                this.removeInput('LEFT', true);
                this.removeInput('RIGHT', true);
            }
        }
        this.removeInput('LEFT', true);
        this.removeInput('RIGHT', true);

        var d = this.appendDummyInput('LEFT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('(', 'L');
        d.init();

        // Rebuild the block's arguments.
        this.arguments_ = my_params.concat();
        this.quarkArguments_ = tempIds;
        for (var i = 0; i < this.arguments_.length; i++) {

            var input = this.appendValueInput('ARG' + i)
                .setAlign(Blockly.ALIGN_RIGHT);
            if (OBJECTSALT_USE_COMMA_FOR_CALLSHELL) {
                if (i != 0) {
                    input.appendField(', ');
                }
            } else {
                input.appendField(this.arguments_[i] + ' =');
            }


            if (this.quarkArguments_) {
                // Reconnect any child blocks.
                var quarkName = this.quarkArguments_[i];
                if (this.quarkConnections_ != null) {
                    if (quarkName in this.quarkConnections_) {
                        var connection = this.quarkConnections_[quarkName];
                        if (!connection || connection.targetConnection ||
                            connection.sourceBlock_.workspace != this.workspace) {
                            // Block no longer exists or has been attached elsewhere.
                            delete this.quarkConnections_[quarkName];
                        } else {
                            input.connection.connect(connection);
                        }
                    }
                }
            }
            input.init();
        }

        var my_this = this.appendDummyInput('RIGHT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(')', 'R');

        my_this.init();
        //console.log(this.arguments_);
        //this.arguments_.reverse();
        //this.arguments_.push('self');
        //this.arguments_.reverse();
        //console.log(this.arguments_);

        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }


        ////console.log("The params are...");
        ////console.log(this.arguments_);
        console.log("+++++ END .setParameters +++++");
    },

    onchange: function () {
        console.log("***** BEGIN onChange *****\nThis is creator!");
        ////console.log(this.creator);
        ////console.log('This block is...');
        ////console.log(this);
        console.log(this.creator);
        if (this.creator == null) {
            this.setCreator();
        }

        this.createTipTool();
        ////console.log("the creator...");
        ////console.log(this.creator);
        console.log("***** END onChange *****");
    },

    createTipTool: function () {
        var name = this.getFieldValue('NAME');

        var parameters = ''; // this.arguments_.join(', ');
        for (var i = 0; i < this.arguments_.length; i++) {

            if (this.arguments_.length <= 2 && i == 0) {
                parameters += this.arguments_[i];
            } else if (i < this.arguments_.length - 2) {
                parameters += this.arguments_[i] + ', ';
            } else if (i == this.arguments_.length - 2) {
                parameters += this.arguments_[i];
            } else {
                parameters += ' and ' + this.arguments_[i];
            }

        }
        parameters += '.';
        this.setTooltip('Instantiate an object of class ' + name + ' with initialization parameters named ' + parameters);
    },

    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this Blockly.Block
     */
    renameProcedure: function (oldName, newName) {
        // //console.log(".renameProcedure");
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'NAME');
            this.setTooltip(
                (this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP :
                    Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP)
                    .replace('%1', newName));
        }
    },

    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @this Blockly.Block
     */
    setProcedureParameters: function (paramNames, paramIds) {
        //var t = fly;
        //this.setParent(creator);
        ////console.log(creator == null);
        //this.creator = creator;
        //this.dropdown = new Blockly.FieldDropdown(dropdown);
        console.log("BEGIN CALLSHELL!!!!     .setProcedureParameters\nParamNames:  ");
        console.log(paramNames);

        /*
         * Data structures:
         * this.arguments = ['x', 'y']
         *     Existing param names.
         * this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
         *     Look-up of paramIds to connections plugged into the call block.
         * this.quarkArguments_ = ['piua', 'f8b_']
         *     Existing param IDs.
         * Note that quarkConnections_ may include IDs that no longer exist, but
         * which might reappear if a param is reattached in the mutator.
         */
        var tempIds = [];
        var my_params = [];
        console.log("objects_callshell.setParameters params variable");
        console.log(paramNames);
        if (paramNames != undefined) {
            //var self_index = paramNames.indexOf('self');
            //if (self_index == -1) {
            //    alert("The first argument in __index__ must be self.");
            //} else {
            for (var i = 0; i < paramNames.length; i++) {
                if (paramNames[i] != 'self') {
                    my_params.push(paramNames[i]);
                }
                //}
            }
        }
        for (var t = 0; t < my_params.length; t++) {
            tempIds[t] = 'ARG' + t;
        }
        console.log("my_params");
        console.log(my_params);
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            this.quarkConnections_ = {};
            this.quarkArguments_ = null;
            return;
        }
        if (goog.array.equals(this.arguments_, paramNames)) {
            // No change.
            this.quarkArguments_ = paramIds;
            return;
        }
        this.setCollapsed(false);
        //if (fly == false) {
        if (paramIds.length != paramNames.length) {
            throw 'Error: paramNames and paramIds must be the same length.';
        }
        //}
        if (!this.quarkArguments_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            if (paramNames.join('\n') == this.arguments_.join('\n')) {
                // No change to the parameters, allow quarkConnections_ to be
                // populated with the existing connections.
                this.quarkArguments_ = paramIds;
            } else {
                this.quarkArguments_ = [];
            }
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var i = this.arguments_.length - 1; i >= 0; i--) {
            var input = this.getInput('ARG' + i);
            if (input) {
                var connection = input.connection.targetConnection;
                if (connection != null) {
                    this.quarkConnections_[this.quarkArguments_[i]] = connection;
                }
                // Disconnect all argument blocks and remove all inputs.
                this.removeInput('LEFT', true);
                this.removeInput('ARG' + i, true);
                this.removeInput('RIGHT', true);

            } else {
                // //console.log("ELSE!!!");
                this.removeInput('LEFT', true);
                this.removeInput('RIGHT', true);
            }
        }
        this.removeInput('LEFT', true);
        this.removeInput('RIGHT', true);


        var d = this.appendDummyInput('LEFT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('(', 'L');

        //if (d != null) {
        d.init();
        //}
        // Rebuild the block's arguments.
        this.arguments_ = my_params.concat();
        ////console.log(this.quarkArguments_);
        this.quarkArguments_ = paramIds;
        for (var i = 0; i < this.arguments_.length; i++) {
            var input = this.appendValueInput('ARG' + i)
                .setAlign(Blockly.ALIGN_RIGHT)
            if (OBJECTSALT_USE_COMMA_FOR_CALLSHELL) {
                if (i != 0) {
                    input.appendField(', ');
                }
            } else {
                input.appendField(this.arguments_[i] + ' =');
            }

            if (this.quarkArguments_) {
                // Reconnect any child blocks.
                var quarkName = this.quarkArguments_[i];
                if (this.quarkConnections_ != null) {
                    if (quarkName in this.quarkConnections_) {
                        var connection = this.quarkConnections_[quarkName];
                        if (!connection || connection.targetConnection ||
                            connection.sourceBlock_.workspace != this.workspace) {
                            // Block no longer exists or has been attached elsewhere.
                            delete this.quarkConnections_[quarkName];
                        } else {
                            input.connection.connect(connection);
                        }
                    }
                }
            }
            if (true) {
                input.init();
            }
        }

        var my_this = this.appendDummyInput('RIGHT')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(')', 'R');
        if (true) {
            //if (my_this != null) {
            my_this.init();
        }
        //this.init();

        //console.log(this.arguments_);
        //this.arguments_.reverse();
        //this.arguments_.push('self');
        //this.arguments_.reverse();
        //console.log(this.arguments_);

        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
        // //console.log(this.getInput('ARG0'));
        // //console.log(this.getInput('ARG1'));
        //console.log("At end of setProcedureParameters\nThis is creator!");
        //console.log(this.creator);
        console.log("END CALLSHELL!!!!     .setProcedureParameters");
    },

    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        console.log("BEGIN .mutationToDom");
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }

        console.log("END .mutationToDom");
        return container;
    },

    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        console.log("BEGIN domToMutation");

        var name = xmlElement.getAttribute('name');
        var parameters = '';
        //if (this.arguments_.length > 0){
        parameters = this.arguments_.toString();
        //} else {
        //    parameters = '?, ?';
        //}

        this.setFieldValue(name, 'NAME');
        this.setTooltip('Instantiate an object of class ' + name + ' with parameters named ' + parameters);
        var def = Blockly.Objects.getDefinition(name, this.workspace);
        if (def && def.mutator && def.mutator.isVisible()) {
            // Initialize caller with the mutator's IDs.
            console.log("paramIds");
            console.log(def.paramIds_);
            this.setProcedureParameters(def.arguments_, def.paramIds_);
            //this.setParameters(def.methods['__init__']);
        } else {
            var args = [];
            for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
                if (childNode.nodeName.toLowerCase() == 'arg') {
                    args.push(childNode.getAttribute('name'));
                }
            }
            // For the second argument (paramIds) use the arguments list as a dummy
            // list.
            //this.setProcedureParameters(args, args);
            this.setParameters(args);
        }
        // }
        console.log("End domToMutation");

    },

    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function (oldName, newName) {

        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                this.getInput('ARG' + i).fieldRow[0].setText(newName);
            }
        }
    },

    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.  The NAME field is guaranteed to exist, null will never be returned.
     * @this Blockly.Block
     */
    getProcedureCall: function () {
        return /** @type {string} */ (this.getFieldValue('NAME'));
    },

    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function (options) {
        var option = {enabled: true};
        option.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function () {
            var def = Blockly.Objects.getDefinition(name, workspace);
            def && def.select();
        };
        options.push(option);
    },
};

/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tnov7q
 * @type {{init: Function}}
 */
Blockly.Blocks['objects_execute_method_text'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("");
        this.appendValueInput("CLASS")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(".");
        this.appendDummyInput('MENU')
            .appendField(new Blockly.FieldTextInput('method here'), "METHOD");
        this.appendDummyInput()
            .appendField("(");
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("param, param"), "PARAMS");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setColour(OBJECTS_ALT_HUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },
    onchange: function () {
        /*
         //console.log("CLASS:");
         //console.log(this.getInputTargetBlock('CLASS'));
         var class_block = this.getInputTargetBlock('CLASS');
         //console.log(class_block.creator);
         var methods = [];

         if (class_block != null){
         var method_names = class_block.creator.getMethodNames();
         var dropdown =[];
         var parameters = [];
         for (var i = 0; i < method_names.length; i++){
         dropdown.push([i, i]);
         parameters.push(class_block.creator.getMethodParameters(i));
         }
         }
         //console.log(dropdown);
         //console.log(parameters);
         */
    },

};


/**
 * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#tnov7q
 * @type {{init: Function}}
 */
Blockly.Blocks['objects_methods'] = {
    init: function () {

        this.methods = [];
        this.methods_drop = [['none', 'NONE']];
        this.appendDummyInput('MYNAME')
            .appendField('', 'NAME');
        this.appendValueInput("CLASS")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([[]]), "METHODS");
        this.appendDummyInput('DUMMY')
            .appendField(".");
        //this.appendDummyInput('MENU')
        //    .appendField(new Blockly.FieldTextInput('method here'), "METHOD");
        //this.appendDummyInput('DROP')

        //this.appendDummyInput()
        //    .appendField("(");
        ////this.appendDummyInput("PARAMETERS")
        ////    .appendField(new Blockly.Field("param, param"), "PARAMS");
        //this.appendDummyInput()
        //    .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setColour(OBJECTS_ALT_HUE);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
        this.creator = null;
        //this.setCreator();
        //this.drop = d;
        //this.setParams();

    },
    setDrop: function () {
        //this.drop.init();
    },

    setCreator: function () {
        if (this.workspace != null) {

            var blocks = this.workspace.getAllBlocks();
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].type == 'objects_shell' && blocks[i].getFieldValue('NAME') == this.getFieldValue('NAME')) {
                    this.creator = blocks[i];
                } else {
                }
            }
            if (this.creator != null) {
                this.setParams();
            }
        }

    },

    onchange: function () {
        if (this.creator == null) {
            this.setCreator();
        }
    },

    setParams: function () {
        console.log('Params Creator');
        console.log(this.creator);
        if (this.creator != null) {
            var method_names = [];
            var methods_for_drop = [];

            if (this.creator.methods.length != 0) {
                for (var key in this.creator.methods) {
                    if (key != '__init__') {
                        method_names.push(key);
                        methods_for_drop.push([key, key]);
                    }

                }
                this.methods = method_names;
                this.methods_drop = methods_for_drop;

            }
            console.log(methods_for_drop);

            this.appendDummyInput('MENU')
                .appendField(new Blockly.FieldDropdown([['rooster', 'rooster']]), "M");

            // Switch off rendering while the block is rebuilt.
            //var savedRendered = this.rendered;
            //this.rendered = false;
            //
            ////this.setFieldText('abcd', 'PARAMS');
            //this.removeInput('DROP', true);
            //console.log("Here are methods_drop:  ");
            //console.log(methods_for_drop);
            //methods_for_drop = [['a', 'a'],['b','b'],['c','c']];
            //var d = this.appendDummyInput('DROP')
            //    .appendField(new Blockly.FieldDropdown(methods_for_drop), "METHODS");
            //
            //
            //d.init();
            //
            //this.rendered = savedRendered;
            //if (this.rendered) {
            //    this.render();
            //}
        }
    },
    mutationToDom: function () {
        // //console.log(".mutationToDom");
        var container = document.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },

    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        //console.log("BEGIN domToMutation");

        var name = xmlElement.getAttribute('name');
        var parameters = '';
        //if (this.arguments_.length > 0){
        parameters = this.arguments_.toString();
        //} else {
        //    parameters = '?, ?';
        //}

        this.setFieldValue(name, 'NAME');
        this.setTooltip('Instantiate an object of class ' + name + ' with parameters named ' + parameters);
        var def = Blockly.Objects.getDefinition(name, this.workspace);
        if (def && def.mutator && def.mutator.isVisible()) {
            // Initialize caller with the mutator's IDs.
            this.setProcedureParameters(def.arguments_, def.paramIds_);
        } else {
            var args = [];
            for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
                if (childNode.nodeName.toLowerCase() == 'arg') {
                    args.push(childNode.getAttribute('name'));
                }
            }
            // For the second argument (paramIds) use the arguments list as a dummy
            // list.
            this.setProcedureParameters(args, args);
        }
        // }
        //console.log("End domToMutation");

    },


};
