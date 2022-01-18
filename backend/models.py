from peewee import *
import click
from functions import getDateDay

database = SqliteDatabase("db/meals.sqlite3")

# ----------- MODELS DECLARATION ----------- #

class BaseModel(Model):

    class Meta:
        database = database

class Category(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)

class Meal(BaseModel):
    name = CharField()
    slug = CharField(primary_key=True)
    category = ForeignKeyField(Category, backref="meals")


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
        database.create_tables([Meal, Category, Day])

def populate_tables():
    Category.create(name="entrée", slug="entree")
    Category.create(name="plat", slug="plat")
    Category.create(name="dessert", slug="dessert")
    Meal.create(name="Lasagnes", slug="lasagnes", category="plat")
    Meal.create(name="Tomates-Mozza", slug="tomates-mozza", category="entree")
    Meal.create(name="Glace", slug="glace", category="dessert")
    Meal.create(name="Brunch", slug="brunch", category="plat")
    date='18-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast="brunch", lunch=None, dinner="lasagnes")
    date='19-01-2022'
    Day.create(day=getDateDay(date), date=date, slug=date, breakfast=None, lunch="tomates-mozza", dinner=None)

def drop_tables():
    with database:
        database.drop_tables([Meal, Category, Day])
