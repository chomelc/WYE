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

class Category(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)

class Dish(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)
    category = ForeignKeyField(Category, backref="dish")

class Meal(BaseModel):
    id = IntegerField(primary_key=True)
    dishes = ManyToManyField(Dish, backref="dishes")

MealDish = Meal.dishes.get_through_model()

class Day(BaseModel):
    day = CharField()
    date = DateField('%d-%m-%Y')
    slug = CharField(primary_key=True)
    breakfast = ForeignKeyField(Meal, backref="day_meals", null=True)
    lunch = ForeignKeyField(Meal, backref="day_meals", null=True)
    dinner = ForeignKeyField(Meal, backref="day_meals", null=True)

# ----------- OPERATIONS ----------- #

def create_tables():
    with database:
        database.create_tables([User, GroceryList, Item, Meal, Dish, Category, MealDish, Day])

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
    Category.create(name="Entrée", slug="entree")
    Category.create(name="Plat", slug="plat")
    Category.create(name="Dessert", slug="dessert")
    Dish.create(name="Lasagnes", slug="lasagnes", category="plat")
    Dish.create(name="Poulet à la crème", slug="poulet-creme", category="plat")
    Dish.create(name="Riz", slug="riz", category="plat")
    Dish.create(name="Tomates-Mozza", slug="tomates-mozza", category="entree")
    Dish.create(name="Glace", slug="glace", category="dessert")
    Dish.create(name="Brunch", slug="brunch", category="plat")
    Meal.create(id=1)
    Meal.create(id=2)
    Meal.create(id=3)
    MealDish.create(meal=1, dish="tomates-mozza")
    MealDish.create(meal=1, dish="poulet-creme")
    MealDish.create(meal=1, dish="riz")
    MealDish.create(meal=2, dish="lasagnes")
    MealDish.create(meal=2, dish="glace")
    MealDish.create(meal=3, dish="brunch")
    date='18-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast=3, lunch=None, dinner=2)
    date='19-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast=None, lunch=1, dinner=None)

def drop_tables():
    with database:
        database.drop_tables([User, GroceryList, Item, Meal, Dish, Category, MealDish, Day])
