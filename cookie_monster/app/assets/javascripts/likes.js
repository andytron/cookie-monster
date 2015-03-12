jQuery(function(){
	$('.like_post').on('click', function(event) {
		event.preventDefault();
		var url = $(event.target).attr('href');
		$.ajax({
			url: url,
			type: 'GET',
			success: function(result) {
				
				// if(liked turn red){
					$(this).css({'color': 'red'});
				// } else(keep like link same color) {

				// }
			}.bind(this)
		})
	})
})