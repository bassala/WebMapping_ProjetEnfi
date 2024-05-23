from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.

def webmapping(request):
    return render(request, 'index.html')
