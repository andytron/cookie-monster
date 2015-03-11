jQuery(function(){
	$('.like_post').on('click', function(event) {
		event.preventDefault();
		var id = $(event.target).data('id');
		$.ajax({
			url: '/likes',
			type: 'POST',
			data: {like: {post_id: id}},
			success: function(result) {
				
			}
		})
	})
})