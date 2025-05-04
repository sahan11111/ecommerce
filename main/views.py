from django.shortcuts import render
from .import serializers
from rest_framework import generics,permissions,status,pagination,viewsets
from .import models
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


# Create your views here.
class VendorList(generics.ListCreateAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer
    # permission_classes=[
    #     permissions.IsAuthenticated
    # ]
class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer
    # permission_classes=[
    #     permissions.IsAuthenticated
    # ]

@csrf_exempt   
def vendor_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)  # This will work with hashed passwords
    
    if user:
        vendor = models.Vendor.objects.get(user=user)
        msg = {
            'bool': True,
            'user': user.username,
            'id': vendor.id
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Invalid Username or Password'
        }
    
    return JsonResponse(msg)


@csrf_exempt   
def vendor_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')  
    username = request.POST.get('username')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    address = request.POST.get('address')
    password = request.POST.get('password')
    
    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
        )
        # Hash the password before saving
        user.set_password(password)
        user.save()
        
        # Create vendor
        try:
            vendor = models.Vendor.objects.create(
                user=user,
                mobile=mobile,
                address=address,
            )
            msg = {
                'bool': True,
                'user': user.id,
                'vendor_id': vendor.id,
                'msg': 'Registration Successful! You can log in now.'
            }
        except IntegrityError:
            msg = {
                'bool': False,
                'msg': 'Mobile already exists!'
            }
    except IntegrityError:
        msg = {
            'bool': False,
            'msg': 'Username already exists!'
        }

    return JsonResponse(msg)

    
class ProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination
    def get_queryset(self):
        qs = super().get_queryset()

        if 'category' in self.request.GET:
            try:
                category_id = self.request.GET.get('category')
                category = models.ProductCategory.objects.get(id=category_id)
                qs = qs.filter(category=category)
            except models.ProductCategory.DoesNotExist:
                qs = qs.none()  # Return empty queryset if category is invalid

        if 'fetch_limit' in self.request.GET:
            try:
                limit = int(self.request.GET.get('fetch_limit'))
                qs = qs[:limit]
            except ValueError:
                pass  # fallback to unfiltered qs if limit is invalid

        return qs   
    
    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     if 'category' in self.request.GET:
    #         category = self.request.GET.get('category')  # Get category_id from query params
    #         category=models.ProductCategory.objects.get(id=category)
    #         qs = qs.filter(category=category)  # Filter by category_id
    #         return qs 
    #     if 'fetch_limit' in self.request.GET:
    #         limit =int(self.request.GET.get('fetch_limit')) 
    #         qs = qs[:limit]
    #         return qs
    
    # def get_queryset(self):
    #     qs=super().get_queryset()
    #     category=self.request.GET['category']
    #     category=models.ProductCategory.objects.get(id=category)
    #     qs=qs.filter(category=category)
    #     return qs

class ProductImgsList(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer
    
class ProductImgsDetail(generics.ListCreateAPIView):
    queryset=models.ProductImage.objects.all()
    serializer_class=serializers.ProductImageSerializer
    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['product-id']
        qs = qs.filter(product__id=product_id)  # Filter by product_id
        return qs  

class VendorProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs=qs.filter(vendor__id=vendor_id)
        return qs
    
class ProductImgDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.ProductImage.objects.all()
    serializer_class=serializers.ProductImageSerializer   

    
class TagProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all().order_by('id') 
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination
    def get_queryset(self):
        qs = super().get_queryset()
        tag=self.kwargs['tag']
        qs = qs.filter(tags__icontains=tag)  # Filter by tag name
        return qs   

from rest_framework.exceptions import NotFound

class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all().order_by('id') 
    serializer_class = serializers.ProductListSerializer
    

    def get_queryset(self):
        product_id = self.kwargs['pk']
        try:
            product = models.Product.objects.get(id=product_id)
        except models.Product.DoesNotExist:
            raise NotFound(detail="Product not found")
        
        return models.Product.objects.filter(category=product.category).exclude(id=product.id)
 

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer


@csrf_exempt     
def update_product_downloads_count(request, product_id):
    msg = {'bool': False}  # 🔥 Define msg at the start so it always exists

    if request.method == 'POST':
        try:
            product = models.Product.objects.get(id=product_id)
            totalDownloads = int(product.downloads)  # 🔥 Make sure field name is correct (probably 'downloads')
            totalDownloads += 1

            # Update the downloads field
            updateRes = models.Product.objects.filter(id=product_id).update(downloads=totalDownloads)

            if updateRes:
                msg['bool'] = True

        except models.Product.DoesNotExist:
            msg = {
                'bool': False,
                'error': 'Product not found'
            }
    
    return JsonResponse(msg)

    
class CustomerList(generics.ListCreateAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer
   
class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.User.objects.all()
    serializer_class=serializers.UserSerializer

@csrf_exempt   
def customer_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)  # This is correct!
    
    if user:
        customer = models.Customer.objects.get(user=user)
        msg = {
            'bool': True,
            'user': user.username,
            'id': customer.id
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Invalid Username or Password'
        }
    
    return JsonResponse(msg)


@csrf_exempt   
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')  
    username = request.POST.get('username')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    password = request.POST.get('password')
    
    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
        )
        user.set_password(password)  # ✅ important, hashes the password
        user.save()

        # create customer
        try:
            customer = models.Customer.objects.create(
                user=user,
                mobile=mobile,
            )
            msg = {
                'bool': True,
                'user': user.id,
                'customer_id': customer.id,
                'msg': 'Registration Successful! You can log in now.'
            }
        except IntegrityError:
            msg = {
                'bool': False,
                'msg': 'Mobile already exists!'
            }
    except IntegrityError:
        msg = {
            'bool': False,
            'msg': 'Username already exists!'
        }

    return JsonResponse(msg)


    
