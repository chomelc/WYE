from peewee import *
import click
from unidecode import unidecode
from functions.functions import getDateDay

database = SqliteDatabase("db/meals.sqlite3")

# ----------- MODELS DECLARATION ----------- #

class BaseModel(Model):

    class Meta:
        database = database

class User(BaseModel):
    first_name = CharField()
    last_name = CharField()
    initials = CharField()
    slug = CharField(primary_key=True)

class GroceryList(BaseModel):
    author = ForeignKeyField(User, backref="author", primary_key=True)

class Item(BaseModel):
    g_list = ForeignKeyField(GroceryList, backref="list")
    item = CharField()
    is_checked = BooleanField()
    slug = CharField()

class Dish(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)

class Day(BaseModel):
    day = CharField()
    date = DateField('%d-%m-%Y')
    slug = CharField(primary_key=True)
    breakfast = ForeignKeyField(Dish, backref="breakfast", null=True)
    lunch = ForeignKeyField(Dish, backref="lunch", null=True)
    dinner = ForeignKeyField(Dish, backref="dinner", null=True)

# ----------- OPERATIONS ----------- #

def create_tables():
    with database:
        database.create_tables([User, GroceryList, Item, Dish, Day])

def populate_tables():
    first_name="Clémence"
    last_name="Chomel"
    User.create(first_name=first_name, last_name=last_name, initials=first_name[0]+last_name[0], slug=unidecode(first_name).lower()+"_"+unidecode(last_name).lower())
    first_name="Axel"
    last_name="Raux"
    User.create(first_name=first_name, last_name=last_name, initials=first_name[0]+last_name[0], slug=unidecode(first_name).lower()+"_"+unidecode(last_name).lower())
    GroceryList.create(author="clemence_chomel")
    GroceryList.create(author="axel_raux")
    Item.create(g_list="clemence_chomel", item="Lait", is_checked=False, slug="lait")
    Item.create(g_list="clemence_chomel", item="Oeufs", is_checked=False, slug="oeufs")
    Item.create(g_list="clemence_chomel", item="Fromage", is_checked=False, slug="fromage")
    Item.create(g_list="clemence_chomel", item="Beurre", is_checked=False, slug="beurre")
    Item.create(g_list="axel_raux", item="Princes", is_checked=True, slug="princes")
    Dish.create(name="Lasagnes", slug="lasagnes")
    Dish.create(name="Poulet à la crème & riz", slug="poulet-creme-riz")
    Dish.create(name="Tomates-Mozza", slug="tomates-mozza")
    Dish.create(name="Brunch", slug="brunch")
    date='18-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast="brunch", lunch=None, dinner="poulet-creme-riz")
    date='19-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast=None, lunch="lasagnes", dinner=None)

def drop_tables():
    with database:
        database.drop_tables([User, GroceryList, Item, Dish, Day])
