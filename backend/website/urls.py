"""website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

import matplotlib
matplotlib.use('Agg')

from django.conf.urls import url, include
from django.contrib import admin
import app.views as views

urlpatterns = [
    url(r'^api/poll$', views.PollJobView.as_view(), name='poll'),
    url(r'^api/start/get_constructs_as_genbanks$',
        views.GetConstructsAsGenbankView.as_view(),
        name='get_constructs_as_genbanks'),
    url(r'^api/start/get_constructs_as_pdf$',
        views.GetConstructsAsPDFView.as_view(),
        name='get_constructs_as_pdf'),
    url(r'^api/start/send_order_to_egf$',
        views.SendOrderToEGFView.as_view(),
        name='send_order_to_egf'),


    url(r'^api/docs/', include('rest_framework_docs.urls')),
    url(r'^api/django-rq/', include('django_rq.urls')),
    url(r'^api/admin/', admin.site.urls)
]
