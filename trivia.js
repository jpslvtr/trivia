function checkForm1() {
    var x = document.getElementById("questions").value;
    if(x == "") {
        alert("How. Many. Questions?!");
        return false;
    }
    if(x > 50) {
        alert("Max is 50 questions, pal.");
        return false;
    }
}

function showHiddenForm() {
    var numQuestions = document.getElementById("questions").value;
    var div = document.getElementById("hiddenForm");
    if(div.style.display == 'none') {
        div.style.display = '';
    }
    else {
        div.style.display = 'none';
    }
}
function showQuestions() {
    var div = document.getElementById("reset");
    if(div.style.display == 'none') {
        div.style.display = '';
    }
    else {
        div.style.display = 'none';
    }
                
    var getNum = document.getElementById("questions");
    localStorage.setItem("questions", getNum.value);
    var inputNum = localStorage.getItem("questions");

    var getCat = document.getElementById("category");
    localStorage.setItem("category", getCat.value);
    var inputCat = localStorage.getItem("category");

    var req1 = "https://opentdb.com/api.php?";
    var req2 = "amount=" + inputNum;
    var req3 = "&category=" + inputCat;
    var request = req1 + req2 + req3;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        for(var i = 0; i < inputNum; i++) {
            var question = data["results"][i].question;
            var answer = data["results"][i].correct_answer;
            document.getElementById("hiddenQuestions").innerHTML += 
                ((i+1)+ ". " + question + "<br>" + "<i>Answer: " + answer + "</a><br><br>");
        }
        var form1SubmitButton = document.getElementById("form1SubmitButton");
        form1SubmitButton.style.display = 'none';
        var form2SubmitButton = document.getElementById("form2SubmitButton");
        form2SubmitButton.style.display = 'none';
    }
    };
    xhr.open("GET", request, false);
    xhr.send();
}