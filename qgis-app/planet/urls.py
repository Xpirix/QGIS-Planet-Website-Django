from django.urls import path
from .views import PostListView, TagListView, SubscriberListView, PostBySubscriberListView, ScrapeMembershipSectionView

urlpatterns = [
    path('posts', PostListView.as_view(), name='posts_list_view'),
    path('posts/user/<int:subscriber_id>', PostBySubscriberListView.as_view(), name='posts_by_subscriber_view'),
    path('subscribers', SubscriberListView.as_view(), name='subscriber_list_view'),
    path('tags', TagListView.as_view(), name='tag_list_view'),
    path('sustaining-members', ScrapeMembershipSectionView.as_view(), name='scrape_membership_section'),
]