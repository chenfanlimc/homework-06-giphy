
var topics = ["final fantasy", "jumanji", "john wick", "friday", "sunshine", "cat", "disney"];

$(document).ready(function () {
    //setting the initial topic buttons
    createTopic();

    //function to create topic buttons, used to create new topic buttons as well
    function createTopic() {
        $(".topic-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("topic-button");
            newButton.attr("data-value", topics[i]);
            newButton.text(topics[i]);
            $(".topic-buttons").append(newButton);
        }
        buttonRender();
    }

    //on click event for adding topics, which captures input field value, puts it into topic array, and recreats topic buttons
    $("#add-topic").on("click", function (response) {
        response.preventDefault();
        var newTopic = $("#topic-input").val().trim()
        //only send new topic if input field has trimmed value
        if (newTopic) {
            topics.push(newTopic);
            createTopic();
        } else {
            return;
        }
    })

    //adds functionality to buttons, making ajax call to get the appropriate gifs
    function buttonRender() {
        $("button").on("click", function () {
            var topic = $(this).data("value");
            console.log(topic);
            var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=sujw6VeMNKiA2XD2Nuz2tlP0qKK88gWX&limit=10"

            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
                //create gifs, give them the required data attributes, prepend them to page
                var objectData = response.data;
                for (var i = 0; i < objectData.length; i++) {
                    console.log(objectData)
                    var rating = $("<div>");
                    rating.addClass("col-md-12");
                    rating.text("Rating: " + (objectData[i].rating).toUpperCase());
                    $(".gifs").prepend(rating);
                    var newGif = $("<img>");
                    newGif.addClass("gif");
                    newGif.attr("src", objectData[i].images.downsized_still.url);
                    newGif.attr("data-still", objectData[i].images.downsized_still.url);
                    newGif.attr("data-animate", objectData[i].images.downsized_medium.url);
                    newGif.attr("data-state", "still");
                    $(".gifs").prepend(newGif);
                }

                //animate vs stop gifs
                $(".gif").on("click", function () {
                    if ($(this).attr("data-state") === "still") {
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", $(this).attr("data-animate"));
                    } else if ($(this).attr("data-state") === "animate") {
                        $(this).attr("data-state", "still");
                        $(this).attr("src", $(this).attr("data-still"));
                    }
                })

            })
        })
    }


})