window.onload = function(){
   let searchButton = $("#search-button");
   let searchBar    = $("#search-bar");
   let result       = $("#result");
   let getAllButton = $("#get-all");
   
   let httpRequest;
   let xmlRequest;
   let url;
   let searchTerm;
    
    searchButton.on("click",function(element){
        element.preventDefault();
        searchTerm   = fetchSearchTerm().toLocaleLowerCase().trim();//Ignore casing and whitespace at beginning and end of string
        url          = "https://info2180-lab6-avaughnprende.c9users.io/request2.php?q=";
        httpRequest  = new XMLHttpRequest();
        httpRequest.onreadystatechange = alertDef;
        httpRequest.open('GET',url + searchTerm,true);
        httpRequest.send();
    });
    
    function alertDef(){
        if (!(fetchSearchTerm()==='')){//Don't send AJAX request if the search bar is empty
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
    }
 
    getAllButton.on("click", function(element){
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
                result.empty();//Claer the div before entering new data
                createList();
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
    
    function callback(string){
        result.html(string);
    }
    
     function fetchSearchTerm(){
        return document.getElementById("search-bar")[0].value;
    }
    
    function searchResultFound(string){
        return !string.endsWith("<p></p>");
    }
};