from flask import Blueprint
from flask_restful import Api, Resource

user_bp=Blueprint("user_bp", __name__)
api=Api(user_bp)

class Users(Resource):
    def get(self):
        pass

class UserById(Resource):
    def get(self, user_id):
        pass
    
    def patch(self, user_id):
        pass
    
    def delete(self, user_id):
        pass
    
    
# URLs
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int: user_id>")