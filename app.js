window.onload = function(){
    let httpRequest;
    let searchButton;
    let url;
    let response;
    
    searchButton = $("#search-button");
   
    
    searchButton.on("click",function(element){
        element.preventDefault();
        url          = "https://info2180-lab6-avaughnprende.c9users.io/request.php?q=definition";
        httpRequest  = new XMLHttpRequest();
        httpRequest.onreadystatechange = alertDef;
        httpRequest.open('GET',url);
        httpRequest.send();
        
    })
    
    function alertDef(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                let x = httpRequest.repsonseText;
                alert(x);
            }
        }
        else{
            //alert("READY STATE: " + httpRequest.readyState + "   --- STATUS: " + httpRequest.status);
        }
    }
}   