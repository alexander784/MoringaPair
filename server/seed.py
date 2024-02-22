from models import User, Student, Pair
from config import app, db, bcrypt
from faker import Faker
import random

fake = Faker()


# function to seed the database
def seed_database():
    # empty records to prevent duplicate values
    print("Deleting records 🚮🚮🚮...")
    User.query.delete()
    Student.query.delete()

    # static data
    full_names = [
        "John Doe",
        "Jane  Smith",
        "Alex Jones",
        "Emily Brown",
        "Chris Wilson"
    ]

    usernames = [
        "johndoe",
        "janesmith",
        "alexjones",
        "emilybrown",
        "chriswilson"
    ]

    emails = ["john.doe@moringaschool.com",
              "jane.smith@moringaschool.com",
              "alex.jones@moringaschool.com",
              "emily.brown@moringaschool.com",
              "chris.wilson@moringaschool.com"]

    passwords = [
        "passjohndoe",
        "passjanesmith",
        "passalexjones",
        "passemilybrown",
        "passchriswilson"
    ]

    print("Inserting users 🤵🤵🤵...")
    for i in range(5):
        # generate 5 user instances
        user = User(
            full_name=full_names[i],
            username=usernames[i],
            email=emails[i],
            _password_hash=bcrypt.generate_password_hash(
                passwords[i].encode('utf-8'))
        )

        db.session.add(user)
        db.session.commit()

    # extract user ids
    user_ids = [user.id for user in User.query.all()]

    print("Inserting students 👨‍🎓👩‍🎓👨‍🎓...")
    for _ in range(30):
        student = Student(
            name=fake.unique.name(),
            email=fake.unique.email(),
            user_id=random.choice(user_ids)
        )

        db.session.add(student)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        seed_database()
