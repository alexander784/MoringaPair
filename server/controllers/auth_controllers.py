from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from models import User
from config import bcrypt, db

auth_bp=Blueprint("auth_bp", __name__)
api=Api(auth_bp)

# user data
parser=reqparse.RequestParser()
parser.add_argument("full_name", type=str, required=True, help="Full name required")
parser.add_argument("username", type=str, required=True, help="Username required")
parser.add_argument("email", type=str, required=True, help="Email required")
parser.add_argument("password", type=str, required=True, help="Password required")

class Index(Resource):
    def get(self):
        return "Hello World", 200

class Register(Resource):
    def post(self):
        args=parser.parse_args()
        
        new_user=User(
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
        data=request.get_json()
        
        # check if user exist in db
        user=User.query.filter_by(username=data.get("username")).first()
        
        # access/refresh token if user and password matches
        if user and user.authenticate(data.get("password")):
            pass
        
        return make_response(jsonify({"error":"Invalid username or password"}))
    
class RefreshAccess(Resource):
    def get(self):
        pass

class Logout(Resource):
    def get(self):
        pass

api.add_resource(Index, "/")
api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(RefreshAccess, "/refresh_access")
api.add_resource(Logout, "/logout")