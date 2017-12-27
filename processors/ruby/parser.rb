# require_relative 'communication'
require_relative 'com'

com = Communication.new
com.send 'connected'
com.listen  
