var on=false;
var divel = document.getElementById('clouddiv');
divel.style.visibility='hidden';
var skrollsRef = new Firebase('https://skrollsapp.firebaseio.com/skrolls');
skrollsRef.once('value', function(dataSnapshot) {
	var eliminate = ["an", "is", "a", "of", "and", "in", "I", "for", "not", "the", "be", "to", "it", "for", "not", "on", "he", "as", "at", "do", "by", "you", "but", "his", "we", "her", "she", "or", "my", "so", "if", "go", "me", "no", "him", "its", "us", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var buf = " ";
	dataSnapshot.forEach(function(skrollData) {
		skrollData.child('posts').forEach(function(post) {
			var temp =post.child('text').val().replace(/\W/g, ' ');
			for (var el in eliminate) {
				var re = new RegExp('\\b' + eliminate[el] + '\\b','gi');
				temp = temp.replace(re, ' ');
			}
			buf += temp + " ";
		});
	});
	up(buf);
});
var up = function(buf) {
	var skrollsWords = [];
	var str = buf;
	var temp = str.split(" ").filter(Boolean);
	while(temp.length > 0) {
		var re = new RegExp('\\b' + temp[0] + '\\b','gi');
		var count = str.match(re).length;
		skrollsWords.push({text: temp[0], size: count});
		str = str.replace(re, '');
		temp = str.split(" ").filter(Boolean);
	}
	var fill = d3.scale.category10();
	  var width = window.innerWidth;
	  var height = window.innerHeight;
	  //console.log("width: %s, height: %s", width, height);
	  width= width*0.8;
	  height= height*0.8;
	  d3.layout.cloud().size([width, height])
		  .words(skrollsWords)
		  .padding(2)
		  .rotate(function() { return ~~(Math.random() * 2) * 90; })
		  .font("Arial")
		  .fontSize(function(d) { return d.size * 5; })
		  .on("end", draw)
		  .start();

	  function draw(words) {
		d3.select("div").append("svg")
			.attr("position","fixed")
			.attr("display","block")
			.attr("margin","auto")
			.attr("margin-top","50px")
			.attr("top","0")
			.attr("bottom","0")
			.attr("left","0")
			.attr("right","0")
			.attr("width", "90%")
			.attr("height", "90%")
		  .append("g")
			.attr("transform", "translate("+55*width/100+","+55*height/100+")")
		  .selectAll("text")
			.data(words)
		  .enter().append("text")
			.style("font-size", function(d) { return d.size + "px"; })
			.style("font-family", "Arial")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
			  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.text; });
	  }
}
var gocloud = function(){
	if(on==false){
		on=true;
		divel.style.visibility='visible';
	}
	else {
		on=false;
		divel.style.visibility='hidden';
	}
}