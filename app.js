$(document).ready(function(){
    let searchButton = $("#search-button");
    let url = "request.php";
    
    searchButton.on("click",function(){
        $.ajax(url,
        {
            success: function(){
                alert("SUCCESS");
            },
            error: function(){
                alert("FAILURE");
            }
        })
    })
})
       