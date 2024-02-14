from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from os import environ
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# load environment variables => in .env
load_dotenv()

app = Flask(__name__)
db = SQLAlchemy()

# app configurations
app.secret_key = environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = environ.get(
    "SQLALCHEMY_TRACK_MODIFICATIONS")
# app.config["SQLALCHEMY_ECHO"] = environ.get("SQLALCHEMY_ECHO")
app.config["JWT_SECRET_KEY"] = environ.get("JWT_SECRET_KEY")
app.json.compact = False

# instantiations
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# !db.create_all() => comes in handy if tables don't appear
