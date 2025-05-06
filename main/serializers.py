from rest_framework import serializers
from django.contrib.auth.models import User
from .import models

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user', 'address']
        
    def __init__(self, *args,**kwargs ):
        super(VendorSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1
        
class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vendor
        fields = ['id','user', 'address']
        
    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        return response

class ProductListSerializer(serializers.ModelSerializer):
    tag_list = serializers.SerializerMethodField()
    product_rating=serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model = models.Product
        fields = ['id','category','vendor','title','slug','tag_list','detail','price','usd_price','product_rating','image','product_file','tags','published_status']
        
    def tag_list(self, obj):
        return obj.tags.split(',') if obj.tags else []
        
    def __init__(self, *args,**kwargs ):
        super(ProductListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth =1
        
        
        
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
        fields = ['id', 'customer','order_status','total_amount','usd_total_amount']        
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
        fields = '__all__' 
        
    def __init__(self, *args,**kwargs ):
        super(ProductRatingSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1

#Category Serializer     
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductCategory
        fields = ['id','title', 'detail']
        
    def __init__(self, *args,**kwargs ):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        self.Meta.depth =1
        
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
    
