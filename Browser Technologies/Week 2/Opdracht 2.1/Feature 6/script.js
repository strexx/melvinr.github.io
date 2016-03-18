var removeClass = function (elm, className) {
    if (document.documentElement.classList) {
        removeClass = function (elm, className) {
            elm.classList.remove(className);
        }
    } else {
        removeClass = function (elm, className) {
            if (!elm || !elm.className) {
                return false;
            }
            var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
            elm.className = elm.className.replace(regexp, "$2");
        }
    }
    removeClass(elm, className);
}

var addClass = function (elm, className) {
    if (elm.classList) {
        elm.classList.add(className);
    } else if (!hasClass(elm, className)) {
        elm.className += " " + className;
    }
}

var changeBtn = document.getElementById('change-btn');
var text = document.getElementById('test-elm');

changeBtn.addEventListener('click', function () {
    if (text.className === 'green') {
        removeClass(text, 'green');
        addClass(text, 'red');
    } else {
        removeClass(text, 'red');
        addClass(text, 'green');
    }
})