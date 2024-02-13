from config import app
from controllers.auth_controllers import auth_bp


# register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")


if __name__ == "__main__":
    app.run(port=5555, debug=True)




    

