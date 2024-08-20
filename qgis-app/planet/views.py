from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from .serializers import PostSerializer, FeedSerializer
from feedjack.models import Post, Feed

class PostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class MainView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = PostPagination
    queryset = Post.objects.all()

class FeedListView(ListAPIView):
    serializer_class = FeedSerializer
    queryset = Feed.objects.all()