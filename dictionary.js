window.onload = function(){
    let searchButton = document.querySelector("#search-button");
    let url = "https://info2180-lab6-avaughnprende.c9users.io/request.php";
    
    searchButton.addEventListener("click", function(){
        let httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === httpRequest.DONE && httpRequest.status === 200){
                let response = httpRequest.responseText;
                alert(response);
            }
            else{
                alert("Ready State: " + httpRequest.readyState + "--- Status: " + httpRequest.status);
            }
        }
        httpRequest.open("GET", url,true);
        httpRequest.send();
    })
}