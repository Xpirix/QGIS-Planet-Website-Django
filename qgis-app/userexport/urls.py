# -* coding:utf-8 *- #
from django.urls import re_path as url
from userexport.views import *

urlpatterns = [
    url(r"^export$", export, {}, name="userexport")
]
