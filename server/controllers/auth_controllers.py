from flask import Blueprint
from flask_restful import Api, Resource

auth_bp=Blueprint("auth_bp", __name__)
api=Api(auth_bp)

class Index(Resource):
    def get(self):
        return "Hello World", 200


    

api.add_resource(Index, "/")