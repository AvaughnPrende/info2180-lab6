let httpRequest;
let searchButton;
let url;
let response;
let searchTerm
let fetchSearchTerm

window.onload = function(){
   let searchButton = $("#search-button");
   let searchBar    = $("#search-bar");
   
    
    searchButton.on("click",function(element){
        searchTerm = fetchSearchTerm();
        element.preventDefault();
        url          = "https://info2180-lab6-avaughnprende.c9users.io/request.php?q=";
        httpRequest  = new XMLHttpRequest();
        httpRequest.onreadystatechange = alertDef;
        httpRequest.open('GET',url + searchTerm,true);
        httpRequest.send();
        response = httpRequest.responseText;
        
    })
    
    function alertDef(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                callback(httpRequest.responseText);
            }
        }
        else{
            //alert("READY STATE: " + httpRequest.readyState + "   --- STATUS: " + httpRequest.status);
        }
    }
  
    function callback(string){
        alert(stripTags(string));
    }
    
    function stripTags(string){
        string = string.replace("<p>","");
        string = string.replace("</p>","\n");
        string = string.replace("<h3>","");
        string = string.replace("</h3>","\n");
        return string;
    }
    
     fetchSearchTerm = function(){
        return document.getElementById("search-bar")[0].value;
    }
    
    
    
    
    
    
    
    
    
    
    
}   