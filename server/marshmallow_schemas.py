from config import ma
from models import User, Student, Pair
from marshmallow import fields

# will use Marshmallow Schemas
# converts objects to JSON serializable format


class UserSchema(ma.Schema):
    class Meta:
        model = User

    # what we want to return
    id = fields.Int(dump_only=True)
    full_name = fields.Str(required=True)
    username = fields.Str(required=True, unique=True)
    email = fields.Email(required=True, unique=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    _password_hash = fields.Str(required=True)


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class StudentSchema(ma.Schema):
    class Meta:
        model = Student

    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    user_id = fields.Int()
    user = fields.Str()
    pair_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)


class PairSchema(ma.Schema):
    class Meta:
        model = Pair

    id = fields.Integer(dump_only=True)
    student1 = fields.String(required=True)
    student2 = fields.String(required=True)
    user_id = fields.String(required=True)
    week_number = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


pair_schema = PairSchema()
pairs_schema = PairSchema(many=True)
