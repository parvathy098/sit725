
$(document).ready(function () {
 
    $('#submit').click(() => {
  
        $.ajax({url: "index.html", success: function(result){
            alert("You clicked on Healthy Recipies!")
       
       }});
    })

    $('#clickMeButton2').click(() => {
  
        $.ajax({url: "index.html", success: function(result){
            alert("You clicked on Simple Exercises!")
       
       }});
    })
    $('#clickMeButton3').click(() => {
  
        $.ajax({url: "index.html", success: function(result){
            alert("You clicked on Motivation for Life!")
       
       }});
    })
    
});
