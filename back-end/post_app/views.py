from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import Post, PostSerializer, CreatePostSerializer
from user_app.serializers import User, UserSerializer
from user_app.views import UserPermissions
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from collections import ChainMap

class Filtered_Post(UserPermissions):
    def get(self, request):
        user_target = request.user.target_language
        user_native = request.user.native_language
        #gets user's post
        user = User.objects.all().filter(id=request.user.id)
        #gets all users who meet criteria
        users = User.objects.all().filter(native_language=user_target, target_language=user_native) | user

        posts = [PostSerializer(user.user.all(), many=True).data for user in users if user.user.all()]
        flat = [post for user in posts for post in user]
        sorted_list = sorted(flat, key=lambda i: i['id'], reverse=True)
        
        return Response(sorted_list)

class All_post(UserPermissions):
    def get(self, request):
        posts = Post.objects.all().order_by('-id')
        ser_post = PostSerializer(posts, many=True)
        # print(ser_post.data)
        return Response(ser_post.data)


class Create_post(UserPermissions):
    def post(self,request):
        data = request.data.copy()
        data['poster'] = request.user.id

        new_post = CreatePostSerializer(data=data)
        
        if new_post.is_valid():
            new_post.save()
            return Response(new_post.data, status=HTTP_201_CREATED)
        else:
            return Response(new_post.errors, status=HTTP_400_BAD_REQUEST)
