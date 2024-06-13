from django.contrib.gis.db import models as gis_models
from django.db import models

# Définition d'un modèle de base pour les cantons
class CantonBase(models.Model):
    superf = models.IntegerField()
    # postvigi = models.IntegerField()
    # ptdeau = models.IntegerField()
    # trancherfeu = models.IntegerField()
    # typeEssence = models.CharField(max_length=200)
    
    class Meta:
        abstract = True  # Ce modèle est abstrait, il ne sera pas créé en tant que table dans la base de données

    def __str__(self):
        return self.nom_canton  # Chaque sous-classe doit définir son propre nom

# Exemple d'utilisation pour le canton A
class A(CantonBase):
    nom_canton = "A"

# Exemple d'utilisation pour le canton B
class B(CantonBase):
    nom_canton = "B"

# Exemple d'utilisation pour le canton C
class C(CantonBase):
    nom_canton = "C"

# Exemple d'utilisation pour le canton D
class D(CantonBase):
    nom_canton = "D"

# Exemple d'utilisation pour le canton E
class E(CantonBase):
    nom_canton = "E"
