from peewee import *

database = SqliteDatabase("db/meals.sqlite3")

# ----------- MODELS DECLARATION ----------- #

class BaseModel(Model):

    class Meta:
        database = database

class Category(BaseModel):
    name = CharField()
    slug = CharField()

class Meal(BaseModel):
    name = CharField()
    slug = CharField()
    category = ForeignKeyField(Category, backref="meals")


# ----------- OPERATIONS ----------- #

def create_tables():
    with database:
        database.create_tables([Meal, Category])

def populate_tables():
    Category.create(name="entrée", slug="entree")
    Category.create(name="plat", slug="plat")
    Category.create(name="dessert", slug="dessert")
    Meal.create(name="Lasagnes", slug="lasagnes", category=2)
    Meal.create(name="Tomates-Mozza", slug="tomates-mozza", category=1)
    Meal.create(name="Glace", slug="glace", category=3)

def drop_tables():
    with database:
        database.drop_tables([Meal, Category])
