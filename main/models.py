from django.db import models
from django.contrib.auth.models import User
from django.db.models import Count
import datetime

# Create your models here.
#vendor module
class Vendor(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.TextField(null=True)
    mobile=models.PositiveBigIntegerField(unique=True,null=True)
    profile_img=models.ImageField(upload_to='vendor_imgs/',null=True)
    
    def __str__(self):
        return self.user.username
    
    @property
    def show_chart_daily_orders(self):
        orders=OrderItem.objects.filter(product__vendor=self).values('order__order_time__date').annotate(count=Count('id'))
        dateList=[]
        countList=[]
        dataSet={}
        if orders:
            for order in orders:
                dateList.append(order['order__order_time__date'])
                countList.append(order['count'])
        dataSet={'date':dateList,
                 'data':countList
                 }
        return dataSet
    
    @property
    def show_chart_monthly_orders(self):
        orders=OrderItem.objects.filter(product__vendor=self).values('order__order_time__month').annotate(count=Count('id'))
        monthList=[]
        countList=[]
        dataSet={}
        if orders:
            for order in orders:
                monthinteger=order['order__order_time__month']
                month=datetime.date(1900, monthinteger,1).strftime('%B')
                monthList.append(month)
                countList.append(order['count'])
        dataSet={'month':monthList,
                 'data':countList
                 }
        return dataSet
    
    @property
    def show_chart_yearly_orders(self):
        orders=OrderItem.objects.filter(product__vendor=self).values('order__order_time__year').annotate(count=Count('id'))
        yearList=[]
        countList=[]
        dataSet={}
        if orders:
            for order in orders:
                yearList.append(order['order__order_time__year'])
                countList.append(order['count'])
        dataSet={'year':yearList,
                 'data':countList
                 }
        return dataSet
    
    #Total Product
    @property
    def total_products(self):
        product_count=Product.objects.filter(vendor=self).count()
        return product_count
    
                
        
            

#Product Catetory
class ProductCategory(models.Model):
    
    title=models.CharField(max_length=100)
    detail=models.TextField(null=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural='Product Categories'
#Product
class Product(models.Model):
    category=models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,related_name='catogary_product')
    vendor=models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=200)
    slug = models.CharField(max_length=200,unique=True,null=True)
    detail=models.TextField(null=True)
    price=models.FloatField()
    usd_price=models.DecimalField(max_digits=10,decimal_places=2,default=136)
    tags=models.TextField(null=True)
    image=models.ImageField(upload_to='product_imgs/',null=True)
    demo_url=models.URLField(null=True,blank=True)
    product_file=models.FileField(upload_to='product_files/',null=True)
    downloads=models.CharField(max_length=200,default=0,null=True)
    published_status=models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    def tag_list(self):
        if self.tags:
            return self.tags.split(',')
        return []
    def save(self, *args, **kwargs):
        EXCHANGE_RATE = 0.008  # example exchange rate (1 PKR = 0.008 USD)
        if self.price:
            self.usd_price = round(self.price * EXCHANGE_RATE, 2)
        super(Product, self).save(*args, **kwargs)
    

        
    
#customer Model
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='customer')
    mobile=models.PositiveBigIntegerField(unique=True)
    profile_img=models.ImageField(upload_to='customer_imgs/',null=True)

    def __str__(self):
        return self.user.username
    



#Order Model
class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_orders')
    order_time=models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False)
    total_amount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    usd_total_amount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    
    def __str__(self):
        return '%s'% (self.order_time)
   
#Order Item Model
class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='order_items')
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    usd_price=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    
    def __str__(self):
        return self.product.title
    
    class Meta:
        verbose_name_plural='Order Items'
        
    
        
 #CustomerAddress Model   
class CustomerAddress(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_address')
    address=models.TextField()
    default_address=models.BooleanField(default=False)
    
    def __str__(self):
        return self.address
    
    class Meta:
        verbose_name_plural='Customer Addresses'
    
#Product Rating and Review
class ProductRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_rating')
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_rating')
    rating=models.IntegerField()
    review=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural='Product Rating'
    
    def __str__(self):
        return f'{self.rating} - {self.review}'
    
#Product Images Model
class ProductImage(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_imgs')
    image=models.ImageField(upload_to='product_imgs/',null=True)
    
    def __str__(self):
        return self.image.url
    
#Wishtlist Model
class Wishlist(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural='Wish List'
    
    def __str__(self):
        return f"{self.product.title} - {self.customer.user.first_name}"
    
    
