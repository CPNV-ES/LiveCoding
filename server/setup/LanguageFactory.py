class LanguageFactory:
   
   def __init__(self):
	   pass

   @staticmethod
   def create(typ):
      targetclass = typ.capitalize()
      return globals()[targetclass]()