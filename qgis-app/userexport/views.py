# Create your views here.
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.db.models import Q
from django.http import HttpResponse


def export(request, **kwargs):
    if not request.user.is_superuser:
        raise PermissionDenied()
    import csv

    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = "attachment; filename=plugins_users_list.csv"
    writer = csv.writer(response)
    for u in User.objects.all():
        writer.writerow([u.username, u.email, u.get_full_name(), u.date_joined])
    return response

