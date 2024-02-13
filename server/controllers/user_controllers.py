from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource
from models import User
from config import db
from flask_jwt_extended import jwt_required

user_bp=Blueprint("user_bp", __name__)
api=Api(user_bp)

class Users(Resource):
    @jwt_required()
    def get(self):
        # users list comprehension
        users_lc=[user.to_dict() for user in User.query.all()]
        
        return make_response(jsonify({"users":users_lc}), 200)

class UserById(Resource):
    @jwt_required()
    def get(self, user_id):
        user=User.query.filter_by(id=user_id).first()
        
        if not user:
            return make_response(jsonify({"error":"User not found"}), 401)
        
        return make_response(jsonify({"user":user.to_dict()}), 200)
    
    @jwt_required()
    def patch(self, user_id):
        data=request.get_json()
        user=User.query.filter_by(id=user_id).first()
        
        if not user:
            return make_response(jsonify({"error":"User not found"}), 401)
        
        for attr in data:
            setattr(user, attr, data.get(attr))
            
        db.session.add(user)
        db.session.commit()
        
        return make_response(jsonify({"user":user.to_dict()}), 200)
    
    @jwt_required()
    def delete(self, user_id):
        user=User.query.filter_by(id=user_id).first()
        
        if not user:
            return make_response(jsonify({"error":"User not found"}), 401)
        
        db.session.delete(user)
        db.session.commit()
        
        return make_response(jsonify({"message":"User deleted successfully"}), 204)
    
    
# URLs
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:user_id>")