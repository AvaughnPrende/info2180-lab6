window.onload = function(){
    let httpRequest;
    let searchButton;
    let url;
    
    searchButton = $("#search-button");
   
    
    searchButton.click(function(element){
        element.preventDefault();
        url          = "request.php";
        httpRequest  = new XMLHttpRequest();
        httpRequest.onreadystatechange = alertDef;
        httpRequest.open('GET',url);
        httpRequest.send();
        
    })
    
    function alertDef(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                alert(response);
            }
        }
        else{
            alert("READY STATE: " + httpRequest.readyState + "   --- STATUS: " + httpRequest.status);
        }
    }
}   