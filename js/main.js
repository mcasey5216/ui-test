// on click ever of add ranking
//   method to parse name and score
//   put it into an hash of name and score
//   if name exists add to score
//   order by score
//   append to li

var nameScoreHash = {};

$("#add").click(function(){
  var nameScore = $("input").val();
  var nameScoreArray = nameScore.split(", ");
  if (nameScoreHash[nameScoreArray[0]] === undefined) {
    nameScoreHash[nameScoreArray[0]] = parseInt(nameScoreArray[1]);
  } else {
    nameScoreHash[nameScoreArray[0]] += parseInt(nameScoreArray[1]);
  }
  var scoreboard = [];
  for (var name in nameScoreHash) {
    scoreboard.push([name, nameScoreHash[name]]);
    scoreboard.sort(function(a, b) {return b[1] - a[1]});
  }
  $("#rankings").empty();
  for (i = 0; i < scoreboard.length; i++) {
    $("#rankings").append(
      "<li>"+ scoreboard[i][0] + ", " + scoreboard[i][1] + " pts</li>"
    );
  }
});

$("#clear").click(function(){
  nameScoreHash = {};
  $("#rankings").empty();
});

var scoreboardSort
