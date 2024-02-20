from flask import Blueprint
from flask_restful import Api, Resource

pair_bp = Blueprint("pair_db", __name__)
api = Api(pair_bp)


class Pairs(Resource):
    def get(self):
        pass


api.add_resource(Pairs, "/create_pairs")
