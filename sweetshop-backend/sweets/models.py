from django.db import models
class Sweet(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    
    # This will be the "quantity in stock"
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name