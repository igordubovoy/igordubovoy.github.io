(function () {
    // Задание страничка 40
    var fruits = ['apple', 'orange'],
        fruit = 'kiwi';
    fruits.push(fruit);
    fruits[fruits.length - 2] = 'pear';
    console.log(fruits);
    console.log('********************************');

    //    Задание на страничке 41
    function getRandomElement(arr) {
        var random = Math.random() * (arr.length - 1);
        random = Math.round(random);
        return arr[random];
    }

    console.log(getRandomElement(fruits));
    console.log(getRandomElement(fruits));
    console.log(getRandomElement(fruits));
    console.log('********************************');

    //    Задание на страничке 42

    function find(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) return arr[i];
        }
        return -1
    }
    console.log(find(fruits, 'apple'));
    console.log(find(fruits, 'orange'));
    console.log(find(fruits, 'kiwi'));
    console.log('********************************');

    //    Задание на страничке 42

    var numberArr = [1, 3, 6, 7, 8, 12, 4, 9, 5],
        filtered = [],
        counter = 0;

    function filterRange(arr, a, b) {
        for (var i = 0; i < arr.length; i++) {
            if (a <= arr[i] && b >= arr[i]) {
                filtered[counter] = arr[i];
                counter++
            }
        }
        return filtered;

    }
    console.log(filterRange(numberArr, 3, 9));

})()
