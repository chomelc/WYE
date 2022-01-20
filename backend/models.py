from peewee import *
import click
from unidecode import unidecode
from functions import getDateDay

database = SqliteDatabase("db/meals.sqlite3")

# ----------- MODELS DECLARATION ----------- #

class BaseModel(Model):

    class Meta:
        database = database

class User(BaseModel):
    first_name = CharField()
    last_name = CharField()
    initials = CharField()
    slug = CharField()

class Category(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)

class Dish(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)
    category = ForeignKeyField(Category, backref="dish")

class Meal(BaseModel):
    dishes = ManyToManyField(Dish, backref="dishes")

MealDish = Meal.dishes.get_through_model()

class Day(BaseModel):
    day = CharField()
    date = DateField('%d-%m-%Y')
    slug = CharField(primary_key=True)
    breakfast = ForeignKeyField(Dish, backref="day_dishes", null=True)
    lunch = ForeignKeyField(Dish, backref="day_dishes", null=True)
    dinner = ForeignKeyField(Dish, backref="day_dishes", null=True)

# ----------- OPERATIONS ----------- #

def create_tables():
    with database:
        database.create_tables([User, Meal, Dish, Category, MealDish, Day])

def populate_tables():
    first_name="Clémence"
    last_name="Chomel"
    User.create(first_name=first_name, last_name=last_name, initials=first_name[0]+last_name[0], slug=unidecode(first_name).lower()+"_"+unidecode(last_name).lower())
    first_name="Axel"
    last_name="Raux"
    User.create(first_name=first_name, last_name=last_name, initials=first_name[0]+last_name[0], slug=unidecode(first_name).lower()+"_"+unidecode(last_name).lower())
    Category.create(name="Entrée", slug="entree")
    Category.create(name="Plat", slug="plat")
    Category.create(name="Dessert", slug="dessert")
    Dish.create(name="Lasagnes", slug="lasagnes", category="plat")
    Dish.create(name="Poulet à la crème", slug="poulet-creme", category="plat")
    Dish.create(name="Riz", slug="riz", category="plat")
    Dish.create(name="Tomates-Mozza", slug="tomates-mozza", category="entree")
    Dish.create(name="Glace", slug="glace", category="dessert")
    Dish.create(name="Brunch", slug="brunch", category="plat")
    MealDish.create(meal=1, dish="poulet-creme")
    MealDish.create(meal=1, dish="riz")
    MealDish.create(meal=2, dish="lasagnes")
    MealDish.create(meal=2, dish="glace")
    date='18-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast="brunch", lunch=None, dinner="lasagnes")
    date='19-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast=None, lunch="tomates-mozza", dinner=None)

def drop_tables():
    with database:
        database.drop_tables([User, Meal, Dish, Category, MealDish, Day])
