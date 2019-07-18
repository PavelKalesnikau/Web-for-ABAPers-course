var convertName = function () {
    var person = prompt("Please enter your name", "");
    if (person == null || person == "") {
        alert("User cancelled the prompt.");
        return;
    }
    if ( isNumber(person) ) {
        alert(translateName(person))
    } else {
        alert("Your name is " + person)
    }
}
function isNumber(text) {
    return /\d/.test(text);
}
function translateName(txt) {
    var res = '';
    for (var i = 0; i < txt.length; ++i) {
        c = txt[i];
        if (i % 2 == 0) {
            res += c.toUpperCase();
        } else {
            res += c.toLowerCase();
        }
    }
    return res;
}