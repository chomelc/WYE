from flask import Blueprint
from flask_restx import Api
from apis.users_namespace import api as ns1
from apis.categories_namespace import api as ns2
from apis.dishes_namespace import api as ns3
from apis.meals_namespace import api as ns4
from apis.days_namespace import api as ns5

blueprint = Blueprint('api', __name__, url_prefix='/wye/')
api = Api(blueprint, version='1.0', title="'What ya eatin'?' API",
    description='An API to manage data in the WYE app.')

api.add_namespace(ns1)
api.add_namespace(ns2)
api.add_namespace(ns3)
api.add_namespace(ns4)
api.add_namespace(ns5)