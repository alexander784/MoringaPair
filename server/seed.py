from models import User
from config import app, db, bcrypt

def seed_database():
    # empty records
    User.query.delete()
    full_names=[
        "John Doe",
        "Jane  Smith",
        "Alex Jones",
        "Emily Brown",
        "Chris Wilson"
    ]
    usernames=[
        "johndoe",
        "janesmith",
        "alexjones",
        "emilybrown",
        "chriswilson"
    ]
    emails=["john.doe@moringaschool.com",
"jane.smith@moringaschool.com",
"alex.jones@moringaschool.com",
"emily.brown@moringaschool.com",
"chris.wilson@moringaschool.com"]
    
    passwords=[
        "passjohndoe",
        "passjanesmith",
        "passalexjones",
        "passemilybrown",
        "passchriswilson"
    ]
    
    # 0, 1, 2, 3, 4
    for i in range(5):
        # generate 5 user instances
        user=User(
            full_name=full_names[i],
            username=usernames[i],
            email=emails[i],
            _password_hash=bcrypt.generate_password_hash(
            passwords[i].encode('utf-8'))
        )
        db.session.add(user)
        db.session.commit()
        
        
    
    


if __name__ =="__main__":
    with app.app_context():
        seed_database()