class OrderList(generics.ListCreateAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    
@csrf_exempt     
def update_order_status(request,order_id):
    if request.method=='POST':
        updateRes=models.Order.objects.filter(id=order_id).update(order_status=True)
        msg={
            'bool':False,            
            }
        if updateRes:
            msg={
                'bool':True,            
                }    
    return JsonResponse(msg)
    

class OrderItemList(generics.ListCreateAPIView):
    queryset=models.OrderItem.objects.all()
    serializer_class=serializers.OrderItemSerializer
#customer item orderlist
class CustomerOrderItemList(generics.ListAPIView):
    queryset=models.OrderItem.objects.all()
    serializer_class=serializers.CustomerOrderItemSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id = self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs

#Vendor Order Item List
class VendorOrderItemList(generics.ListAPIView):
    queryset=models.OrderItem.objects.all()
    serializer_class=serializers.VendorOrderItemSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs
    
class OrderDetail(generics.ListAPIView):
    # queryset=models.OrderItem.objects.all()
    serializer_class=serializers.OrderDetailSerializer
    def get_queryset(self):
        order_id=self.kwargs['pk']
        order=models.Order.objects.get(id=order_id)
        order_items=models.OrderItem.objects.filter(order=order)
        return order_items
    
#Customer Address
class CustomerAddressViewset(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()

class CustomerAddressList(generics.ListAPIView):
    queryset=models.CustomerAddress.objects.all()
    serializer_class=serializers.CustomerAddressSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id = self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id).order_by('id')
        return qs
    
@csrf_exempt
def mark_default_address(request,pk):
    if request.method == 'POST':
        address_id = request.POST.get('address_id')
        models.CustomerAddress.objects.update(default_address=False)
        res = models.CustomerAddress.objects.filter(id=address_id).update(default_address=True)
        
        msg = {'bool': False}
        if res:
            msg['bool'] = True
        
        return JsonResponse(msg)     
    
    
#ProductReview
class ProductRatingViewset(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()
    
class CategoryList(generics.ListCreateAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategorySerializer
    pagination_class=pagination.PageNumberPagination 
 
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategoryDetailSerializer
    
#Wish List view

class WishList(generics.ListCreateAPIView):
    queryset=models.Wishlist.objects.all()
    serializer_class=serializers.WishlistSerializer
    
    
    
@csrf_exempt
def check_in_wishlist(request):
    if request.method == 'POST':
        product_id = request.POST.get('product')
        customer_id = request.POST.get('customer')
        
        checkWishlist = models.Wishlist.objects.filter(product_id=product_id, customer_id=customer_id).count()
        
        msg = {'bool': False}
        if checkWishlist > 0:
            msg['bool'] = True
        
        return JsonResponse(msg)  
    
# Customer WishItems
class CustomerWishItemList(generics.ListAPIView):
    queryset=models.Wishlist.objects.all()
    serializer_class=serializers.WishlistSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id = self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id)
        return qs
    
@csrf_exempt
def remove_from_wishlist(request):
    if request.method == 'POST':
        wishlist_id = request.POST.get('wishlist_id')
        res = models.Wishlist.objects.filter(id=wishlist_id).delete()
        
        msg = {'bool': False}
        if res:
            msg['bool'] = True
        
        return JsonResponse(msg) 

#Customer Dashboard
def customer_dashboard(request,pk):
    customer_id = pk
    totalOrders=models.Order.objects.filter(customer__id=customer_id).count()
    totalWishlist=models.Wishlist.objects.filter(customer__id=customer_id).count()
    totalAddress=models.CustomerAddress.objects.filter(customer__id=customer_id).count()
    
    msg = {
            'totalOrders':totalOrders,
            'totalWishlist':totalWishlist,
            'totalAddress':totalAddress,
        }

    return JsonResponse(msg)    
    