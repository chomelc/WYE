from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort
from .categories_namespace import categories_fields
from models import Dish, Category
from unidecode import unidecode
from functions.api_functions import abort_if_dish_doesnt_exist

# initializing parser
dish_parser = reqparse.RequestParser()
dish_parser.add_argument('name')
dish_parser.add_argument('category')

# ----------- FIELDS ----------- #

dishes_fields = {
    'name': fields.String,
    'slug': fields.String, 
}
dishes_fields['category'] = fields.Nested(categories_fields)

# ----------- API ----------- #

api = Namespace('dishes', 'Dishes API' )

@api.route('/')
class DishesAPI(Resource):
    @marshal_with(dishes_fields)
    @api.response(200, 'Success')
    def get(self):
        return [d for d in Dish.select()]

    @api.response(201, 'Success')
    def post(self):
        args = dish_parser.parse_args()
        name = args['name']
        slug = unidecode(name).lower()
        category = args['category']
        Dish.create(name=name, slug=slug, category=category)
        return '', 201

@api.route('/<string:dish_slug>')
class DishAPI(Resource):
    @marshal_with(dishes_fields)
    @api.response(200, 'Success')
    @api.doc(params={'dish_slug': 'The slug of the corresponding dish'})
    def get(self, dish_slug):
        abort_if_dish_doesnt_exist(dish_slug)
        query = Dish.select().where(Dish.slug == dish_slug).join(Category, on=(Category.slug == Dish.category))
        return [d for d in query]

    @api.response(204, 'Success')
    @api.doc(params={'dish_slug': 'The slug of the corresponding dish'})
    def delete(self, dish_slug):
        abort_if_dish_doesnt_exist(dish_slug)
        query = Dish.delete().where(Dish.slug == dish_slug)
        query.execute()
        return '', 204

    @api.response(201, 'Success')
    @api.doc(params={'dish_slug': 'The slug of the corresponding dish'})
    def put(self, dish_slug):
        abort_if_dish_doesnt_exist(dish_slug)
        args = dish_parser.parse_args()
        nname = args['name']
        ncategory = args['category']
        query = Dish.update({Dish.name: nname, Dish.category: ncategory}).where(Dish.slug == dish_slug)
        query.execute()
        return '', 201