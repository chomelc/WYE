from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort, inputs
from models import GroceryList, Item, User
from .users_namespace import users_fields
from unidecode import unidecode
from functions.api_functions import abort_if_item_doesnt_exist, abort_if_user_doesnt_exist

# initializing parser
grocery_parser = reqparse.RequestParser()
grocery_parser.add_argument('list')
grocery_parser.add_argument('item')
grocery_parser.add_argument('is_checked', type=inputs.boolean)

# ----------- FIELDS ----------- #

groceries_fields = {}
groceries_fields['author'] = fields.Nested(users_fields)

grocery_list_fields = {
    'item': fields.String,
    'is_checked': fields.Boolean,
    'slug': fields.String
}
grocery_list_fields['g_list'] = fields.Nested(groceries_fields)

# ----------- API ----------- #

api = Namespace('groceries', 'Grocery lists API' )

@api.route('/')
class GroceriesAPI(Resource):
    @marshal_with(grocery_list_fields)
    @api.response(200, 'Success')
    def get(self):
        return [d for d in Item.select()]

    @api.response(201, 'Success')
    def post(self):
        args = grocery_parser.parse_args()
        g_list = args['list']
        item = args['item']
        slug = unidecode(item).lower()
        is_checked = bool(args['is_checked'])
        Item.create(g_list=g_list, item=item, is_checked=is_checked, slug=slug)
        return '', 201

@api.route('/<string:user_slug>')
class ItemAPI(Resource):
    @marshal_with(grocery_list_fields)
    @api.response(200, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    def get(self, user_slug):
        abort_if_user_doesnt_exist(user_slug)
        query = (Item.select()
        .where(Item.g_list == user_slug))
        return [d for d in query]

@api.route('/<string:user_slug>/<string:item_slug>')
class ItemAPI(Resource):
    @marshal_with(grocery_list_fields)
    @api.response(200, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    @api.doc(params={'item_slug': 'The slug of the corresponding item'})
    def get(self, user_slug, item_slug):
        abort_if_user_doesnt_exist(user_slug)
        abort_if_item_doesnt_exist(item_slug)
        query = (Item.select().where(Item.slug == item_slug).where(Item.g_list == user_slug))
        return [d for d in query]

    @api.response(204, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    @api.doc(params={'item_slug': 'The slug of the corresponding item'})
    def delete(self, user_slug, item_slug):
        abort_if_user_doesnt_exist(user_slug)
        abort_if_item_doesnt_exist(item_slug)
        query = (Item.delete().where(Item.slug == item_slug).where(Item.g_list == user_slug))
        query.execute()
        return '', 204

    @api.response(201, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    @api.doc(params={'item_slug': 'The slug of the corresponding item'})
    def put(self, user_slug, item_slug):
        abort_if_user_doesnt_exist(user_slug)
        abort_if_item_doesnt_exist(item_slug)
        args = grocery_parser.parse_args()
        nis_checked = bool(args['is_checked'])
        query = Item.update({Item.is_checked: nis_checked}).where(Item.slug == item_slug).where(Item.g_list == user_slug)
        query.execute()
        return '', 201