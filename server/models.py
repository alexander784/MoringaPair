from config import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin


# models
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    _password_hash = db.Column(db.LargeBinary, nullable=False)

    # relationships
    students = db.relationship("Student", back_populates="user")
    pairs = db.relationship("Pair", backref="user")

    # password hashing
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password)
        self._password_hash = password_hash

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password)

    # validations
    @validates("full_name")
    def validate_full_name(self, key, full_name):
        if not full_name:
            raise ValueError("Full name required")
        return full_name

    @validates("username")
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username required")
        else:
            # username must be unique
            if User.query.filter_by(username=username).first():
                raise ValueError("Username already exists")

            return username

    # john.doe@moringaschool.com => regex
    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email required")
        else:
            # email must be unique
            if User.query.filter_by(email=email).first():
                raise ValueError("Email already exists")
            else:
                import re
                pattern = r"[a-z]*.[a-z]*@moringaschool.com"
                regex = re.compile(pattern)

                # check for fullmatch
                if not regex.fullmatch(email):
                    raise ValueError("Invalid Moringa School email")

                return email

    @validates("_password_hash")
    def validate_password_hash(self, key, _password_hash):
        if not _password_hash:
            raise ValueError("Password required")
        return _password_hash

    def __repr__(self):
        return f"{self.full_name}"


class Pair(db.Model):
    __tablename__ = "pairs"

    id = db.Column(db.Integer, primary_key=True)
    student1 = db.Column(db.String)
    student2 = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    week_number = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationship
    students = db.relationship("Student", back_populates="pair")

    def __repr__(self):
        return f"{self.id}"


class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pair_id = db.Column(db.Integer, db.ForeignKey('pairs.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # will serve adv. on frontend side
    user = db.relationship("User", back_populates="students")
    pair = db.relationship("Pair", back_populates="students")

    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name is required")
        return name

    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email is required")

        else:
            if Student.query.filter_by(email=email).first():
                raise ValueError("Email already exists")

            else:
                import re
                pattern = r"[a-z]*.[a-z]*@student.moringaschool.com"
                regex = re.compile(pattern)

                if not regex.fullmatch(email):
                    raise ValueError("Invalid Moringa School email")

                return email

    def __repr__(self):
        return f"Student: {self.name}, {self.email} {self.user_id}"


# will contain revoked access/refresh tokens
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"TokenBlocklist {self.jti}"
