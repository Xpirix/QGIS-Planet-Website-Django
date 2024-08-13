# -*- coding:utf-8 -*-
# myapp/middleware.py

from django.template import TemplateDoesNotExist
from django.shortcuts import render
from django.core.exceptions import RequestDataTooBig
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
import logging
import sentry_sdk

"""
    QGIS-DJANGO - MIDDLEWARE

    Middlewares to fix behind proxy IP problems

    @license: GNU AGPL, see COPYING for details.
"""

logger = logging.getLogger(__name__)

def XForwardedForMiddleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        if "HTTP_X_FORWARDED_FOR" in request.META.keys():
            request.META["HTTP_X_PROXY_REMOTE_ADDR"] = request.META["REMOTE_ADDR"]
            parts = request.META["HTTP_X_FORWARDED_FOR"].split(",", 1)
            request.META["REMOTE_ADDR"] = parts[0]

        response = get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware

class HandleTemplateDoesNotExistMiddleware(MiddlewareMixin):
    """Handle missing templates"""
    def process_exception(self, request, exception):
        if isinstance(exception, TemplateDoesNotExist):
            return render(request, '404.html', status=404)
        return None

class HandleOSErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except OSError as e:
            logger.error("OSError occurred", exc_info=True)
            sentry_sdk.capture_exception(e)
            raise e
        return response
class HandleRequestDataTooBigMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except RequestDataTooBig:
            return JsonResponse({'error': 'Request data is too large. Please upload smaller files.'}, status=413)


# Custom middleware to handle HTTP_AUTHORIZATION
# Author: A. Pasotti

from django.contrib import auth

def HttpAuthMiddleware(get_response):
    """
    Simple HTTP-Basic auth for testing webservices
    """

    def middleware(request):
        auth_basic = request.META.get("HTTP_AUTHORIZATION")
        if auth_basic and not str(auth_basic).startswith('Bearer'):
            import base64

            username, dummy, password = base64.decodebytes(
                auth_basic[6:].encode("utf8")
            ).partition(b":")
            username = username.decode("utf8")
            password = password.decode("utf8")

            user = auth.authenticate(username=username, password=password)
            if user:
                # User is valid.  Set request.user and persist user in the session
                # by logging the user in.
                request.user = user
                auth.login(request, user)
        response = get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware
