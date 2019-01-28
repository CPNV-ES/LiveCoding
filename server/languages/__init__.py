from .php import Php
from .ruby import Ruby

def create(typ):
      targetclass = typ.capitalize()
      return globals()[targetclass]()