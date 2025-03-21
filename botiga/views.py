from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import *
from .models import *
from django.db.models import Prefetch, Q
from django.shortcuts import get_object_or_404, get_list_or_404, render, redirect
import json
#request.session["nom"] = request.POST.get("nom_param", "")
#request.session.clear()

# Create your views here.
def login(request):
    #if request.method == 'POST':
    #    Project.objects.create(name=request.POST['name']) 
    return cataleg(request)

def registrat(request):
    #if request.method == 'POST':
    #    Project.objects.create(name=request.POST['name']) 
        
    return render(request, 'sections/signIn.html',{
        'title': 'Sign In',
        'head': 'Registrat',
        'form': SignIn(),
    })

def cataleg(request, catid=None):
    request.session["page"]="cataleg"
    request.session["login"]=1
    #query per obtindre les categories i si tenen fills
    categories=Categoria.objects.raw("SELECT * FROM `botiga_categoria` bc LEFT JOIN (SELECT jerarquia_id, count(jerarquia_id) "
                                    "as \"count\" FROM `botiga_categoria` where jerarquia_id is not null GROUP BY jerarquia_id) "
                                    "cnt on bc.id=cnt.jerarquia_id; ")
    talles=Talla.objects.all()
    jerarquia=""
    if request.method == 'GET':
        #guardem el nom de la categoria seleccionada
        request.session["catSel"]=Categoria.objects.filter(id=catid).values('nom').first()
        #guardem tota la informació de les jerarquies
        jerarquia=Categoria.objects.filter(id__in=returnParentJerarqui(catid)).order_by('id')
        #guardem unicament els productes que estan en el llistat de categories seleccionades
        productes=Variant.objects.filter(prod_id__in=CatProd.objects.filter(categ_id__in=returnChildrenJerarqui(catid)).values_list('prod', flat=True)).order_by('nom')
    else:
        request.session["catSel"]=""
        productes=Variant.objects.all()      

    return render(request, 'sections/cataleg.html',{
        'title': 'cataleg',
        'head': 'Productes',
        'categories': categories,
        'productes': productes,
        'form': filterCat(),
        'talles':talles,
        'jerarquia':jerarquia
    })
#funciò recursiva per treure els pares de les categories
def returnParentJerarqui(id):
    cat=[]
    cat.append(id)
    fill=Categoria.objects.filter(id=id).values_list('jerarquia', flat=True)
    for f in fill:
        cat.extend(returnParentJerarqui(f))
    return cat
#funciò recursiva per treure els fills de les categories
def returnChildrenJerarqui(id):
    cat=[]
    cat.append(id)
    fill=Categoria.objects.filter(jerarquia=id).values_list('id', flat=True)
    for f in fill:
        cat.extend(returnChildrenJerarqui(f))
    return cat

def informacio(request, varid=None):
    if varid!=None:
        #volem que la variant seleccionada surti primer
        varSel = Variant.objects.filter(id=varid).prefetch_related(
                Prefetch('tallavariant_set', queryset=TallaVariant.objects.select_related('talla')),
                Prefetch('imatges_set')
            )
        #carreguem la resta menys la seleccionada
        restaVar = Variant.objects.filter(prod=varSel[0].prod.id).exclude(id=varSel[0].id).prefetch_related(
                Prefetch('tallavariant_set', queryset=TallaVariant.objects.select_related('talla')),
                Prefetch('imatges_set')
            )
        allVar = varSel | restaVar #combinem els dos resultats

        return render(request, 'sections/informacio.html',{
            'prod':allVar
        })
    else:
        return cataleg(request)

def user(request):
    return render(request, 'sections/usuari.html',{
        'title': 'Usuari',
        'head': 'Usuari',
    })

def shopping(request):
    request.session["page"]="shopping"
    return render(request, 'sections/shopping_cart.html')

def add(request):
    if 'cistella' not in request.session:
        request.session['cistella']=1
    else:
        request.session['cistella']=request.session['cistella']+1
    return JsonResponse({'cistella': request.session['cistella']})

@api_view(['POST'])
def filtrar(request):
    pmin=request.data["pmin"]
    pmax=request.data["pmax"]
    nom=request.data["nom"]
    talles=request.data["talles"]
    listtalles=talles.split(",")

    productes=Variant.objects.all() 
    if pmin!="":
        productes=productes.filter(preu__gte=pmin)
    if pmax!="":
        productes=productes.filter(preu__lte=pmax)
    if nom!="":
        productes=productes.filter(Q(prod__nom__icontains=nom)|Q(prod__marca__icontains=nom))
    if talles!="":
        productes=productes.filter(id__in=TallaVariant.objects.filter(talla__in=listtalles).values_list('var', flat=True))

    resposta=[]
    for p in productes:
        item={
            "id": p.id,
            "prod":p.prod.nom,
            "prodId":p.prod.id,
            "var":p.nom,
            "preu":p.preu,
            "dto":p.dto,
            "descr":p.prod.descripcio,
        }
        resposta.append(item)
    # resposta=serialize('json',productes)
    return JsonResponse(resposta, safe=False)    