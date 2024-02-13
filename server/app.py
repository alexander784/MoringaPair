from config import app
from controllers.auth_controllers import auth_bp
from controllers.user_controllers import user_bp
from config import jwt
from flask import make_response, jsonify
from models import User


# register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(user_bp, url_prefix="/api")

# JWT STUFF
# !jwt error handling == invalid, expired, missing token
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return make_response(jsonify({"message":"Token has expired", "error":"token_expired"}), 400)

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return make_response(jsonify({"message":"Signature verification failed", "error":"token_invalid"}), 400)

@jwt.unauthorized_loader
def missing_token_callback(error):
    return make_response(jsonify({"message":"Token is required", "error":"token_missing"}), 400)

# !automatically load user
@jwt.user_lookup_loader
def user_lookup_callback(jwt_header, jwt_data):
    identity=jwt_data["sub"]
    
    return User.query.filter_by(username=identity).one_or_none()




if __name__ == "__main__":
    app.run(port=5555, debug=True)




    

