(function(){
	var ds = new Miso.Dataset({
	  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
	  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
	  key : "0An9Q5Mkz4lG7dFBDeG9yTkhmNFpXOVpjcXdxY3JtOXc",
	  worksheet : "1"
	});

	var templ = $('#templ').html(),
		  templFactory = _.template(templ);

	$card_container = $('#card-container');

	var formatHelpers = {
		makeBold: function(text){
			return '<strong>' + text + '</strong>'
		}
	}
	
	ds.fetch({ 
	  success : function() {
	  	var rows = this.toJSON();
	  	_.each(rows, function(val){
	  		_.extend(val, formatHelpers);
	  		var content = templFactory(val);
	  		$card_container.append(content);
	  	});

	  },
	  error : function() {
	    console.log("Are you sure you are connected to the internet?");
	  }
	});
	

}).call(this);