from flask import Flask
from flask_restful import reqparse, Resource, Api, fields, marshal_with, abort
from models import Category, Meal, Day, create_tables, populate_tables, drop_tables
from functions import getDateDay
import click
from unidecode import unidecode

# ----------- APP SETUP ----------- #

app = Flask(__name__)
api = Api(app)

categories_fields = {
    'name': fields.String,
    'slug': fields.String,
}

meals_fields = {
    'name': fields.String,
    'slug': fields.String,
}
meals_fields['category'] = fields.Nested(categories_fields)

days_fields = {
    'day': fields.String,
    'date': fields.String,
    'slug':  fields.String
}
days_fields['breakfast'] = fields.Nested(meals_fields)
days_fields['lunch'] = fields.Nested(meals_fields)
days_fields['dinner'] = fields.Nested(meals_fields)

# ----------- FUNCTIONS ----------- #

# aborting operation if the corresponding slug doesn't exist
def abort_if_meal_doesnt_exist(meal_slug):
    query = Meal.select(Meal.slug).dicts()
    if meal_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(meal_slug))

def abort_if_day_doesnt_exist(day_slug):
    query = Day.select(Day.slug).dicts()
    if day_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(day_slug))

# initializing parser
meal_parser = day_parser = reqparse.RequestParser()
meal_parser.add_argument('name')
meal_parser.add_argument('category')
day_parser.add_argument('date')

# ----------- APIs ----------- #

class MealsAPI(Resource):
    @marshal_with(meals_fields)
    def get(self):
        return [d for d in Meal.select()]

    def post(self):
        args = meal_parser.parse_args()
        name = args['name']
        slug = unidecode(name).lower()
        category = args['category']
        Meal.create(name=name, slug=slug, category=category)
        return '', 201

api.add_resource(MealsAPI, '/wye/meals/')

class MealAPI(Resource):
    @marshal_with(meals_fields)
    def get(self, meal_slug):
        abort_if_meal_doesnt_exist(meal_slug)
        return Meal.select().where(Meal.slug == meal_slug).dicts().get()

    def delete(self, meal_slug):
        abort_if_meal_doesnt_exist(meal_slug)
        query = Meal.delete().where(Meal.slug == meal_slug)
        query.execute()
        return '', 204

    def put(self, meal_slug):
        abort_if_meal_doesnt_exist(meal_slug)
        args = meal_parser.parse_args()
        nname = args['name']
        ncategory = args['category']
        query = Meal.update({Meal.name: nname, Meal.category: ncategory}).where(Meal.slug == meal_slug)
        query.execute()
        return '', 201

api.add_resource(MealAPI, '/wye/meals/<string:meal_slug>')

class CategoriesAPI(Resource):
    @marshal_with(categories_fields)
    def get(self):
        return [d for d in Category.select()]

api.add_resource(CategoriesAPI, '/wye/categories/')

class DaysAPI(Resource):
    @marshal_with(days_fields)
    def get(self):
        return [d for d in Day.select()]

    def post(self):
        args = day_parser.parse_args()
        date = args['date']
        Day.create(day=getDateDay(date), date=date, slug=date, breakfast=None, lunch=None, dinner=None)
        return '', 201

api.add_resource(DaysAPI, '/wye/days/')

class DayAPI(Resource):
    @marshal_with(days_fields)
    def get(self, day_slug):
        abort_if_day_doesnt_exist(day_slug)
        return Day.select().where(Day.slug == day_slug).dicts().get()

api.add_resource(DayAPI, '/wye/days/<string:day_slug>')

# ----------- CLI COMMANDS ----------- #

@app.cli.command()
def initdb():
    # creating the database
    create_tables()
    click.echo('Initialized the database')

@app.cli.command()
def populatedb():
    # creating the database
    populate_tables()
    click.echo('Populated the database')

@app.cli.command()
def dropdb():
    # dropping the database tables
    drop_tables()
    click.echo('Dropped tables from database')

# ----------- RUNNING THE APP ----------- #

if __name__ == "__main__":
    app.run(debug=False)