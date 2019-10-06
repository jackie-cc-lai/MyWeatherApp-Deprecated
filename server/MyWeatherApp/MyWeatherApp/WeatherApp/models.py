from django.db import models

class CurrentWeather(models.Model):
    created = models.DateTimeField(auto_now=True)
    weather = models.CharField(max_length = 50)
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)
    speed = models.DecimalField(max_digits=7, decimal_places=2)
    deg = models.DecimalField(max_digits=7, decimal_places=2)
    temp=models.DecimalField(max_digits=5,decimal_places=2)
    temp_max=models.DecimalField(max_digits=5,decimal_places=2)
    temp_min=models.DecimalField(max_digits=5,decimal_places=2)
    icon=models.CharField(max_length=3)

    class Meta:
        ordering = ['created']