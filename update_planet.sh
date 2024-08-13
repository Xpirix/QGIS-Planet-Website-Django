#!/bin/bash

cd /home/plugins/QGIS-Planet-Website/qgis-app
# Run feedjack_update.py to update the planet postings
SITE_DIR=/home/plugins/QGIS-Planet-Website/qgis-app
source /home/plugins/.virtualenvs/plugins/bin/activate
# set up the environment
export PYTHONPATH=$SITE_DIR:$SITE_DIR
export DJANGO_SETTINGS_MODULE=settings
# update the feeds
/home/plugins/.virtualenvs/plugins/bin/feedjack_update.py
