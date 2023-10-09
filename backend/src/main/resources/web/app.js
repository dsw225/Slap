"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Prevent compiler errors when using jQuery.  "$" will be given a type of 
// "any", so that we can use it anywhere, and assume it has any fields or
// methods, without the compiler producing an error.
var $;
// The 'this' keyword does not behave in JavaScript/TypeScript like it does in
// Java.  Since there is only one NewEntryForm, we will save it to a global, so
// that we can reference it from methods of the NewEntryForm in situations where
// 'this' won't work correctly.
var newEntryForm;
/**
 * NewEntryForm encapsulates all of the code for the form for adding an entry
 */
var NewEntryForm = /** @class */ (function () {
    /**
     * To initialize the object, we say what method of NewEntryForm should be
     * run in response to each of the form's buttons being clicked.
     */
    function NewEntryForm() {
        var _a, _b;
        (_a = document.getElementById("addCancel")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) { newEntryForm.clearForm(); });
        (_b = document.getElementById("addButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) { newEntryForm.submitForm(); });
    }
    /**
     * Clear the form's input fields
     */
    NewEntryForm.prototype.clearForm = function () {
        document.getElementById("newTitle").value = "";
        document.getElementById("newMessage").value = "";
        // reset the UI
        document.getElementById("editElement").style.display = "none";
        document.getElementById("addElement").style.display = "none";
        document.getElementById("showElements").style.display = "block";
    };
    /**
     * Check if the input fields are both valid, and if so, do an AJAX call.
     */
    NewEntryForm.prototype.submitForm = function () {
        var _this = this;
        window.alert("Submit form called.");
        // get the values of the two fields, force them to be strings, and check 
        // that neither is empty
        var title = "" + document.getElementById("newTitle").value;
        var msg = "" + document.getElementById("newMessage").value;
        if (title === "" || msg === "") {
            window.alert("Error: title or message is not valid");
            return;
        }
        // set up an AJAX POST. 
        // When the server replies, the result will go to onSubmitResponse
        var doAjax = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/messages', {
                            method: 'POST',
                            body: JSON.stringify({
                                mTitle: title,
                                mMessage: msg
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            // If we get an "ok" message, return the json
                            if (response.ok) {
                                return Promise.resolve(response.json());
                            }
                            // Otherwise, handle server errors with a detailed popup message
                            else {
                                window.alert("The server replied not ok: ".concat(response.status, "\n") + response.statusText);
                            }
                            return Promise.reject(response);
                        }).then(function (data) {
                            newEntryForm.onSubmitResponse(data);
                            console.log(data);
                        }).catch(function (error) {
                            console.warn('Something went wrong.', error);
                            window.alert("Unspecified error");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    };
    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    NewEntryForm.prototype.onSubmitResponse = function (data) {
        // If we get an "ok" message, clear the form
        if (data.mStatus === "ok") {
            newEntryForm.clearForm();
        }
        // Handle explicit errors with a detailed popup message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        // Handle other errors with a less-detailed popup message
        else {
            window.alert("Unspecified error");
        }
    };
    return NewEntryForm;
}()); // end class NewEntryForm
// a global for the EditEntryForm of the program.  See newEntryForm for explanation
var editEntryForm;
/**
 * EditEntryForm encapsulates all of the code for the form for editing an entry
 */
var EditEntryForm = /** @class */ (function () {
    /**
     * To initialize the object, we say what method of EditEntryForm should be
     * run in response to each of the form's buttons being clicked.
     */
    function EditEntryForm() {
        var _a, _b;
        (_a = document.getElementById("editCancel")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) { editEntryForm.clearForm(); });
        (_b = document.getElementById("editButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) { editEntryForm.submitForm(); });
    }
    /**
     * init() is called from an AJAX GET, and should populate the form if and
     * only if the GET did not have an error
     */
    EditEntryForm.prototype.init = function (data) {
        // If we get an "ok" message, fill in the edit form
        if (data.mStatus === "ok") {
            document.getElementById("editTitle").value = data.mData.mTitle;
            document.getElementById("editMessage").value = data.mData.mContent;
            document.getElementById("editId").value = data.mData.mId;
            document.getElementById("editCreated").value = data.mData.mCreated;
            // show the edit form
            document.getElementById("editElement").style.display = "block";
            document.getElementById("addElement").style.display = "none";
            document.getElementById("showElements").style.display = "none";
        }
        // Handle explicit errors with a detailed popup message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        // Handle other errors with a less-detailed popup message
        else {
            window.alert("Unspecified error");
        }
    };
    /**
     * Clear the form's input fields
     */
    EditEntryForm.prototype.clearForm = function () {
        document.getElementById("editTitle").value = "";
        document.getElementById("editMessage").value = "";
        document.getElementById("editId").value = "";
        document.getElementById("editCreated").value = "";
    };
    /**
     * Check if the input fields are both valid, and if so, do an AJAX call.
     */
    EditEntryForm.prototype.submitForm = function () {
        var _this = this;
        window.alert("Submit edit form called.");
        // get the values of the two fields, force them to be strings, and check
        // that neither is empty
        var title = "" + document.getElementById("editTitle").value;
        var msg = "" + document.getElementById("editMessage").value;
        // NB: we assume that the user didn't modify the value of editId
        var id = "" + document.getElementById("editId").value;
        if (title === "" || msg === "" || id === "") {
            window.alert("Error: title, message, or id is not valid");
            return;
        }
        // set up an AJAX PUT.
        // When the server replies, the result will go to onSubmitResponse
        var doAjax = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/messages/".concat(id), {
                            method: 'PUT',
                            body: JSON.stringify({
                                mTitle: title,
                                mMessage: msg
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            // If we get an "ok" message, return the json
                            if (response.ok) {
                                // return response.json();
                                return Promise.resolve(response.json());
                            }
                            // Otherwise, handle server errors with a detailed popup message
                            else {
                                window.alert("The server replied not ok: ".concat(response.status, "\n") + response.statusText);
                            }
                            // return response;
                            return Promise.reject(response);
                        }).then(function (data) {
                            editEntryForm.onSubmitResponse(data);
                            console.log(data);
                        }).catch(function (error) {
                            console.warn('Something went wrong.', error);
                            window.alert("Unspecified error");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    };
    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a
     * result.
     *
     * @param data The object returned by the server
     */
    EditEntryForm.prototype.onSubmitResponse = function (data) {
        // If we get an "ok" message, clear the form and refresh the main 
        // listing of messages
        if (data.mStatus === "ok") {
            editEntryForm.clearForm();
            mainList.refresh();
        }
        // Handle explicit errors with a detailed popup message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        // Handle other errors with a less-detailed popup message
        else {
            window.alert("Unspecified error");
        }
    };
    return EditEntryForm;
}()); // end class EditEntryForm
// a global for the main ElementList of the program.  See newEntryForm for 
// explanation
var mainList;
/**
 * ElementList provides a way of seeing all of the data stored on the server.
 */
var ElementList = /** @class */ (function () {
    function ElementList() {
    }
    /**
     * refresh is the public method for updating messageList
     */
    ElementList.prototype.refresh = function () {
        var _this = this;
        // Issue an AJAX GET and then pass the result to update(). 
        var doAjax = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/messages', {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            // If we get an "ok" message, clear the form
                            if (response.ok) {
                                return Promise.resolve(response.json());
                            }
                            // Otherwise, handle server errors with a detailed popup message
                            else {
                                window.alert("The server replied not ok: ".concat(response.status, "\n") + response.statusText);
                            }
                            return Promise.reject(response);
                        }).then(function (data) {
                            mainList.update(data);
                            console.log(data);
                        }).catch(function (error) {
                            console.warn('Something went wrong.', error);
                            window.alert("Unspecified error");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    };
    ElementList.prototype.update = function (data) {
        var elem_messageList = document.getElementById("messageList");
        if (elem_messageList !== null) {
            elem_messageList.innerHTML = "";
            var fragment = document.createDocumentFragment();
            var table = document.createElement('table');
            for (var i = 0; i < data.mData.length; ++i) {
                var tr = document.createElement('tr');
                var td_title = document.createElement('td');
                var td_id = document.createElement('td');
                td_title.innerHTML = data.mData[i].mTitle;
                td_id.innerHTML = data.mData[i].mId;
                tr.appendChild(td_id);
                tr.appendChild(td_title);
                tr.appendChild(this.buttons(data.mData[i].mId));
                table.appendChild(tr);
            }
            fragment.appendChild(table);
            elem_messageList.appendChild(fragment);
        }
        // Find all of the delete buttons, and set their behavior
        var all_delbtns = document.getElementsByClassName("delbtn");
        for (var i = 0; i < all_delbtns.length; ++i) {
            all_delbtns[i].addEventListener("click", function (e) { mainList.clickDelete(e); });
        }
        // Find all of the edit buttons, and set their behavior
        var all_editbtns = document.getElementsByClassName("editbtn");
        for (var i = 0; i < all_editbtns.length; ++i) {
            all_editbtns[i].addEventListener("click", function (e) { mainList.clickEdit(e); });
        }
    };
    /**
     * clickDelete is the code we run in response to a click of a delete button
     */
    ElementList.prototype.clickDelete = function (e) {
        var _this = this;
        var id = e.target.getAttribute("data-value");
        // Issue an AJAX DELETE and then invoke refresh()
        var doAjax = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/messages/".concat(id), {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            if (response.ok) {
                                return Promise.resolve(response.json());
                            }
                            else {
                                window.alert("The server replied not ok: ".concat(response.status, "\n") + response.statusText);
                            }
                            return Promise.reject(response);
                        }).then(function (data) {
                            mainList.refresh();
                            console.log(data);
                        }).catch(function (error) {
                            console.warn('Something went wrong.', error);
                            window.alert("Unspecified error");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
        // TODO: we've repeated the same pattern 3+ times now, so we should really
        //   think about refactoring and abstracting this boilerplate into something
        //   easier to reuse, if possible 
    };
    /**
     * clickEdit is the code we run in response to a click of a delete button
     */
    ElementList.prototype.clickEdit = function (e) {
        var _this = this;
        // as in clickDelete, we need the ID of the row
        var id = e.target.getAttribute("data-value");
        // Issue an AJAX GET and then pass the result to editEntryForm.init()
        var doAjax = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/messages/".concat(id), {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        }).then(function (response) {
                            if (response.ok) {
                                return Promise.resolve(response.json());
                            }
                            else {
                                window.alert("The server replied not ok: ".concat(response.status, "\n") + response.statusText);
                            }
                            return Promise.reject(response);
                        }).then(function (data) {
                            editEntryForm.init(data);
                            console.log(data);
                        }).catch(function (error) {
                            console.warn('Something went wrong.', error);
                            window.alert("Unspecified error");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    };
    /**
     * buttons() adds a 'delete' button and an 'edit' button to the HTML for each row
     */
    ElementList.prototype.buttons = function (id) {
        var fragment = document.createDocumentFragment();
        var td = document.createElement('td');
        // create edit button, add to new td, add td to returned fragment
        var btn = document.createElement('button');
        btn.classList.add("editbtn");
        btn.setAttribute('data-value', id);
        btn.innerHTML = 'Edit';
        td.appendChild(btn);
        fragment.appendChild(td);
        // create delete button, add to new td, add td to returned fragment
        td = document.createElement('td');
        btn = document.createElement('button');
        btn.classList.add("delbtn");
        btn.setAttribute('data-value', id);
        btn.innerHTML = 'Delete';
        td.appendChild(btn);
        fragment.appendChild(td);
        return fragment;
    };
    return ElementList;
}()); // end class ElementList
// Run some configuration code when the web page loads
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Create the object that controls the "New Entry" form
    newEntryForm = new NewEntryForm();
    // Create the object that controls the "Edit Entry" form
    editEntryForm = new EditEntryForm();
    // Create the object for the main data list, and populate it with data from the server
    mainList = new ElementList();
    mainList.refresh();
    window.alert('DOMContentLoaded');
    // set up initial UI state
    document.getElementById("editElement").style.display = "none";
    document.getElementById("addElement").style.display = "none";
    document.getElementById("showElements").style.display = "block";
    // set up the "Add Message" button
    (_a = document.getElementById("showFormButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
        document.getElementById("addElement").style.display = "block";
        document.getElementById("showElements").style.display = "none";
    });
}, false);
