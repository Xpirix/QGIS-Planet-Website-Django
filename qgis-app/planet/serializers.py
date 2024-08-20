from rest_framework import serializers
from feedjack.models import Post

class PostSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    class Meta:
        model = Post
        fields = [
            'author',
            'content',
            'date_created',
            'date_modified',
            'link',
            'tags',
            'title'
        ]