from flask_restx import Namespace, Resource, reqparse, fields, marshal_with, abort
from models import User

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
