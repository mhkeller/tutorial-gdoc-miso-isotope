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

	function bakeRows(rows){
  	_.each(rows, function(val){
  		_.extend(val, formatHelpers);
  		var content = templFactory(val);
  		$card_container.append(content);
  	});
	};

	function initIsotope(){
		$card_container.imagesLoaded( function(){
			$card_container.isotope({ 
				item: '.item-row'
			});
		});
	}

	$('.item-filter').click(function(){
		var is_active = $(this).hasClass('active');
		if(is_active == false){
			$('.item-filter.active').removeClass('active');
			$(this).addClass('active');
			var filter_by = $(this).data('filter');
			$card_container.isotope({filter: filter_by});
		}else{
			return false
		}
	});
	
	ds.fetch({ 
	  success : function() {
	  	var rows = this.toJSON();
	  	bakeRows(rows);
	  	initIsotope();

	  },
	  error : function() {
	    console.log("Are you sure you are connected to the internet?");
	  }
	});
	

}).call(this);