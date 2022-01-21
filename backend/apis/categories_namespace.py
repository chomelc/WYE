from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort
from models import Category

# ----------- FIELDS ----------- #

categories_fields = {
    'name': fields.String,
    'slug': fields.String,
}

# ----------- API ----------- #

api = Namespace('categories', 'Categories API' )

@api.route('/')
class CategoriesAPI(Resource):
    @marshal_with(categories_fields)
    @api.response(200, 'Success')
    def get(self):
        return [d for d in Category.select()]