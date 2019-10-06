from django.urls import path
from WeatherApp import views

urlpatterns = [
    path('WeatherApp/<int:pk>/', views.weather_detail),
]