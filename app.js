let httpRequest;
let xmlRequest;
let searchButton;
let url;
let response;
let searchTerm
let fetchSearchTerm
let a;

window.onload = function(){
   let searchButton = $("#search-button");
   let searchBar    = $("#search-bar");
   let result       = $("#result");
   let searchTerm;
    
    searchButton.on("click",function(element){
        element.preventDefault();
        searchTerm   = fetchSearchTerm().toLocaleLowerCase();
        url          = "https://info2180-lab6-avaughnprende.c9users.io/request2.php?q=";
        httpRequest  = new XMLHttpRequest();
        httpRequest.onreadystatechange = alertDef;
        httpRequest.open('GET',url + searchTerm,true);
        httpRequest.send();
        
    });
    
    function alertDef(){
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                if(searchResultFound(httpRequest.responseText)){
                    callback(httpRequest.responseText);
                }
                else{
                    callback("'" + searchTerm +  "'" + " NOT FOUND");
                }
            }
        }
    }
  
    function callback(string){
        result.html(string);
    }
    
    /*
    function stripTags(string){
        string = string.replace("<p>","");
        string = string.replace("</p>","\n");
        string = string.replace("<h3>","");
        string = string.replace("</h3>","\n");
        return string;
    }
    */
    
     fetchSearchTerm = function(){
        return document.getElementById("search-bar")[0].value;
    }
    
    function searchResultFound(string){
        return !string.endsWith("<p></p>");
    }
    
    
    $("#get-all").on("click", function(element){
        element.preventDefault();
        url                            = "https://info2180-lab6-avaughnprende.c9users.io/request.php?q=&all=true";
        xmlRequest                     = new XMLHttpRequest();
        xmlRequest.onreadystatechange  = displayAllDefinitions;
        xmlRequest.open('GET',url,true);
        xmlRequest.send();
        
    });
    
    function displayAllDefinitions(){
        if(xmlRequest.readyState === XMLHttpRequest.DONE){
            if(xmlRequest.status === 200){
                result.empty();
               createList();
            }
            else{
            }
        }
    }
    
    function createList(){
        let definitions = xmlRequest.responseXML.querySelectorAll("#result");
        for(let i=0;i<definitions.length;i++){
            let defData  = definitions[i].textContent;
            let defTerm  = definitions[i].getAttribute("name").toLocaleUpperCase();
            let author   = definitions[i].getAttribute("author");
            let content  = $(`<h3>${i+1}. ${defTerm}</h3><p>${defData}<br>-- ${author}</p>`);
            result.append(content);
        };
    }
};