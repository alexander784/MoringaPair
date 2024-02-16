from flask import Blueprint
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required

# student_bp
student_bp = Blueprint("student_bp", __name__)
api = Api(student_bp)


# resources
class Students(Resource):
    @jwt_required()
    def get(self):
        pass
    
    @jwt_required()
    def post(self):
        pass


class StudentById(Resource):
    @jwt_required()
    def get(self, student_id):
        pass

    @jwt_required()
    def patch(self, student_id):
        pass
    
    @jwt_required()
    def delete(self, student_id):
        pass


# URLs
api.add_resource(Students, "/students")
api.add_resource(StudentById, "/students/<int:student_id>")
