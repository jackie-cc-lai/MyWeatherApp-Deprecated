from rest_framework import serializers
from WeatherApp.models import CurrentWeather


class CurrentWeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentWeather
        fields = ['id', 'weather', 'name', 'speed','deg','temp','temp_max','temp_min','icon', 'created']