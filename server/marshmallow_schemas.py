from config import ma
from models import Student
from marshmallow import fields

# will use Marshmallow Schemas to avoid the hustle of using the SerializerMixin approach


class UserSchema(ma.Schema):
    class Meta:
        model = Student

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
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
