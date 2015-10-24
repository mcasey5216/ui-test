// on click ever of add ranking
//   method to parse name and score
//   put it into an hash of name and score
//   if name exists add to score
//   order by score
//   append to li

var nameScoreHash = {};

var addInput = function() {
  var wrapper = $("#new-games")
  $(wrapper).append(
    '<input type="text" placeholder="Name, score"><br>'
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

$("#add").click(function(){
  var games = $("#new-games").find("input")
  games.each(function(){
    var nameScore = $(this).val();
    var nameScoreArray = nameScore.split(", ");
    if (nameScoreHash[nameScoreArray[0]] === undefined) {
      nameScoreHash[nameScoreArray[0]] = parseInt(nameScoreArray[1]);
    } else {
      nameScoreHash[nameScoreArray[0]] += parseInt(nameScoreArray[1]);
    }
  })
  $("div#new-games > input").remove();
  addInput();
  scoreboardSort();
});

$("#clear").click(function(){
  nameScoreHash = {};
  $("#rankings").empty();
  $("input").val('');
});
