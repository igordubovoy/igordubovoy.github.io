//Задание 1

function exercise1() {

    //Running script
    do {
        var userChoice = prompt('Введите число больше 99', '');
        console.log(userChoicee)
    }
    while (userChoice < 99 && userChoice != null);
}

//Задание 2

function exercise2() {

    //Running script
    for (var simple = 2; i <= 10; i++) {
        for (var divider = 2; j <= i; j++) {
            if (simple % divider == 0) break;
        }
        if (simple == divider) {
            console.log(simple);
        }
    }
}

//Задание 3

function exercise3() {

    //Running script
    for (var i = 1; i <= 100; i++) {
        if (i % 3 == 0) {
            console.log('Fizz');
        } else if (i % 5 == 0 && i % 3 != 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}

//Задание 4

function exercise4() {

    //Running script
    for (var i = 1; i <= 100; i++) {
        if (i % 5 == 0 && i % 3 == 0) {
            console.log('FizzBuzz');
        } else {
            console.log(i);
        }
    }
}

//Задание 5

function exercise5() {

    //variable declaration and getting value
    var quantityRow = +prompt('Введите количество колонок для шахматной доски'),
        quantityString = +prompt('Введите количество рядков для шахматной доски'),
        hesh = "#",
        value = '';
    //Running script

    for (var row = 1; row <= quantityRow; row++) {
        for (var tableString = 1; tableString <= quantityString; tableString++) {
            if (row % 2 == 0) {
                if (tableString % 2 != 0) {
                    value += hesh;
                } else {
                    value += " ";
                }
            } else {
                if (tableString % 2 == 0) {
                    value += hesh;
                } else {
                    value += " ";
                }
            }
        }
        console.log(value)
        value = '';
    }
}

//Задание 5

function exercise6() {

    //variable declaration and getting value
    var getNumber = +prompt('Введите число для поднесения его в степень', ''),
        getDegree = +prompt('Введите степень', ''),
        result = getNumber;
    //Running script
    for (var i = 1; i < getDegree; i++) {
        result = result * getNumber;
    }
    console.log(result);
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
        } else if (this.className == "lesson-button _6") {
            exercise6();
        }
    }
}
