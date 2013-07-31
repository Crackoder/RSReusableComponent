require './config/config.rb'
require 'sinatra'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/mock_data' do
  Input.create({:name=>"Jhon"})
  Input.find(1).values.create({:name=>"value1"})
  Input.find(1).values.create({:name=>"value2"})
  Input.find(1).values.create({:name=>"value3"})
end

get '/input/:id' do
  Input.find(params[:id]).to_json(:include => :values)
end

post '/input' do
  Input.create({:name=>params[:name]})
end

put '/input/:id' do
  model = JSON.parse(params[:model].to_s)
  input = Input.find(model["id"])
  if input
    input.selected_value = model["selected_value"]
    input.save()
  end
end

delete '/input/:id' do
  Input.destroy(params[:id])
end

get '/value/:id' do
  Value.find(params[:id])
end

post '/value' do
  Value.create({:name=>params[:name]})
end

delete '/value/:id' do
  Value.destroy(params[:id])
end