from config import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
    __tablename__="users"
    
    id=db.Column(db.String, primary_key=True)
    full_name=db.Column(db.String, nullable=False)
    username=db.Column(db.String, nullable=False, unique=True)
    email=db.Column(db.String, nullable=False, unique=True)
    _password_hash=db.Column(db.String, nullable=False)
    
    # !PASSWORD HASHING
    # getter
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    # setter
    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        
    # authenticate
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    
    
    # !VALIDATIONS
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
            if User.query.filter_by(username=username).first():
                raise ValueError("Username already exists")
            return username
        
    # john.doe@moringaschool...regex
    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email required")
        else:
            if User.query.filter_by(email=email).first():
                raise ValueError("Email already exists")
            else:
                import re
                pattern=r"[a-z]*.[a-z]*@moringaschool"
                regex=re.compile(pattern)
                
                # search, match, findall
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