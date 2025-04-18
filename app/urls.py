"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from botiga import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.cataleg, name='cataleg'),
    path('cataleg/<int:catid>/', views.cataleg, name='cataleg'),
    path('info', views.informacio, name='informacio'),
    path('info/<str:varid>/', views.informacio, name='informacio'),
    path('prod/', views.cataleg, name='productes'),
    path('user/', views.user, name='usuari'),
    path('add/', views.addCistella, name='add'),

    path('login/',views.login,name='login'),
    path('logoff/',views.logoff,name='logoff'),
    path('cistella/', views.shopping, name='cistella'),
    path('pagament/', views.pagamentCistella, name='pagament'),
    path('realitzarPagament/', views.realitzarPagament, name='realitzarPagament'),

    path('filtrar/', views.filtrar, name='filtrar'),
    path('variantInfo/', views.variantInfo, name='variantInfo'),
    path('eliminarMissatge/', views.eliminarMissatge, name='eliminarMissatge'),
    path('ver_pdf', views.imprimirFra, name='ver_pdf'),
    path('incrStock/', views.incrStock, name='incrStock')
]
