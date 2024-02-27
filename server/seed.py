from models import User, Student, Pair
from config import app, db, bcrypt
from faker import Faker
import random

fake = Faker()


# function to seed the database
def seed_database():
    print("Deleting records 🚮🚮🚮...")
    User.query.delete()
    Student.query.delete()

    # static TM sample data
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

    # static student sample data
    student_email_addresses = [
        "john.doe@student.moringaschool.com",
        "jane.smith@student.moringaschool.com",
        "alexander.james@student.moringaschool.com",
        "emily.wilson@student.moringaschool.com",
        "samuel.king@student.moringaschool.com",
        "lisa.jones@student.moringaschool.com",
        "michael.chang@student.moringaschool.com",
        "sophia.nguyen@student.moringaschool.com",
        "david.smith@student.moringaschool.com",
        "olivia.martin@student.moringaschool.com",
        "daniel.kim@student.moringaschool.com",
        "mia.jackson@student.moringaschool.com",
        "ethan.brown@student.moringaschool.com",
        "isabella.hernandez@student.moringaschool.com",
        "aiden.white@student.moringaschool.com"
    ]

    print("Inserting students 👨‍🎓👩‍🎓👨‍🎓...")
    for i in range(15):
        student = Student(
            name=fake.unique.name(),
            email=student_email_addresses[i],
            user_id=random.choice(user_ids)
        )

        db.session.add(student)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        seed_database()
