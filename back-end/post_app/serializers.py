from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post
from user_app.serializers import UserSerializer, User

class PostSerializer(ModelSerializer):
    poster = SerializerMethodField()

    class Meta:
        model = Post
        fields = ['poster', 'post_content']

    def get_poster(self, obj):
        return obj.poster.display_name
    