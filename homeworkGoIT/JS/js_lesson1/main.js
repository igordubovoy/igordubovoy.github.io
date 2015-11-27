(function(){
    var developer,
        name,
        yourName;

    name = 'Sergey';
    developer = name;
    document.write(developer);

    yourName = prompt('What is your name?', '');
    alert('Hello, ' + yourName + ".");
})()
