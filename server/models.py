from config import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin


# models
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    _password_hash = db.Column(db.String, nullable=False)

    # relationships
    # 1:M
    students = db.relationship("Student", backref="user")
    pairs = db.relationship("Pair", backref="user")
    pair_histories = db.relationship("PairHistory", backref="user")

    # password hashing
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

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
                    raise ValueError("Invalid email format")

                return email

    @validates("_password_hash")
    def validate_password_hash(self, key, _password_hash):
        if not _password_hash:
            raise ValueError("Password required")
        return _password_hash

    def __repr__(self):
        return f"User {self.full_name} {self.username} {self.email}"


class Pair(db.Model):

    __tablename__ = "pairs"
    id = db.Column(db.Integer, primary_key=True)
    week_number = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationship
    pair_histories = db.relationship("PairHistory", backref="pair")

    # M:M via PairStudentAssociation
    students = db.relationship(
        "PairStudentAssociation", back_populates="pairs")

    def __repr__(self):
        return f"<Pair: {self.week_number} {self.User_id} {self.created_at} {self.updated_at}>"


class PairStudentAssociation(db.Model):
    __tablename__ = "pair_student_association"

    id = db.Column(db.Integer, primary_key=True)
    pair_id = db.Column(db.Integer, db.ForeignKey("pairs.id"))
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # relationship
    pairs = db.relationship("Pair", back_populates="students")
    students = db.relationship("Student", back_populates="pairs")

    def __repr__(self):
        return f"<pair_student_association: {self.student_id}, {self.created_at}>"


class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    # M:M via PairStudentAssociation
    pairs = db.relationship("PairStudentAssociation",
                            back_populates="students")

    # M:M via PairHistoryStudentAssociation
    pair_histories = db.relationship(
        "PairHistoryStudentAssociation", back_populates="students")

    def __repr__(self):
        return f"<Student: {self.name}, {self.email} >"


class PairHistoryStudentAssociation(db.Model):
    __tablename__ = "pair_history_student_association"

    id = db.Column(db.Integer, primary_key=True)
    pair_history_id = db.Column(db.Integer, db.ForeignKey("pair_histories.id"))
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # relationships
    students = db.relationship("Student", back_populates="pair_histories")
    pair_histories = db.relationship(
        "PairHistory", back_populates="students")

    def __repr__(self):
        return f"<pair_history_student_association: {self.pair_history_id} {self.student_id} {self.created_at}"


class PairHistory(db.Model):
    __tablename__ = 'pair_histories'

    id = db.Column(db.Integer, primary_key=True)
    week_number = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    pair_id = db.Column(db.Integer, db.ForeignKey("pairs.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    # M:M via PairHistoryStudentAssociation
    students = db.relationship(
        "PairHistoryStudentAssociation", back_populates="pair_histories")

    def __repr__(self):
        return f"<PairHistory: {self.week_number}, {self.user_id}, {self.pair_id}, {self.created_at}, {self.updated_at}>"


# will contain revoked access/refresh tokens
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"TokenBlocklist {self.jti}"
