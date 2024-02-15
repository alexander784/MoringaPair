from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from models import User, TokenBlocklist
from config import bcrypt, db
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, jwt_required, current_user, get_jwt_identity

# auth_bp
auth_bp = Blueprint("auth_bp", __name__)
api = Api(auth_bp)

# user register data
parser = reqparse.RequestParser()
parser.add_argument("full_name", type=str, required=True,
                    help="Full name required")
parser.add_argument("username", type=str, required=True,
                    help="Username required")
parser.add_argument("email", type=str, required=True, help="Email required")
parser.add_argument("password", type=str, required=True,
                    help="Password required")

# resources


class Index(Resource):
    def get(self):
        return "Hello World", 200


class Register(Resource):
    def post(self):
        args = parser.parse_args()

        # new_user instance
        new_user = User(
            full_name=args["full_name"],
            username=args["username"],
            email=args["email"],
            _password_hash=bcrypt.generate_password_hash(
                args["password"].encode('utf-8'))
        )

        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(new_user.to_dict()), 201)


class Login(Resource):
    def post(self):
        # user login data
        data = request.get_json()

        user = User.query.filter_by(username=data.get("username")).first()

        # generate access and refresh tokens if user exists and passwords match
        if user and user.authenticate(data.get("password")):
            access_token = create_access_token(identity=data.get("username"))
            refresh_token = create_refresh_token(identity=data.get("username"))

            return make_response(jsonify({"message": "Login successful", "tokens": {
                "access": access_token,
                "refresh": refresh_token

            }}), 200)

        return make_response(jsonify({"error": "Invalid username or password"}), 401)


class Whoami(Resource):
    @jwt_required()
    def get(self):
        # claims => payload for subject in consideration
        # claims = get_jwt()
        # return make_response(jsonify({"claims": claims}), 200)

        return make_response(jsonify({"message": "Whoami", "user-details": {
            "username": current_user.username,
            "email": current_user.email,
            "full_name": current_user.full_name
        }}), 200)


# generating new access token i.e., cases where access_token has expired
class RefreshAccess(Resource):
    @jwt_required(refresh=True)
    def get(self):
        # identity = get_jwt()["sub"]
        identity = get_jwt_identity()
        new_access_token = create_access_token(identity=identity)

        return make_response(jsonify({"access": new_access_token}), 200)


class Logout(Resource):

    # 1. TokenBlocklist
    # 2. token_in_blocklist_loader
    # 3. /logout
    @jwt_required()
    def get(self):
        jti = get_jwt()["jti"]

        new_token_blocklist = TokenBlocklist(
            jti=jti
        )

        db.session.add(new_token_blocklist)
        db.session.commit()

        return make_response(jsonify({"message": "User logged out successfully"}), 200)


# URLs
api.add_resource(Index, "/")
api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(RefreshAccess, "/refresh_access")
api.add_resource(Logout, "/logout")
api.add_resource(Whoami, "/whoami")
