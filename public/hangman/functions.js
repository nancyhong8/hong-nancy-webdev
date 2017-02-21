/**
 * Created by Nancy Hong on 20-Feb-17.
 */

function instructions() {
    var visibility = document.getElementById('instructions')
    if(visibility.style.display == "none") {
        visibility.style.display = "block";
    } else {
        visibility.style.display = "none";
    }
}



function buttons() {
    var alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]

    buttons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {

        letters.id = 'letters';
        letter = document.createElement('li');
        letter.id = 'letter';
        letter.innerHTML = alphabet[i];
        buttons.appendChild(letters);
        letters.appendChild(letter);
    }
}


function buttonClicked() {
    alert('Testing');
}




function restart() {

}

window.onload = function() {
    buttons();
}




    // var buttons = function() {
    //     buttons = document.getElementById('buttons');
    //     letter = document.createElement('p');
    //     for (var i = 0; i < alphabet.length; i++) {
    //         letter.id = 'letter';
    //         letter.innerHTML = alphabet[i];
    //         buttons.appendChild(letter);
    //     }
    // }

    // create alphabet ul







