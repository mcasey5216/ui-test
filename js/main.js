var nameScoreHash = {};

var addInput = function() {
  var wrapper = $("#new-games")
  $(wrapper).append(
    '<input type="text" placeholder="Name, score">'
  );
}

var scoreboardSort = function() {
  var scoreboard = [];
  for (var name in nameScoreHash) {
    scoreboard.push([name, nameScoreHash[name]]);
    scoreboard.sort(function(a, b) {return b[1] - a[1]});
  }
  $("#rankings").empty();
  var rank = 0;
  var lastScore = 0;
  var rankSkip = 0;
  for (i = 0; i < scoreboard.length; i++) {
    if (scoreboard[i][1] !== lastScore) {
      rank = rank + rankSkip + 1;
      rankSkip = 0;
    } else {
      rankSkip += 1;
    }
    lastScore = scoreboard[i][1];
    $("#rankings").append(
      "<li>"
      + rank
      + ". "
      + scoreboard[i][0]
      + ", "
      + scoreboard[i][1]
      + " pts</li>"
    );
  }
}

$("#add-game").click(function() {
  addInput();
});

$("#add").click(function() {
  var games = $("#new-games").find("input")
  games.each(function(){
    var nameScore = $(this).val();
      if (nameScore) {
        var nameScoreArray = nameScore.split(", ");
        if (nameScoreArray.length === 2) {
          var score = parseInt(nameScoreArray[1]);
            if (!isNaN(score)){
              if (nameScoreHash[nameScoreArray[0]] === undefined) {
                nameScoreHash[nameScoreArray[0]] = score;
              } else {
                nameScoreHash[nameScoreArray[0]] += score;
              }
            } else {
              alert("score is not a number");
            }
        } else {
          alert("wrong format");
        }
      } else {
        alert("must fill in all forms");
      }
  });
  $("div#new-games > input").remove();
  addInput();
  scoreboardSort();
});

$("#clear").click(function() {
  nameScoreHash = {};
  $("#rankings").empty();
  $("input").val('');
});
