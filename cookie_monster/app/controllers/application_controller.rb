class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def create_venue
  	keyword = params['keyword']
  	lat = params['lat']
  	lng = params['lng']
  	data = HTTParty.get("https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&client_id=I34KOKW5DI2MSD12IHDY2KKYIT2UDUD2VHDC5WTBWX4TG4SJ&client_secret=1V0VGFUVO10EJ0NL03EJCIDNLVS5FTZC0WWWCSXAWY5UDHF2&v=20150301&query="+keyword
	)
	Pry.start(binding)

	# Store venue id in DB, then link venue id to post id to display posts to specific venues
	# data['response']['groups'][0]['items'][0]['venue']['id'].each do |venue|
	# 	venue
	# end

	# render json here
	# format_to do |format|
	# 	format.json {}

   end



end
