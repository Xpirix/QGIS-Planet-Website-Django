from celery.schedules import crontab

from settings import *
import ast
import os

from settings import *

SITE_ROOT = os.path.dirname(os.path.realpath(__file__))

DEBUG = ast.literal_eval(os.environ.get("DEBUG", "True"))
THUMBNAIL_DEBUG = DEBUG
ALLOWED_HOSTS = ["*"]

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = os.environ.get("MEDIA_ROOT", "/home/web/media/")

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
# MEDIA_URL = '/media/'
# setting full MEDIA_URL to be able to use it for the feeds
MEDIA_URL = "/media/"

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = os.environ.get("STATIC_ROOT", "/home/web/static/")

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = "/static/"

# Manage static files storage ensuring that their 
# filenames contain a hash of their content for cache busting
# STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    # Uncomment the next line to enable the admin:
    "django.contrib.admin",
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    "django.contrib.staticfiles",
    # full text search postgres
    "django.contrib.postgres",
    "django.contrib.humanize",
    "django.contrib.syndication",
    "bootstrap_pagination",
    "sortable_listview",
    "lib",  # Container for small tags and functions
    "tinymce",
    "rpc4django",
    "feedjack",
    "preferences",
    "matomo",
    "planet"
]

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": os.environ["DATABASE_NAME"],
        "USER": os.environ["DATABASE_USERNAME"],
        "PASSWORD": os.environ["DATABASE_PASSWORD"],
        "HOST": os.environ["DATABASE_HOST"],
        "PORT": 5432,
        "TEST": {
            "NAME": "unittests",
        },
    }
}

PAGINATION_DEFAULT_PAGINATION = 20
PAGINATION_DEFAULT_PAGINATION_HUB = 30
LOGIN_REDIRECT_URL = "/"
SERVE_STATIC_MEDIA = DEBUG
DEFAULT_PLANET_SITE = os.environ.get("DEFAULT_PLANET_SITE", "https://planet.qgis.org/")

# See fig.yml file for postfix container definition
#
EMAIL_BACKEND = os.environ.get(
    "EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend"
)
# Host for sending e-mail.
EMAIL_HOST = os.environ.get("EMAIL_HOST", "smtp")
# Port for sending e-mail.
EMAIL_PORT = int(os.environ.get("EMAIL_PORT", "25"))
# SMTP authentication information for EMAIL_HOST.
# See fig.yml for where these are defined
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "automation")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "docker")
EMAIL_USE_TLS = ast.literal_eval(os.environ.get("EMAIL_USE_TLS", "False"))
EMAIL_SUBJECT_PREFIX = os.environ.get("EMAIL_SUBJECT_PREFIX", "[QGIS Planet]")

# django uploaded file permission
FILE_UPLOAD_PERMISSIONS = 0o644

CELERY_RESULT_BACKEND = 'rpc://'
CELERY_BROKER_URL = os.environ.get('BROKER_URL', 'amqp://rabbitmq:5672')
CELERY_BEAT_SCHEDULE = {
    'update_feedjack': {
        'task': 'planet.tasks.update_feedjack.update_feedjack',
        'schedule': crontab(minute='*/30'),  # Execute every 30 minutes.
    }
}

MATOMO_SITE_ID="1"
MATOMO_URL="//matomo.qgis.org/"

# Default primary key type
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'


# Sentry
SENTRY_DSN = os.environ.get("SENTRY_DSN", "")
SENTRY_RATE = os.environ.get("SENTRY_RATE", 1.0)

if SENTRY_DSN and SENTRY_DSN != "":
    import sentry_sdk

    sentry_sdk.init(
        dsn=SENTRY_DSN,
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        traces_sample_rate=SENTRY_RATE,
    )
