from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Vendor)
admin.site.register(models.ProductCategory)
# admin.site.register(models.Product)
class CustomerAdmin(admin.ModelAdmin):
    list_display=['get_username','mobile']
    def get_username(self,obj):
        return obj.user.username
admin.site.register(models.Customer,CustomerAdmin)
# admin.site.register(models.OrderItem)
admin.site.register(models.CustomerAddress)
# admin.site.register(models.ProductRating)
admin.site.register(models.ProductImage)

class ProductImageInline(admin.StackedInline):
    model = models.ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    list_display=['title','price','usd_price','downloads']
    list_editable=['usd_price']
    prepopulated_fields = {'slug': ('title',)}  # Only if slug field exists in model
    inlines = [ProductImageInline]
admin.site.register(models.Product, ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display=['id','customer','order_time','total_amount','usd_total_amount','order_status']
admin.site.register(models.Order, OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    list_display=['id','order','product','qty','price','usd_price']
admin.site.register(models.OrderItem, OrderItemAdmin)

class WishlistAdmin(admin.ModelAdmin):
    list_display=['id','product','customer']
admin.site.register(models.Wishlist, WishlistAdmin)

class ProductRatingAdmin(admin.ModelAdmin):
    list_display=['id','product','customer','review','rating','add_time']
admin.site.register(models.ProductRating, ProductRatingAdmin)

