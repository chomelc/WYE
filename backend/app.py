from flask import Flask
from flask_restful import reqparse, Resource, Api, fields, marshal_with, abort
from models import User, Category, Dish, MealDish, Meal, Day, create_tables, populate_tables, drop_tables
from functions import getDateDay
import click
from peewee import *
from unidecode import unidecode
from flask_cors import CORS

# ----------- APP SETUP ----------- #

app = Flask(__name__)
cors = CORS(app, resources={r"/wye/*": {"origins": "*"}})
api = Api(app)

users_fields = {
    'first_name': fields.String,
    'last_name': fields.String,
    'initials': fields.String,
    'slug': fields.String
}

categories_fields = {
    'name': fields.String,
    'slug': fields.String,
}

dishes_fields = {
    'name': fields.String,
    'slug': fields.String,
}
dishes_fields['category'] = fields.Nested(categories_fields)

meals_fields = {
    'meal': fields.Integer,
    'dishes': fields.List(fields.Nested(dishes_fields))
}

days_fields = {
    'day': fields.String,
    'date': fields.String,
    'slug':  fields.String
}
days_fields['breakfast'] = fields.Nested(dishes_fields)
days_fields['lunch'] = fields.Nested(dishes_fields)
days_fields['dinner'] = fields.Nested(dishes_fields)

# ----------- FUNCTIONS ----------- #

# aborting operation if the corresponding slug doesn't exist
def abort_if_dish_doesnt_exist(dish_slug):
    query = Dish.select(Dish.slug).dicts()
    if dish_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(dish_slug))

def abort_if_day_doesnt_exist(day_slug):
    query = Day.select(Day.slug).dicts()
    if day_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(day_slug))

# initializing parser
dish_parser = day_parser = reqparse.RequestParser()
dish_parser.add_argument('name')
dish_parser.add_argument('category')
day_parser.add_argument('date')
day_parser.add_argument('breakfast')
day_parser.add_argument('lunch')
day_parser.add_argument('dinner')

# ----------- APIs ----------- #

Breakfast = Dish.alias()
Lunch = Dish.alias()
Dinner = Dish.alias()
c1 = Category.alias()
c2 = Category.alias()
c3 = Category.alias()

class UsersAPI(Resource):
    @marshal_with(users_fields)
    def get(self):
        return [d for d in User.select()]

api.add_resource(UsersAPI, '/wye/users/')

class DishesAPI(Resource):
    @marshal_with(dishes_fields)
    def get(self):
        return [d for d in Dish.select()]

    def post(self):
        args = dish_parser.parse_args()
        name = args['name']
        slug = unidecode(name).lower()
        category = args['category']
        Dish.create(name=name, slug=slug, category=category)
        return '', 201

api.add_resource(DishesAPI, '/wye/dishes/')

class DishAPI(Resource):
    @marshal_with(dishes_fields)
    def get(self, dish_slug):
        abort_if_dish_doesnt_exist(dish_slug)
        query = Dish.select().where(Dish.slug == dish_slug).join(Category, on=(Category.slug == Dish.category))
        return [d for d in query]

    def delete(self, dish_slug):
        abort_if_dish_doesnt_exist(dish_slug)
        query = Dish.delete().where(Dish.slug == dish_slug)
        query.execute()
        return '', 204

    def put(self, dish_slug):
        abort_if_dish_doesnt_exist(dish_slug)
        args = dish_parser.parse_args()
        nname = args['name']
        ncategory = args['category']
        query = Dish.update({Dish.name: nname, Dish.category: ncategory}).where(Dish.slug == dish_slug)
        query.execute()
        return '', 201

api.add_resource(DishAPI, '/wye/dishes/<string:dish_slug>')

class CategoriesAPI(Resource):
    @marshal_with(categories_fields)
    def get(self):
        return [d for d in Category.select()]

api.add_resource(CategoriesAPI, '/wye/categories/')

class MealsAPI(Resource):
    @marshal_with(meals_fields)
    def get(self):
        return [d for d in MealDish.select().dicts()]

api.add_resource(MealsAPI, '/wye/meals/')

class DaysAPI(Resource):
    @marshal_with(days_fields)
    def get(self):
        query = (Day.select()
            .join(Breakfast, on=(Breakfast.slug == Day.breakfast), join_type=JOIN.LEFT_OUTER)
            .switch(Day).join(Lunch, on=(Lunch.slug == Day.lunch), join_type=JOIN.LEFT_OUTER)
            .switch(Day).join(Dinner, on=(Dinner.slug == Day.dinner), join_type=JOIN.LEFT_OUTER)
            .switch(Day).join(c1, on=(Breakfast.category == c1.slug), join_type=JOIN.LEFT_OUTER)
            .switch(Day).join(c2, on=(Lunch.category == c2.slug), join_type=JOIN.LEFT_OUTER)
            .switch(Day).join(c3, on=(Dinner.category == c3.slug), join_type=JOIN.LEFT_OUTER).order_by(Day.slug))
        return [d for d in query]

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
        query = (Day.select().where(Day.slug == day_slug)
            .join(Breakfast, on=(Breakfast.slug == Day.breakfast), join_type=JOIN.LEFT_OUTER)
            .join(Lunch, on=(Lunch.slug == Day.lunch), join_type=JOIN.LEFT_OUTER)
            .join(Dinner, on=(Dinner.slug == Day.dinner), join_type=JOIN.LEFT_OUTER)
            .join(c1, on=(Breakfast.category == c1.slug), join_type=JOIN.LEFT_OUTER)
            .join(c2, on=(Lunch.category == c2.slug), join_type=JOIN.LEFT_OUTER)
            .join(c3, on=(Dinner.category == c3.slug), join_type=JOIN.LEFT_OUTER))
        return [d for d in query]

    def delete(self, day_slug):
        abort_if_day_doesnt_exist(day_slug)
        query = Day.delete().where(Day.slug == day_slug)
        query.execute()
        return '', 204

    def put(self, day_slug):
        abort_if_day_doesnt_exist(day_slug)
        args = day_parser.parse_args()
        nbreakfast = args['breakfast']
        nlunch = args['lunch']
        ndinner = args['dinner']
        query = Day.update({Day.breakfast: nbreakfast, Day.lunch: nlunch, Day.dinner: ndinner}).where(Day.slug == day_slug)
        query.execute()
        return '', 201

api.add_resource(DayAPI, '/wye/days/<string:day_slug>')

# ----------- CLI COMMANDS ----------- #

@app.cli.command()
def initdb():
    # creating the database
    create_tables()
    click.echo('Initialized the database.')

@app.cli.command()
def populatedb():
    # creating the database
    populate_tables()
    click.echo('Populated the database.')

@app.cli.command()
def dropdb():
    # dropping the database tables
    drop_tables()
    click.echo('Dropped tables from database.')

# ----------- RUNNING THE APP ----------- #

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)