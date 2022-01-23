from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort
from models import Day
from functions.functions import getDateDay
from functions.api_functions import  abort_if_day_doesnt_exist
from .dishes_namespace import dishes_fields

# initializing parser
day_parser = reqparse.RequestParser()
day_parser.add_argument('date')
day_parser.add_argument('breakfast')
day_parser.add_argument('lunch')
day_parser.add_argument('dinner')

# ----------- FIELDS ----------- #

days_fields = {
    'day': fields.String,
    'date': fields.String,
    'slug':  fields.String,
    'breakfast': fields.Nested(dishes_fields),
    'lunch': fields.Nested(dishes_fields),
    'dinner': fields.Nested(dishes_fields)
}

# ----------- API ----------- #

api = Namespace('days', 'Days API' )

@api.route('/')
class DaysAPI(Resource):
    @marshal_with(days_fields)
    @api.response(200, 'Success')
    def get(self):
        query = (Day.select())
        return [d for d in query]

    @api.response(201, 'Success')
    def post(self):
        args = day_parser.parse_args()
        date = args['date']
        Day.create(day=getDateDay(date), date=date, slug=date, breakfast=None, lunch=None, dinner=None)
        return '', 201

@api.route('/<string:day_slug>')
class DayAPI(Resource):
    @marshal_with(days_fields)
    @api.response(200, 'Success')
    @api.doc(params={'day_slug': 'The slug of the corresponding day'})
    def get(self, day_slug):
        abort_if_day_doesnt_exist(day_slug)
        query = (Day.select().where(Day.slug == day_slug))
        return [d for d in query]

    @api.response(204, 'Success')
    @api.doc(params={'day_slug': 'The slug of the corresponding day'})
    def delete(self, day_slug):
        abort_if_day_doesnt_exist(day_slug)
        query = Day.delete().where(Day.slug == day_slug)
        query.execute()
        return '', 204

    @api.response(201, 'Success')
    @api.doc(params={'day_slug': 'The slug of the corresponding day'})
    def put(self, day_slug):
        abort_if_day_doesnt_exist(day_slug)
        args = day_parser.parse_args()
        nbreakfast = args['breakfast']
        nlunch = args['lunch']
        ndinner = args['dinner']
        query = Day.update({Day.breakfast: nbreakfast, Day.lunch: nlunch, Day.dinner: ndinner}).where(Day.slug == day_slug)
        query.execute()
        return '', 201