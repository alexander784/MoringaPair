from config import app
from controllers.auth_controllers import auth_bp
from controllers.user_controllers import user_bp


# register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(user_bp, url_prefix="/api")


if __name__ == "__main__":
    app.run(port=5555, debug=True)




    

