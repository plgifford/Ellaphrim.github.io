function setup() {
createFileInput(gotFile, 'multiple');

createCanvas(400, 300);
background(221,160,221);
textAlign(CENTER, CENTER);
textSize(24);
noStroke();
fill(255);
noLoop();
}

var myText = "";

function gotFile(file) {
  createDiv("<center>" + "<h2>" + "File Name: " + file.name + ', File Type: ' + file.type + ', File Size: ' + file.size + 'bytes'+"</h2>" + "</center>");

  // Handle image and text differently
  if (file.type === 'image') {
    createImg(file.data);
  } else if (file.type === 'text') {
  //createDiv(file.data);
    myText = file.data;
    parsing(myText);
    wordCloud(cloudDict);

  }
}
var params = {
    ignoreStopWords: true,
    ignoreCase: true,
    ignorePunctuation: true
  };
var dict = {}
var cloudDict = {}
var tokens = [];
var keys2;
var sentences2;


var wordLength2 = 0;
var wordCount2 = 0;
var charCount2 = 0;
var longestWord2 = "";
var sentenceCount2 = 0;
var wordsPerSentence = 0;
var charPerSentence = 0;
var richRatio = 0;
var counts = 0;



function parsing(text){
  //var tokens = splitTokens(text);
  tokens = text.split(/\W+/);
  var longestWord = "";
  var keys = [];
  var sentences = text.split(".").join("@").split("?").join("@").split("!").join("@").split("...").join("@").split("@");
  var sentenceCount = 0;
  var chars = 0;
  var charcount = 0;






  for (var i = 0; i < sentences.length; i++){
    var b = sentences[i];
    sentenceCount+= b.length;
    charcount += b.length;

  }

  cloudDict = RiTa.concordance(text, params)

  for(var i = 0; i < tokens.length; i++){
    var word = tokens[i]
    word = word.toLowerCase();
      if (tokens[i].length > longestWord.length){
        longestWord = tokens[i];
      }
     if (dict[word] == undefined){
        dict[word] = 1;
        keys.push(word);
      }else{
        dict[word] += 1;
      }

      for(var w = 0; w < word.length; w++){
        var a = word[w];
        chars += word[w].length;
    }


}
keys.sort(compare);

function compare(a, b){
  var countA = dict[a];
  var countB = dict[b];
  return countB - countA;
}


var myTable = "<center><h2>Most frequent words without STOP words</h2>" + "<table>" + "<tr>" + "<td>" + "frequency ranking" + "</td>" + "<td>" + "word" + "</td>" + "<td>" + "percent" + "</td>" + "<td>" + "part of speech" + "</td>" + "</tr>";
var myTable2 = "<center><h2>Least frequent words</h2>" + "<table>" + "<tr>" + "<td>" + "frequency ranking" + "</td>" + "<td>" + "word" + "</td>" + "<td>" + "percent" + "</td>" + "<td>" + "part of speech" + "</td>" + "</tr>";
var myTable3 = "<center><h2>Most frequent words with STOP words</h2>"+"<table>" + "<tr>" + "<td>" + "frequency ranking" + "</td>" + "<td>" + "word" + "</td>" + "<td>" + "percent" + "</td>" + "<td>" + "part of speech" + "</td>" + "</tr>";

var count = 0;
  for (var i = 0; i < keys.length; i++){
    var key = keys[i]
    if(i >= 0 && count <= 19 && key.length >= 3 && key != "a" && key != "the" && key != "i" && key != "the" && key != "and" && key != "it" && key != "he" && key != "his" && key != "of" && key != "to" && key != "was" && key != "she" && key != "you" && key != "in" && key != "that" && key != "her" && key != "t" && key != "s" && key != "said" && key != "with" && key != "have"  && key != "when"  && key != "there" && key != "this" && key != "they" && key != "some" && key != "from" && key != "into" && key != "what" && key != "about" && key != "were" && key != "other" && key != "your" && key != "like" && key != "will" && key != "then" && key != "them" && key != "most" && key != "ever" && key != "theirs" && key != "there" && key != "why" && key != "get" && key != "can" && key != "for" && key != "but" && key != "how" && key != "too" && key != "where" && key != "had" && key != "than" && key != "yet" && key != "would" && key != "did" && key != "only"){
    myTable += "<tr>" + "<td>" + (count+1) + "</td>" + "<td>" + key + "</td>" + "<td>" + ((dict[key]/tokens.length)*100).toFixed(3) + "%" + "</td>" + "<td>" + RiTa.getPosTags(key) + "</td>" + "</tr>";
    count++;

  }else if(i >= 0 && i <= 20){
    myTable3 += "<tr>" + "<td>" + (i+1) + "</td>" + "<td>" + key + "</td>" + "<td>" + ((dict[key]/tokens.length)*100).toFixed(3) + "%" + "</td>" + "<td>" + RiTa.getPosTags(key) + "</td>" + "</tr>";
    }else if(i >= keys.length-20 && i <= keys.length-1){
    myTable2 += "<tr>" + "<td>" + (i+1) + "</td>" + "<td>" + key + "</td>" + "<td>" + ((dict[key]/tokens.length)*100).toFixed(3) + "%" + "</td>" + "<td>" + RiTa.getPosTags(key) + "</td>" + "</tr>";
     }
    }
counts = counts + 1;
myTable = myTable + "</table></center>";
myTable2 = myTable2 + "</table></center>";
myTable3 = myTable3 + "</table></center>"


createDiv("<h2><center>" + "File Specific Stats" + "</center></h2>" +  "<table>" + "<tr>" + "<td>" + "Total Words" + "</td>" + "<td>" + "Total Characters" + "</td>" + "<td>" + "Average Word Length" + "</td>" + "<td>" + "Longest Word" + "</td>" + "<td>" + "Unique Words" + "</td>" + "<td>" + "Vocabulary richness ratio" + "</td>" + "<td>" + "Total Sentences" + "</td>" + "<td>" + "Chars Per Sentence" + "</td>" + "<td>" + "Words per Sentence" + "</td>" + "</tr>" + "<tr>"
+ "<td>" + tokens.length + "</td>" + "<td>" + text.length + "</td>" + "<td>" + (charcount/tokens.length).toFixed(2) + "</td>" + "<td>" + longestWord + "</td>" + "<td>" + keys.length + "</td>" + "<td>" + ((keys.length/tokens.length)*100).toFixed(2) + "</td>" + "<td>" + sentences.length + "</td>" + "<td>" + (text.length/sentences.length).toFixed(2) + "</td>" + "<td>" + (tokens.length/sentences.length).toFixed(2) + "</td>" + "</tr>" + "</table>")

createDiv(myTable);
createDiv("<br>");
createDiv(myTable2);
createDiv("<br>");
createDiv(myTable3);


sentenceCount2 = sentenceCount2 + sentences.length;
charPerSentence = charPerSentence + (text.length/sentences.length)
wordsPerSentence = wordsPerSentence + (tokens.length/sentences.length);
richRatio = richRatio + keys.length/tokens.length;
if (longestWord.length > longestWord2.length){
  longestWord2 = longestWord;
}
charCount2 = charCount2 + text.length;
wordCount2 = wordCount2 + tokens.length
wordLength2 = wordLength2 + charcount/tokens.length;

select("#uniqueWords").html(keys.length);
select("#wordLength").html((wordLength2/counts).toFixed(2));
select("#wordCount").html(wordCount2);
select("#charCount").html(charCount2);
select("#longestWord").html(longestWord2);
select("#richRatio").html(((richRatio/counts)*100).toFixed(2));
select("#sentenceCount").html(sentenceCount2);
select("#charPerSentence").html((charPerSentence/counts).toFixed(2));
select("#wordsPerSentence").html((wordsPerSentence/counts).toFixed(2));




}

function wordCloud(d) {
  for (var k in d) {
    if (d.hasOwnProperty(k)) {
      if (d[k]/tokens.length > 0.002) {
      fill(random(255), 0, random(255));
      textSize((d[k]/tokens.length) * 12000);
      text(k, random(30, width-30), random(30, height-30));
    }
  }
  }
}
