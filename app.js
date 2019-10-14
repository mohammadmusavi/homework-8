window.onload = init;
var name_of_country = '';

function init() {
    loadJSON('GET', 'https://restcountries.eu/rest/v2/all', function(d) {
        document.getElementsByClassName('spinner-1')[0].style.display = "none";
        var rand = Math.floor(Math.random() * 250);
        build(d[rand], 'output');
        name_shuffle(d[rand].name, 'name-country');
    });

    function loadJSON(m, u, c) {
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                c(JSON.parse(this.response));
            }
        }
        xHR.send();
    }

    function build(res, id) {
        var source = document.getElementById('user-template').innerHTML;
        var template = Handlebars.compile(source);
        var html = template(res);
        document.getElementById(id).innerHTML = html;
    }

    function shuffle(arr) {
        arr = arr.split('');
        var temp_arr = arr.slice();
        var rand;
        var temp;
        for (var i = (temp_arr.length - 1); i > 0; i--) {
            rand = Math.floor(Math.random() * (i));
            temp = temp_arr[i];
            temp_arr[i] = temp_arr[rand];
            temp_arr[rand] = temp;
        }
        temp_arr = temp_arr.join('');
        return temp_arr;
    }

    function name_shuffle(arr, id) {
        arr = arr.toLowerCase();
        arr = arr.split('');
        var temp_arr = arr.slice();
        var html_text = '';
        var temp_val = '';
        var show = document.getElementById(id);
        for (var j = 0; j < temp_arr.length; j++) {
            if (temp_arr[j] == "(" || temp_arr[j] == ")" || temp_arr[j] == ".") {
                temp_arr.splice(j, 1);
                j--;
            }
        }
        name_of_country = temp_arr;
        for (var j = 0; j < temp_arr.length; j++) {
            if (temp_arr[j] != " ") temp_val = temp_val + temp_arr[j];
            if (temp_arr[j] == " " || j == temp_arr.length - 1) {
                html_text = html_text + shuffle(temp_val) + " ";
                temp_val = '';
            }
        }
        show.innerText = html_text;
    }
}

function check() {
    var show_result = document.getElementById('check-result');
    var val_input = document.getElementById('guess-name').value;
    val_input = val_input.toLowerCase();
    val_input = val_input.split('');
    for (var i = 0; i < val_input.length; i++) {
        if (val_input[i] == name_of_country[i] && val_input[i] != ' ') val_input[i] = '-';
    }
    val_input = val_input.join('');
    show_result.innerText = val_input;
}

function new_country() {
    init();
}