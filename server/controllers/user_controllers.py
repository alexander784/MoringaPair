from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource
from models import User
from config import db
from flask_jwt_extended import jwt_required
from marshmallow_schemas import user_schema, users_schema

# user_bp
user_bp = Blueprint("user_bp", __name__)
api = Api(user_bp)


# resources => user RUD
# protecting all routes using @jwt_required() => must provide token to access
class Users(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()
        return make_response(jsonify(users_schema.dump(users)), 200)


class UserById(Resource):
    @jwt_required()
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response(jsonify({"error": "User not found"}), 400)

        return make_response(jsonify(user_schema.dump(user)), 200)

    @jwt_required()
    def patch(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response(jsonify({"error": "User not found"}), 400)

        try:
            data = request.get_json()

            for attr in data:
                setattr(user, attr, data.get(attr))

            db.session.commit()

            return make_response(jsonify(user_schema.dump(user)), 200)

        except ValueError as e:
            return make_response(jsonify({"error": [str(e)]}))

    @jwt_required()
    def delete(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return make_response(jsonify({"error": "User not found"}), 400)

        db.session.delete(user)
        db.session.commit()

        return make_response(jsonify({
            "success": True,
            "message": "User deleted successfully"}), 204)


# URLs
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:user_id>")
