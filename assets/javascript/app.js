
var topics = ["anime", "movies", "tv shows", "video games", "books", "board games", "music"];
$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("topic-button");
        newButton.attr("data-value", topics[i]);
        newButton.text(topics[i]);
        $(".topic-buttons").append(newButton);
    }

    $("button").on("click", function () {
        var topic = $(this).data("value");
        console.log(topic);
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=sujw6VeMNKiA2XD2Nuz2tlP0qKK88gWX&limit=10"

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            var objectData = response.data;
            for(var i = 0; i < objectData.length; i++) {
                console.log(objectData)
                console.log(objectData[i].images.downsized_still.url);
                var newGif = $("<img>");
                newGif.attr("src", objectData[i].images.downsized_still.url);
                newGif.attr("data-still", objectData[i].images.downsized_still.url);
                newGif.attr("data-animate", objectData[i].images.downsized_medium.url);
                newGif.attr("data-state", "still");
                $(".gifs").prepend(newGif);
            }
        })
    })

})