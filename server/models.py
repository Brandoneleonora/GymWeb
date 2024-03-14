from config import db, ma
from marshmallow_sqlalchemy import SQLAlchemySchema
from marshmallow import fields, validates, ValidationError

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    followers = db.Column(db.Integer)
    following = db.Column(db.Integer)
    bio = db.Column(db.String)
    lift_type = db.Column(db.String)
    email = db.Column(db.String)
    background_image = db.Column(db.String)
    profile_picture = db.Column(db.String)

    #Relationships
    posts = db.relationship('Post', backref='user')
    friends = db.relationship('Friends', backref="user")

    def __init__(self, first_name, last_name, username, password, followers, following, bio, lift_type, email, background_image, profile_picture):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password
        self.followers = followers
        self.following = following
        self.bio = bio 
        self.lift_type = lift_type
        self.email = email
        self.background_image = background_image
        self.profile_picture = profile_picture


#Marshmallow Schemas for the models
class UserSchema(ma.SQLAlchemySchema):
    first_name = fields.String()
    last_name = fields.String()
    username = fields.String()
    password = fields.String()

    @validates('username')
    def check_username(self, username):
        if User.query.filter(User.username == username).first():
            raise ValidationError('Name is Already Taken')
            
    @validates('first_name')
    def check_first(self, first_name):
        if len(first_name) == 0:
            raise ValidationError("Need to Input Something")
        elif len(first_name) > 30:
            raise ValidationError("Name is to Long")
        elif len(first_name) < 3 and len(first_name) > 0:
            raise ValidationError('Name needs to longer then 3 letters')

    @validates('last_name')
    def check_last(self, last_name):
        if len(last_name) == 0:
            raise ValidationError("Need to Input Something")
        elif len(last_name) > 30:
            raise ValidationError("Name is to Long")
        elif len(last_name) < 3 and len(last_name) > 0:
            raise ValidationError('Name needs to longer then 3 letters')

    @validates('username')
    def check_user(self, username):
        if len(username) == 0:
            raise ValidationError("Need to Input Something")
        elif len(username) > 30:
            raise ValidationError("Name is to Long")
        elif len(username) < 3 and len(username) > 0:
            raise ValidationError('Name needs to longer then 3 letters')

    @validates('password')
    def check_pass(self, password):
        if len(password) == 0:
            raise ValidationError("Need to Input Something")
        elif len(password) > 30:
            raise ValidationError("Name is to Long")
        elif len(password) < 3 and len(password) > 0:
            raise ValidationError('Name needs to longer then 3 letters')


    class Meta:
        fields = ("id",'first_name', 'last_name', 'username', 'password', "followers", "following", "email", "lift_type", "bio", "background_image", "profile_picture")




class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_username = db.Column(db.String)
    post_type = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    likes = db.Column(db.Integer)

    #Relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


    def __init__(self, post_type, body, user_id, post_username, image, likes):
        self.post_type = post_type
        self.body = body
        self.user_id = user_id
        self.post_username = post_username
        self.image = image
        self.likes = likes


class PostSchema(ma.SQLAlchemySchema):
    class Meta:
        fields = ('post_type', 'body', 'user_id', 'post_username', "image", "likes")


class Friends(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    #Relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name


class FriendsSchema(ma.SQLAlchemySchema):
    class Meta:
        fields = ('user_id', 'name')
