$(function(){
    $(".change-devoured").on("click", function(event){
        var id = $(this).data("id");
        var newDevoured = 1;

        var newDevouredState = {
            devoured: newDevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function(){
                console.log("changed devoured to", newDevoured);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event){
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bu").val().trim(),
            devoured: 0
        };

        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("created a new burger");
                location.reload();
            }
        );
    });
});