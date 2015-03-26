require 'rubygems'
require 'sinatra'
require 'sinatra/json'
require 'sinatra/reloader' if development?

use Rack::Session::Pool #, :expire_after => 2592000
set :session_secret, 'super secret TMS'

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

get '/api/users.?:format?' do
  users=[
    {id: 1, username: 'rost', name: 'Rost', email: 'rost@mail.com'},
    {id: 22, username: 'jdoe', name: 'John Doe', email: 'jdoe@mail.com'}
  ]
  json users
end

# get the user
get '/api/users/:id' do
  user = {id: params[:id], username: 'rost', name: 'Rost', email: 'rost@mail.com'}
  json user
end

# create new user
post '/api/users' do
  req = parsed_body
  user = {id: rand(10000), username: req['username'], name: req['username'], email: req['email']}
  if req['username'] == 'error'
    status 500
    user[:error]='Some error while creating user'
  end
  json user
end

# User update. Called by UserModel.save()
put '/api/users/:id' do
  req = parsed_body
  user = {id: params[:id], username: 'rost', name: 'Rost', email: 'rost@mail.com'}
  json user
end


get '/api/tests.?:format?' do
  tests=[
    {id: 1, testid: '5.2.1', mode: 'S', company: 'AAA', event: 'NAN Plugtest 5'},
    {id: 2, testid: '5.2.2', mode: 'S', company: 'BBB', event: nil},
    {id: 3, testid: '5.2.3', mode: 'S', company: 'CCC', event: nil},
    {id: 4, testid: '5.2.4', mode: 'S', company: 'DDD', event: nil},
    {id: 5, testid: '5.2.5', mode: 'S', company: 'EEE', event: nil},
    {id: 6, testid: '5.2.6', mode: 'S', company: 'FFF', event: nil},
    {id: 7, testid: '5.2.7', mode: 'S', company: 'GGG', event: nil},
    {id: 8, testid: '5.2.7', mode: 'S', company: nil, event: nil},
    {id: 9, testid: '5.2.7', mode: 'S', company: nil, event: nil},
    {id: 10, testid: '5.2.8a', mode: 'S', company: nil, event: nil},
    {id: 11, testid: '5.2.8b', mode: 'S', company: nil, event: nil},
    {id: 12, testid: '5.2.8c', mode: 'S', company: nil, event: nil},
    {id: 13, testid: '5.2.8d', mode: 'S', company: nil, event: nil},
    {id: 14, testid: '5.2.8e', mode: 'S', company: nil, event: nil},
    {id: 15, testid: '5.2.8f', mode: 'S', company: nil, event: nil},
    {id: 16, testid: '5.2.8g', mode: 'S', company: nil, event: nil},
    {id: 17, testid: '5.2.8h', mode: 'S', company: nil, event: nil},
    {id: 18, testid: '5.2.8i', mode: 'S', company: nil, event: nil},
    {id: 19, testid: '5.2.8j', mode: 'S', company: nil, event: nil},
    {id: 20, testid: '5.2.8k', mode: 'S', company: nil, event: nil},
    {id: 21, testid: '5.2.8l', mode: 'S', company: nil, event: nil},
    {id: 22, testid: '5.2.8m', mode: 'S', company: nil, event: nil},
    {id: 23, testid: '5.2.8n', mode: 'S', company: nil, event: nil},
    {id: 24, testid: '5.2.8o', mode: 'S', company: nil, event: nil},
    {id: 25, testid: '5.2.8p', mode: 'S', company: nil, event: nil},
    {id: 26, testid: '5.2.8q', mode: 'S', company: nil, event: nil},
    {id: 27, testid: '5.2.8r', mode: 'S', company: nil, event: nil},
    {id: 28, testid: '5.2.8s', mode: 'S', company: nil, event: nil},
    {id: 29, testid: '5.2.8t', mode: 'S', company: nil, event: nil}
  ]
  dt=Time.now
  tests.each_with_index do |test, idx|
    test[:date] = (dt + idx*24*60*60).to_i*1000 #+ idx days, *1000 to get in js format (with ms)
  end
  json tests
end

get '/api/tests/:id' do
  test = {id: params[:id], testid: "5.2.#{params[:id]}", mode: 'S'}
  if params[:id] == '1'
    test[:error] = 'Some emulated error message with status 404'
    status 404
  end
  json test
end

#delete test
delete '/api/tests/:id' do
  resp = {id: params[:id]}
  if params[:id] == '1'
    resp[:error] = 'Some Error Message'
    status 500
  end
  json resp
end

post '/api/auth/login' do
  req = parsed_body
  if req['username'] == 'baduser'
    resp = { error: "Invalid username or password."  }
  else
    user = {id: 1,
            name: 'User Name',
            username: "#{req['username']}"
           }
    session[:user] = user
    resp = {user: user}
  end
  json resp
end

post '/api/auth/logout' do
  session.clear
  resp = {success: "User successfully logged out."}
  json resp
end

post '/api/auth/signup' do
  req = parsed_body
  resp = {user: {id: 99, username: req['username'], name: req['name'], email: req['email']}}
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
