from config import db

class User(db.Model):
    __tablename__="users"
    
    id=db.Column(db.String, primary_key=True)
    full_name=db.Column(db.String, nullable=False)
    username=db.Column(db.String, nullable=False, unique=True)
    email=db.Column(db.String, nullable=False, unique=True)
    _password_hash=db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return f"User {self.full_name} {self.username} {self.email}"