from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort
from .dishes_namespace import dishes_fields
from models import MealDish
from functions.api_functions import abort_if_meal_doesnt_exist

# ----------- FIELDS ----------- #

meal_fields = {
    'id': fields.Integer
}

meals_fields = { }
meals_fields['meal'] = fields.Nested(meal_fields)
meals_fields['dish'] = fields.Nested(dishes_fields)

# ----------- API ----------- #

api = Namespace('meals', 'Meals API' )

@api.route('/')
class MealsAPI(Resource):
    @marshal_with(meals_fields)
    @api.response(200, 'Success')
    def get(self):
        query = (MealDish.select())
        return [d for d in query]

@api.route('/<int:meal_id>')
class MealAPI(Resource):
    @marshal_with(meals_fields)
    @api.response(200, 'Success')
    @api.doc(params={'meal_id': 'The id of the corresponding meal'})
    def get(self, meal_id):
        abort_if_meal_doesnt_exist(meal_id)
        query = MealDish.select().where(MealDish.meal == meal_id)
        return [d for d in query]