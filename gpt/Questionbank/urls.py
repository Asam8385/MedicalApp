from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings


urlpatterns = [
    path('', views.llm),
]