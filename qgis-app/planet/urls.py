from django.urls import path
from .views import MainView, FeedListView, TagListView

urlpatterns = [
    path('', MainView.as_view(), name='main_view'),
    path('feeds', FeedListView.as_view(), name='feed_list_view'),
    path('tags', TagListView.as_view(), name='tag_list_view'),
]