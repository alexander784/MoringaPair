from config import ma
from models import Student


class StudentSchema(ma.SQLAlchemySchema):
    # Meta class to associate the schema with the Newsletter model
    class Meta:
        model = Student

    # Fields for serialization and deserialization
    title = ma.auto_field()
    published_at = ma.auto_field()

    # Hyperlinks field for including navigation links in the serialized output
    url = ma.Hyperlinks(
        {
            # "self" link pointing to the route for a specific newsletter by ID
            "self": ma.URLFor("studentbyid", values=dict(id="<id>")),
            # "collection" link pointing to the route for all newsletters
            "collection": ma.URLFor("students"),
        }
    )


# Create instances of the schema for single and multiple Newsletter objects
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
