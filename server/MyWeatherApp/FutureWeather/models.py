from django.db import models

# Create your models here.
class FutureWeather(models.Model):
    created = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)
	
    date1=models.DecimalField(max_digits=5,decimal_places=2)
    temp_max1=models.DecimalField(max_digits=5,decimal_places=2)
    temp_min1=models.DecimalField(max_digits=5,decimal_places=2)
    icon1=models.CharField(max_length=3)
	
	date2=models.DecimalField(max_digits=5,decimal_places=2)
	temp_max2=models.DecimalField(max_digits=5,decimal_places=2)
    temp_min2=models.DecimalField(max_digits=5,decimal_places=2)
    icon2=models.CharField(max_length=3)
	
	date3=models.DecimalField(max_digits=5,decimal_places=2)
	temp_max3=models.DecimalField(max_digits=5,decimal_places=2)
    temp_min3=models.DecimalField(max_digits=5,decimal_places=2)
    icon3=models.CharField(max_length=3)

    class Meta:
        ordering = ['created']