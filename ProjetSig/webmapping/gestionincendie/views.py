from django.http import JsonResponse
from django.shortcuts import render
from .models import A,B,C,D,E


def webmapping(request):
    return render(request, 'index.html')


def get_data(request):
    region_name = request.GET.get('canton')
    region_model = None
      # Récupère le paramètre 'region_name' de la requête GET
    
    # Mapping des noms de région à leurs modèles correspondants
    if region_name == 'A':
        region_model = A
    elif region_name == 'B':
        region_model = B
    elif region_name == 'C':
        region_model = C
    elif region_name == 'D':
        region_model = D
    elif region_name == 'E':
        region_model = E



    if region_model:
   
        # Sélectionner toutes les instances du modèle de région spécifique
        regions = region_model.objects.all()
        postvigi = [region.postvigi for region in regions]
        ptdeau  =[region.ptdeau for region in regions]
        trancherfeu = [region.trancherfeu for region in regions]
        typeEssence =[region.typeEssence for region in regions]
        superficie = [region.superf for region in regions]
        images = [region.Image.url if region.Image else None for region in regions]
        
        data = {'superficie': superficie,
                'postvigi': postvigi,
                'ptdeau': ptdeau,
                'trancherfeu': trancherfeu,
                'typeEssence':  typeEssence,
                'images': images,
                }


        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Région non trouvée'}, status=404)
