from django.urls import path
from .views import MainView, FeedListView

urlpatterns = [
    path('', MainView.as_view(), name='main_view'),
    path('feed', FeedListView.as_view(), name='feed_list_view'),
]