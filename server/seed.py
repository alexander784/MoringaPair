from models import User, Student, Group, Grouping
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
    # 0, 1, 2, 3, 4
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

    print("Inserting students 👨‍🎓👩‍🎓👨‍🎓...")
    for _ in range(5):
        # generate 5 student instances
        student = Student(
            name=fake.unique.name(),
            email=fake.unique.email()
        )

        db.session.add(student)
        db.session.commit()

    groups = [
        "group 1",
        "group 2",
        "group 3",
        "group 4",
        "group 5",

    ]

    print("Inserting groups...")
    for i in range(5):
        # generate 5 group instances
        group = Group(
            name=groups[i],
            week_number=1
        )

        db.session.add(group)
        db.session.commit()

    # extract ids since students and groups have already been seeded atp
    student_ids = [student.id for student in Student.query.all()]
    group_ids = [group.id for group in Group.query.all()]

    print("Inserting groupings 👬👬...")
    for i in range(5):
        # generate 5 grouping instances
        grouping = Grouping(
            student_id=random.choice(student_ids),
            group_id=random.choice(group_ids)
        )

        db.session.add(grouping)
        db.session.commit()

    print("Complete 🤝🤝🤝...")


if __name__ == "__main__":
    with app.app_context():
        seed_database()
