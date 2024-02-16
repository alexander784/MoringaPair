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
    updated_at = db.Column(db.DateTime,onupdate=db.func.now())
    _password_hash = db.Column(db.String, nullable=False)

    users = db.relationship("Student", backref= "user")

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
    

class pair(db.Model):

     __table_name__ = "pairs"
     id = db.Column()
     week_number = db.Column(db.Integer, nullable=False)
     user_id = db.Column(db.Integer)
     created_at = db.Column(db.DateTime, server_default=db.func.now())
     updated_at = db.Column(db.DateTime,onupdate=db.func.now())

     def __repr__(self):
         return f"<Pair: {self.week_number} {self.User_id} {self.created_at} {self.updated_at}>"
   


class Student(db.Model):
     __tablename__ = 'students'

     id = db.Column(db.Integer, primary_key=True)
     name= db.Column(db.String, nullable=False)
     email= db.Column(db.String, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
     created_at = db.Column(db.DateTime, server_default=db.func.now())
     updated_at = db.Column(db.DateTime,onupdate=db.func.now())

     

     def __repr__(self):
         return f"<Student: {self.name}, {self.email} >"
     
class PairHistory(db.Model):
    __tablename__= 'pair_histories'
    id = db.Column(db.Integer, primary_key=True)
    week_number= db.Column(db.Integer, nullable=False)
    user_id =db.Column(db.Integer, nullable=False)
    pair_id= db.Column(db.Integer, nullable=False)
    created_at= db.Column(db.DateTime, server_default=db.func.now())
    updated_at= db.Column(db.DateTime,onupdate=db.func.now())

    def __repr__(self):
        return f"<PairHistory: {self.week_number}, {self.user_id}, {self.pair_id}, {self.created_at}, {self.updated_at}>"
    

class PairHistoryStudentAssociation(db.Model):
    __tablename__= "pair_history_student_associations"

    id= db.Column(db.Integer, primary_key=True)
    pair_history_id= db.Column(db.Integer)
    student_id= db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<pair_history_student_association: {self.pair_history_id} {self.student_id} {self.created_at}"

class PairStudentAssociation(db.Model):
     __tablename__= "pair_student_associations"
     
     id= db.Column(db.Integer, primary_key=True)
     student_id=db.Column(db.Integer)
     created_at = db.Column(db.DateTime, server_default=db.func.now())

     def __repr__(self):
         return f"<pair_student_association: {self.student_id}, {self.created_at}>"





# will contain revoked access/refresh tokens
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"TokenBlocklist {self.jti}"
