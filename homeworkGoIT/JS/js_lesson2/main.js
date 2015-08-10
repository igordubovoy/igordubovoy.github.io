//Задание 1

function exercise1() {

    //variable declaration and getting value
    var yearToday = +prompt('Какой сейчас год?', '');

    //Running script
    if (yearToday == 2015) {
        alert('Да, вы правы!');
    } else {
        alert('С луны свалися? 2015!');
    }
}

//Задание 2

function exercise2() {

    //variable declaration and getting value
    var integer = +prompt('Введите любое целое число?', '');

    //Running script
    if (integer > 0) {
        alert(1);
    } else if (integer == 0) {
        alert(0);
    } else {
        alert(-1);
    }
}

//Задание 3

function exercise3() {

    //variable declaration
    var loginAdmin = 'admin',
        passwordAdmin = 'passw0rd';

    //Running script
    var loginUser = prompt('Введите логин', '');
    if (loginUser == null) {
        alert('Canceled')
    } else if (loginAdmin == loginUser) {
        var passwordUser = prompt('Введите пароль', '');
        if (passwordAdmin == passwordUser) {
            alert('Welcome home!');
        } else if (passwordUser == null) {
            alert('Canceled');
        } else {
            alert('Wrong password');
        }
    } else {
        alert('Access denied');
    }
}

//Задание 4

function exercise4() {

    //variable declaration and getting value
    var a = +prompt('Введите значение для неизвестной "а"', ''),
        b = +prompt('Введите значение для неизвестной "b"', '');

    //Running script
    (a + b >= 3) ? alert('Yep!'): alert('Noup!');
}

//Задание 5

function exercise5() {

    //variable declaration and getting value
    var name = prompt('Введите логин зарегестрированых пользователей: admin, manager'),
        text;

    //Running script

    (name == 'admin') ? text = 'Hi':
        (name == 'manager') ? text = 'Hello' :
        (name == '') ? text = 'No login' : text = '';
    alert(text);
}

//creating an array of buttons
var buttons = document.querySelectorAll('.lesson-button');

//add events for buttons
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        if (this.className == "lesson-button _1") {
            exercise1();
        } else if (this.className == "lesson-button _2") {
            exercise2();
        } else if (this.className == "lesson-button _3") {
            exercise3();
        } else if (this.className == "lesson-button _4") {
            exercise4();
        } else if (this.className == "lesson-button _5") {
            exercise5();
        }
    }
}
