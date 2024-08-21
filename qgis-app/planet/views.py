from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from .serializers import PostSerializer, FeedSerializer
from feedjack.models import Post, Feed, Tag
from django.db.models import Q

class PostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class MainView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = PostPagination    

    def get_queryset(self):
        queryset = Post.objects.all()

        # Get the 'tags' parameter from the request
        tags = self.request.query_params.get('tags', None)

        if tags:
            tag_list = tags.split(',')  # Split the tags by commas
            queryset = queryset.filter(tags__name__in=tag_list).distinct()  # Filter posts with these tags

        return queryset

class FeedListView(ListAPIView):
    serializer_class = FeedSerializer
    queryset = Feed.objects.all()

class TagListView(ListAPIView):
    serializer_class = FeedSerializer
    def get_queryset(self):
        """
        Optionally restricts the returned tags by filtering against
        a `q` query parameter in the URL.
        """
        queryset = Tag.objects.all()
        query = self.request.query_params.get('q', None)
        if query:
            queryset = queryset.filter(Q(name__icontains=query))
        return queryset