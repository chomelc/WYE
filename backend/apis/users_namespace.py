from getpass import getuser
from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort
from functions.api_functions import abort_if_user_doesnt_exist
from functions.functions import getUserInitials, getUserSlug
from models import User

# initializing parser
user_parser = reqparse.RequestParser()
user_parser.add_argument('first_name')
user_parser.add_argument('last_name')

# ----------- FIELDS ----------- #

users_fields = {
    'first_name': fields.String,
    'last_name': fields.String,
    'initials': fields.String,
    'slug': fields.String
}

# ----------- API ----------- #

api = Namespace('users', 'Users API' )

@api.route('/')
class UsersAPI(Resource):
    @marshal_with(users_fields)
    @api.response(200, 'Success')
    def get(self):
        return [d for d in User.select()]

    @api.response(201, 'Success')
    def post(self):
        args = user_parser.parse_args()
        first_name = args['first_name']
        last_name = args['last_name']
        initials = getUserInitials(first_name, last_name)
        slug = getUserSlug(first_name, last_name)
        User.create(first_name=first_name, last_name=last_name, initials=initials, slug=slug)
        return '', 201

@api.route('/<string:user_slug>')
class UserAPI(Resource):
    @marshal_with(users_fields)
    @api.response(200, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    def get(self, user_slug):
        abort_if_user_doesnt_exist(user_slug)
        query = User.select().where(User.slug == user_slug)
        return [d for d in query]

    @api.response(204, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    def delete(self, user_slug):
        abort_if_user_doesnt_exist(user_slug)
        query = User.delete().where(User.slug == user_slug)
        query.execute()
        return '', 204

    @api.response(201, 'Success')
    @api.doc(params={'user_slug': 'The slug of the corresponding user'})
    def put(self, user_slug):
        abort_if_user_doesnt_exist(user_slug)
        args = user_parser.parse_args()
        nfname = args['first_name']
        nlname = args['last_name']
        query = User.update({User.first_name: nfname, User.last_name: nlname}).where(User.slug == user_slug)
        query.execute()
        return '', 201