document.onload = document.getElementById('btnClrRes').style.display = "none";


function parse(str) {
    if (str.search('×') != -1) {
        str = str.replace('×', '*');
    } else if (str.search('÷') != -1) {
        str = str.replace('÷', '/');
    }
    return str;
}

function resParse(str) {
    if (str.search('x') != -1) {
        str = str.replace('x', '×');
    } else if (str.search(/\*/) != -1) {
        str = str.replace(/\*/, '×');
    } else if (str.search('X') != -1) {
        str = str.replace('X', '×');
    } else if (str.search(/\//) != -1) {
        str = str.replace(/\//g, '÷');
    }
    return str;
}

function detectAction(e) {
    var btn = e.target || e.srcElement;
    var result = document.querySelector('.result');
    var formula = document.querySelector('.formula');
    if (e.type === 'click') {
        var action = document.getElementById(btn.id).innerHTML;
    } else {
        var action = e.key;
    }

    switch (action) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '(':
        case ')':
            if (document.getElementById('btnClr').style.display === "block" && formula.innerHTML != "") {
                formula.innerHTML = "Ans=".concat(result.innerHTML);
                result.innerHTML = "";
            }
            document.getElementById('btnClrRes').style.display = "block";
            document.getElementById('btnClr').style.display = "none";
            result.innerHTML += action;
            break;
        case '÷':
        case '/':
        case '×':
        case 'x':
        case 'X':
        case '*':
        case '-':
        case '+':
        case '.':
            if (result.innerHTML.charAt(result.innerHTML.length - 1) === "-" ||
                result.innerHTML.charAt(result.innerHTML.length - 1) === "+" ||
                result.innerHTML.charAt(result.innerHTML.length - 1) === "÷" ||
                result.innerHTML.charAt(result.innerHTML.length - 1) === "×" ||
                result.innerHTML.charAt(result.innerHTML.length - 1) === ".") {
                break;
            }
            document.getElementById('btnClrRes').style.display = "block";
            document.getElementById('btnClr').style.display = "none";
            result.innerHTML += resParse(action);
            break;
        case 'AC':
            result.innerHTML = "";
            formula.innerHTML = "";
            break;
        case 'CE':
            result.innerHTML = result.innerHTML.substr(0, result.innerHTML.length - 1);
            break;
        case 'Backspace':
        case 'c':
        case 'C':
            if (document.getElementById('btnClrRes').style.display === "block") {
                result.innerHTML = result.innerHTML.substr(0, result.innerHTML.length - 1);
                break;
            } else {
                result.innerHTML = "";
                formula.innerHTML = "";
                break;
            }
        case 'Enter':
        case '=':
            var expr = parse(result.innerHTML);
            if (result.innerHTML === "" && formula.innerHTML === "") {
                break;
            }
            else if (result.innerHTML === "" && formula.innerHTML != "") {
                formula.innerHTML = "";
                break;
            }

            // ANIMATIONS
            // document.getElementsByClassName('result').animate([
            //     // keyframes
            //     { transform: 'translateY(100%)' },
            //     { transform: 'translateY(0%)' }
            // ], {
            //     // animation options
            //     duration: 1000,
            //     easing: "ease"
            // });

            formula.innerHTML = result.innerHTML.concat('=');
            result.innerHTML = eval(expr);
            document.getElementById('btnClrRes').style.display = "none";
            document.getElementById('btnClr').style.display = "block";
            break;
    }
}

let btns = document.querySelectorAll('.btn');

btns.forEach((b) => b.addEventListener('click', detectAction));
document.addEventListener('keydown', detectAction);


let themeSwitch = document.querySelector('.switch');

themeSwitch.onclick = () => {
    document.querySelector('body').classList.toggle('light');
    document.querySelector('body').classList.toggle('dark');
}

function themePreference() {
    if ((window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.querySelector('body').classList.add('dark');
        document.querySelector('body').classList.remove('light');
    }
}

document.onload = themePreference();