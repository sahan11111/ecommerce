from rest_framework import serializers
from django.contrib.auth.models import User
from .import models

class VendorSerializer(serializers.ModelSerializer):
    total_downloads = serializers.IntegerField(read_only=True)
    category = serializers.SerializerMethodField()
    class Meta:
        model = models.Vendor
        fields = ['id','user', 'address','mobile','profile_img','total_downloads','category']
        
    def get_category(self, obj):
        category = models.ProductCategory.objects.filter(catogary_product__vendor=obj)
        return CategoryDetailSerializer(category, many=True).data
        
    def __init__(self, *args,**kwargs ):
        super(VendorSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1
        
class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user', 'address','mobile','profile_img','total_products']
        
    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        return response
class VendorDailyReport(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user', 'address','show_chart_daily_orders','show_chart_monthly_orders','show_chart_yearly_orders']

class ProductListSerializer(serializers.ModelSerializer):
    tag_list = serializers.SerializerMethodField()
    product_rating=serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model = models.Product
        fields = ['id','category','vendor','title','slug','tag_list','detail','price','usd_price','product_rating','image','product_file','tags','published_status','downloads']
        
    def tag_list(self, obj):
        return obj.tags.split(',') if obj.tags else []
        
    def __init__(self, *args,**kwargs ):
        super(ProductListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth =1
    # def to_representation(self, instance):
    #     response=super().to_representation(instance)
    #     response['vendor']=VendorSerializer(instance.vendor).data
    #     return response
        
        
        
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductImage
        fields = ['id', 'product', 'image']
       
class ProductDetailSerializer(serializers.ModelSerializer):
    product_imgs = ProductImageSerializer(many=True, read_only=True)
    tag_list = serializers.SerializerMethodField()
    product_rating = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = models.Product
        fields = ['id', 'category', 'vendor', 'title', 'slug','tag_list', 'detail', 'price', 'usd_price','product_rating', 'product_imgs','demo_url','image','product_file','downloads','published_status','tags']  
    
    def tag_list(self, obj):
        return obj.tags.split(',') if obj.tags else []
       
    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self).__init__(*args, **kwargs)

        # self.Meta.depth =1

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name','username','email','password']
        

        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile','profile_img']
        
    def __init__(self, *args,**kwargs ):
        super(CustomerSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1

        
class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile','customer_orders','profile_img']
        
    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        return response
        
    # def __init__(self, *args,**kwargs ):
    #     super(CustomerDetailSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth =1
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'customer','order_status','total_amount','usd_total_amount']
    # def __init__(self, *args,**kwargs ):
    #     super(OrderSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth =1 
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = ['id','order','product','qty','price','usd_price']
        

        
class CustomerOrderItemSerializer(serializers.ModelSerializer):
    order=OrderSerializer()
    product=ProductDetailSerializer()
    class Meta:
        model = models.OrderItem
        fields = ['id','order','product','qty','price','usd_price']
        

#Vendor CustomerList and VendorOrderItem list
class CustomerOrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    class Meta:
        model = models.Order
        fields = ['id', 'customer','order_status','total_amount','usd_total_amount','payment_mode','trans_ref']        
class VendorOrderItemSerializer(serializers.ModelSerializer):
    order=CustomerOrderSerializer()
    product=ProductDetailSerializer()
    class Meta:
        model = models.OrderItem
        fields = ['id','order','product','qty','price','usd_price',]
        
#vendor customer orderitem list
class VendorCustomerOrderItemSerializer(serializers.ModelSerializer):
    order=CustomerOrderSerializer()
    product=ProductDetailSerializer()
    class Meta:
        model = models.OrderItem
        fields = ['id','order','product','qty','price','usd_price']
        
#Order Detail     
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = '__all__' 
        
    def __init__(self, *args,**kwargs ):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth =1
        
#customer Address 
class CustomerAddressSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=models.Customer.objects.all())
    class Meta:
        model = models.CustomerAddress
        fields = ['id','address','customer','default_address']
        
    # def to_representation(self, instance):
    #     response=super().to_representation(instance)
    #     response['customer']=CustomerDetailSerializer(instance.customer).data
    #     return response 
        
    def __init__(self, *args,**kwargs ):
        super(CustomerAddressSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1
        
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id','customer','product','rating','review','add_time'] 
        
    def __init__(self, *args,**kwargs ):
        super(ProductRatingSerializer, self).__init__(*args, **kwargs)
        
    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['customer']=CustomerSerializer(instance.customer).data
        response['product']=ProductDetailSerializer(instance.product).data
        return response

#Category Serializer     
class CategorySerializer(serializers.ModelSerializer):
    total_downloads = serializers.IntegerField(read_only=True)
    class Meta:
        model = models.ProductCategory
        fields = ['id','title', 'detail','image','total_downloads']
        
    def __init__(self, *args,**kwargs ):
        super(CategorySerializer, self).__init__(*args, **kwargs)

        
class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title', 'detail']
        
    def __init__(self, *args,**kwargs ):
        super(CategoryDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1


#Whistlist of Customer
class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Wishlist
        fields=['id','customer','product']
        
    def __init__(self, *args,**kwargs ):
        super(WishlistSerializer, self).__init__(*args, **kwargs)
    
    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['customer']=CustomerSerializer(instance.customer).data
        response['product']=ProductDetailSerializer(instance.product).data
        return response
    
    

    
