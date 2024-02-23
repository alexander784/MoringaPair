from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, current_user
from models import Student, Pair
import random
from config import db
from marshmallow_schemas import pair_schema, pairs_schema

# pair_bp
pair_bp = Blueprint("pair_db", __name__)
api = Api(pair_bp)


# function to generate random pairs
def generate_random_pairs(students):
    paired_students = set()
    pairs = []

    # avoid infinite loop with odd number of students => minus 1?
    while len(paired_students) < len(students) - 1:
        student1 = random.choice(students)

        # ensure student1 is not already paired
        if student1 not in paired_students:
            # Find a student2 who is not student1 and not already paired
            student2_candidates = [
                s for s in students if s != student1 and s not in paired_students]

            if student2_candidates:
                student2 = random.choice(student2_candidates)

                pair = Pair(
                    student1=student1,
                    student2=student2,
                    user_id=current_user.id,
                    week_number=1
                )
                pairs.append(pair)

                # add to set (keeps track of already paired students)
                paired_students.add(student1)
                paired_students.add(student2)

    # If there's one student left unpaired, add them to the pairs (case of odd number of students => will form own group)
    if len(paired_students) < len(students):
        # set difference
        unpaired_student = set(students) - paired_students
        pair = Pair(
            student1=unpaired_student.pop(),
            student2=None,
            user_id=current_user.id,
            week_number=1
        )
        pairs.append(pair)

    return pairs


class Pairs(Resource):
    @jwt_required()
    def get(self):
        # list of student names
        students = [stud.name for stud in Student.query.all()]

        pairs = generate_random_pairs(students)

        # add to db + commit
        for pair in pairs:
            db.session.add(pair)
            db.session.commit()

        # return 9 per page by default
        page = request.args.get("page", default=1, type=int)
        per_page = request.args.get("per_page", default=9, type=int)

        # implement pagination => legacy query API
        pairs_data = Pair.query.paginate(
            page=page,
            per_page=per_page
        )
        # pairs_lc = [pair.to_dict() for pair in pair]
        # return make_response(jsonify({"pairs": pairs_lc}), 200)

        return make_response(jsonify({"pairs": pairs_schema.dump(pairs_data)}), 200)


api.add_resource(Pairs, "/create_pairs")
