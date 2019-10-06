from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from WeatherApp.models import CurrentWeather
from WeatherApp.serializers import CurrentWeatherSerializer
import json
import requests
import datetime

api_key = '17f3727df7e8ee33eeb4cf528bd3edc7'
# Create your views here.       
@csrf_exempt
def weather_detail(request, pk):
    """
    Retrieve, update or delete a code weather.
    """
    try:
        weather=CurrentWeather.objects.get(id=pk)
        time_passed = datetime.datetime.now() - weather.created
        print(datetime.datetime.now())
        print(weather.created)
        print(time_passed)
        if (time_passed.total_seconds())/60 > 30:
            print(time_passed.total_seconds())
            print("Time to update")
            print(weather.deg)
            preweather =requests.get('http://api.openweathermap.org/data/2.5/weather?id=' + str(pk) + '&APPID=' + api_key + '&units=metric')
            jsdata = preweather.json()
            weather.weather =jsdata['weather'][0]['main']
            weather.speed = round(jsdata['wind']['speed'],2)
            weather.deg=round(jsdata['wind']['deg'], 2)
            weather.temp=jsdata['main']['temp']
            weather.temp_min=jsdata['main']['temp_min']
            weather.temp_max=jsdata['main']['temp_max']
            weather.icon=jsdata['weather'][0]['icon']
            weather.created=datetime.datetime.utcnow()
            weather.save()
    except CurrentWeather.DoesNotExist:
        print("We need to find it")
        preweather =requests.get('http://api.openweathermap.org/data/2.5/weather?id=' + str(pk) + '&APPID=' + api_key + '&units=metric')
        jsdata = preweather.json()
        weatherdata =jsdata['weather'][0]['main']
        spddata = round(jsdata['wind']['speed'],2)
        degdata=round(jsdata['wind']['deg'],2)
        temp=jsdata['main']['temp']
        temp_min=jsdata['main']['temp_min']
        temp_max=jsdata['main']['temp_max']
        name=jsdata['name']
        id=jsdata['id']
        icon=jsdata['weather'][0]['icon']
        updateTime=datetime.datetime.utcnow()
        data={
            'weather':weatherdata,
            'deg':degdata,
            'temp_max':temp_max,
            'temp':temp,
            'temp_min':temp_min,
            'id':id,
            'icon':icon,
            'name':name,
            'speed':spddata,
            'deg':degdata,
            'created':updateTime,
        }
        weather = CurrentWeatherSerializer(data=data)
        print(weather.is_valid())
        print(weather)
        if weather.is_valid():
            weather.save()

    if request.method == 'GET':
        serializer = CurrentWeatherSerializer(weather)
        return JsonResponse(serializer.data)
        
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CurrentWeatherSerializer(weather, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        weather.delete()
        return HttpResponse(status=204)
        