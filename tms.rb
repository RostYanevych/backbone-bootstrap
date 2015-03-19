require 'rubygems'
require 'sinatra'
require "sinatra/json"
require 'sinatra/reloader' if development?

set :public_folder, 'public'
#set :static, true
#set :sessions, true
#enable :sessions
use Rack::Session::Pool #, :expire_after => 2592000
set :session_secret, 'super secret TMS'

#use Rack::Session::Cookie, :key => 'rack.session',
#                           :domain => 'foo.com',
#                           :path => '/',
#                           :expire_after => 2592000, # In seconds
#                           :secret => 'change_me'

#before filter
before do
end

#after filter
after do
end

get '/' do
  send_file File.expand_path('index.html', 'views')
end

# GET auth
# @desc: checks a user's auth status based on cookie
get '/api/auth' do
  if session[:user]
    resp = {user: session[:user]}
  else
    resp = {error: "Client has no valid login cookies."}
  end
  json resp
end

post '/logout' do
  session[:user]=nil
  session.clear
  resp = {success: "User successfully logged out."}
  json resp
end

get '/users.?:format?' do
  users=[
    {id: 1, name: 'Rost', email: 'rost@mail.com'},
    {id: 2, name: 'John Doe', email: 'jdoe@mail.com'}
  ]
  json users
end

post '/api/auth/login' do
  req = parsed_body
  user = {id: 1,
          name: req['username'],
          username: "#{req['username']}|#{req['password']}"
         }
  session[:user] = user
  resp = {user: user}
  json resp
end

post '/api/auth/logout' do
  resp = {success: "User successfully logged out."}
  json resp
end

helpers do
  def parsed_body
    return nil unless request.accept?('application/json')
    return nil if request.body.size == 0
    request.body.rewind
    ::MultiJson.decode(request.body)
  end
end