from rest_framework import serializers
from feedjack.models import Post, Feed, Tag

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

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = [
            'id',
            'name'
        ]

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'tag'
        ]