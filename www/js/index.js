/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

    init();
}

function init() {
    $("#addTask").click(addTask);
    addFromStorage();

 
}

function addFromStorage(){
    var list = JSON.parse(localStorage.getItem("data"));
    for (let index = 0; index < list.length; index++) {
        var delButton = $('<button id="delete">x</button>');
        delButton.click(deleteLi);
        delButton.css('float','right')
        var newElem = $('<li id="'+index+'">'+list[index]+'</li>');
        newElem.append(delButton);

        var editTask = $('<button id="edit">edit</button>');
        editTask.click(edit);
        editTask.css('float', 'right');
        newElem.append(editTask);
        $("ul").append(newElem);
        $("ul").listview("refresh");
    }
}

function addTask() {
    var data = JSON.parse(localStorage.getItem("data"));

    let question = prompt("Task name:");
    var editTask = $('<button id="edit">edit</button>');
    var delButton = $('<button id="delete">x</button>');
    editTask.click(edit);
    editTask.css('float', 'right');
    delButton.click(deleteLi);
    delButton.css('float','right');
    var newElem = $('<li id="'+data.length+'">'+question+'</li>');
    newElem.append(editTask);
    newElem.append(delButton);

    data.push(question);
    localStorage.setItem("data", JSON.stringify(data));
    
    $("ul").append(newElem);
    $("ul").listview("refresh");
}

function edit(e) {
    var caller = e.target || e.srcElement;
    var id = $(caller).parent().attr("id");
    var data = JSON.parse(localStorage.getItem("data"));

    var nuevoTextField = $("<input>").attr("type", "text");
    var nuevoBoton = $("<button>").text("Save");
    var dontSaveButton = $("<button>").text("X");
    nuevoBoton.click(function() {
        data[id] = nuevoTextField.val();
        localStorage.setItem("data", JSON.stringify(data));
        location.reload();
    });

    dontSaveButton.click(function() {
        location.reload();
    })

    $(caller).parent().empty().append(nuevoTextField, nuevoBoton, dontSaveButton);


}

function deleteLi(e) {
    var caller = e.target || e.srcElement;
    var id = $(caller).parent().attr("id");
    var data = JSON.parse(localStorage.getItem("data"));

    data.splice(id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    location.reload();
}
