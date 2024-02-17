from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required
from models import Student
from config import db
from marshmallow_schemas import student_schema, students_schema

# student_bp
student_bp = Blueprint("student_bp", __name__)
api = Api(student_bp)

# student data
parser = reqparse.RequestParser()
parser.add_argument("name", type=str, required=True,
                    help="Name required")
parser.add_argument("email", type=str, required=True,
                    help="Email required")
parser.add_argument("user_id", type=int, required=True,
                    help="User_id required")


# resources
class Students(Resource):
    @jwt_required()
    def get(self):
        students = Student.query.all()
        return make_response(students_schema.dump(students), 200)

    @jwt_required()
    def post(self):
        args = parser.parse_args()

        new_student = Student(
            name=args["name"],
            email=args["email"],
            user_id=args["user_id"],
        )

        db.session.add(new_student)
        db.session.commit()

        return make_response(student_schema.dump(new_student), 201)


class StudentById(Resource):
    @jwt_required()
    def get(self, student_id):
        student = Student.query.filter_by(id=student_id).first()

        if not student:
            return make_response(jsonify({"error": "Student not found"}), 400)

        return make_response(student_schema.dump(student), 200)

    @jwt_required()
    def patch(self, student_id):
        data = request.get_json()
        student = Student.query.filter_by(id=student_id).first()

        if not student:
            return make_response(jsonify({"error": "Student not found"}), 400)

        for attr in data:
            setattr(student, attr, data.get(attr))

        db.session.commit()

        return make_response(student_schema.dump(student), 200)

    @jwt_required()
    def delete(self, student_id):
        student = Student.query.filter_by(id=student_id).first()

        if not student:
            return make_response(jsonify({"error": "Student not found"}), 400)

        db.session.delete(student)
        db.session.commit()

        return make_response(jsonify({"message": "User deleted successfully"}), 200)


# URLs
api.add_resource(Students, "/students")
api.add_resource(StudentById, "/students/<int:student_id>")
