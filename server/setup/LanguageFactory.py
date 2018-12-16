class LanguageFactory():
   def create_button(self, typ):
      targetclass = typ.capitalize()
      return globals()[targetclass]()