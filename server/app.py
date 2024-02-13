from config import app
from flask_restful import Api, Resource


api=Api(app)

class Index(Resource):
    def get(self):
        return "Hello World", 200
    
api.add_resource(Index, "/")

