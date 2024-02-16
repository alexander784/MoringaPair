from flask import Blueprint
from flask_restful import Api, Resource

# student_bp
student_bp = Blueprint("student_bp", __name__)
api = Api(student_bp)


# resources
class Students(Resource):
    def get(self):
        pass

    def post(self):
        pass


class StudentById(Resource):
    def get(self, student_id):
        pass

    def patch(self, student_id):
        pass

    def delete(self, student_id):
        pass


# URLs
api.add_resource(Students, "/students")
api.add_resource(StudentById, "/students/<int:student_id>")
