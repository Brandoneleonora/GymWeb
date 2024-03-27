from flask import request, jsonify, session
from config import app, db, bcrypt, socketio
from models import User, Post, Friends, Chat, Messages, UserSchema, PostSchema, FriendsSchema, MessageSchema, ChatSchema
from werkzeug.utils import secure_filename
from flask_socketio import emit
app.secret_key = b'\xd5e\xc5M\x9fS\x81~U\xa8x\xc2\xec@r\x84'

#Masrshmallow Schemmas
user_schema = UserSchema()
users_schema = UserSchema(many=True)

post_schema = PostSchema()
posts_schema = PostSchema(many=True)

friend_schema = FriendsSchema()
friends_schema = FriendsSchema(many=True)

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)

chat_schema = ChatSchema()
chats_schema = ChatSchema(many=True)


@app.route('/signup', methods = ['POST'])
def sign_up():
    if request.method == 'POST':
        data = request.get_json()
        errors = user_schema.validate(data)

        if errors:
            return {
                "Error": f"{errors}"
            }, 400
        else: 
            new_user = User(
            data['first_name'],
            data['last_name'],
            data['username'],
            bcrypt.generate_password_hash(data['password']),
            data['followers'],
            data['following'],
            data['bio'],
            data['email'],
            data['lift_type'],
            data['background_image'],
            data['profile_picture']
            )

            session['user'] = data['username']
            db.session.add(new_user)
            db.session.commit()

            return user_schema.jsonify(new_user), 200
    

@app.route('/login', methods=['POST'])
def log_in():
    if request.method == 'POST':
        data = request.get_json()

        # We have to check if its in the system
        if User.query.filter(User.username == data['username']).first():
            #Make the user equal to the user found then check the password from the user
            user = User.query.filter(User.username == data['username']).first()
            if bcrypt.check_password_hash(user.password, data['password']):
                #This will send a positive message and status when both password and username is correct
                session["user"] = data["username"]
                return user_schema.jsonify(user), 200
            else:
                return jsonify({"login": "unsuccesful"}), 400
        else:
            return jsonify({"login": "unsuccesful"}), 400



@app.route("/logout", methods=["GET"])
def logout():
    if request.method == 'GET':
        session.pop("user", None)
        return jsonify("logged out"), 200




@app.route('/home', methods=['GET', 'POST'])
def home():

    if request.method == 'GET' :
        posts = Post.query.all()
        return jsonify(posts_schema.dump(posts)), 200

    

    elif request.method == 'POST':
        data = request.get_json()

        new_post = Post(
            data['post_type'].lower(),
            data['body'],
            data['user_id'],
            data['post_username'],
            data['image'],
            data["likes"]
        )

        db.session.add(new_post)
        db.session.commit()

        return post_schema.jsonify(new_post), 200

@app.route("/post/<int:post_id>", methods=['DELETE', 'GET', 'PATCH'])
def single_post(post_id):
    post = Post.query.filter(Post.id == post_id).first()

    if request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        return post_schema.jsonify(post), 200

    elif request.method == "GET":
        return post_schema.jsonify(post), 200

    elif request.method == 'PATCH':
        data = request.get_json()
        if 'post_type' in data:
            post.post_type = data['post_type']
        elif 'likes' in data:
            post.likes = data['likes']
        elif 'body' in data:
            post.body = data['body']
        elif 'image' in data:
            post.image = data['image']
        
        db.session.commit()
        return post_schema.jsonify(post), 200

@app.route('/<int:post_id>/<string:username>/like_unlike', methods=['POST', 'DELETE'])
def posts_liked(post_id, username):
    user = User.query.filter(User.username == username).first()
    post = Post.query.filter(Post.id == post_id).first()

    if request.method == 'POST':
        user.liked.append(post)
        db.session.commit()
        return jsonify("Success"), 200
    elif request.method == 'DELETE':
        for liked_post in user.liked:
            if liked_post == post:
                user.liked.remove(liked_post)
                db.session.commit() 
                return post_schema.jsonify("Success"), 200



@app.route('/<string:username>/liked', methods=['GET'])
def get_liked(username):
    user = User.query.filter(User.username == username).first()
    return posts_schema.jsonify(user.liked), 200


@app.route('/<int:post_id>/<string:username>/save_unsave', methods=['POST', 'DELETE'])
def save_post(post_id, username):
    user = User.query.filter(User.username == username).first()
    post = Post.query.filter(Post.id == post_id).first()

    if request.method == 'POST':
        user.saved.append(post)
        db.session.commit()
        return jsonify("Success"), 200
    elif request.method == 'DELETE':
        for saved_post in user.saved:
            if saved_post == post:
                user.saved.remove(saved_post)
                db.session.commit() 
                return post_schema.jsonify("Success"), 200

@app.route('/<string:username>/saved', methods=['GET'])
def get_saved(username):
    user = User.query.filter(User.username == username).first()
    return posts_schema.jsonify(user.saved), 200


@app.route("/me", methods=['GET'])
def get_current_user():
    username = session.get("user")
    if username:
        user = User.query.filter(User.username == username).first()
        return user_schema.jsonify(user), 200
    else:
        return jsonify({"Error":"Got Nothing"}), 400



@app.route("/users", methods=['GET'])
def get_user():
    users = User.query.all()

    if request.method == 'GET':
        return users_schema.jsonify(users), 200



@app.route('/<string:username>', methods=['GET', 'PATCH', "DELETE"])
def user_profile(username):
    user = User.query.filter(User.username == username).first()
    
    if request.method == 'GET':
        return user_schema.jsonify(user), 200
        
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify("Successfully Deleted"), 200

    elif request.method == 'PATCH':
        data = request.get_json()
        errors = user_schema.validate(data)

        if errors:
            return {"Error": f"{errors}"}, 400
        elif 'username' in data:
            user.username = data['username']
        elif 'first_name' in data:
            user.first_name = data['first_name']
        elif 'last_name' in data:
            user.last_name = data['last_name']
        elif 'password' in data:
            user.password = bcrypt.generate_password_hash(data['password'])
        elif 'followers' in data:
            user.followers = data['followers']
        elif 'following' in data:
            user.following = data['following']
        elif 'bio' in data:
            user.bio = data['bio']
        elif 'lift_type' in data:
            user.lift_type = data['lift_type']
        elif 'email' in data:
            user.email = data['email']
        elif 'background_image' in data:
            user.background_image = data['background_image']
        elif 'profile_picture' in data:
            user.profile_picture = data['profile_picture']

        db.session.commit()
        return user_schema.jsonify(user)




@app.route('/<string:username>/friends', methods=['GET', 'POST'])
def friends(username):
    user = User.query.filter(User.username == username).first()
    friends = []

    if request.method == "GET":
        for friend in user.friends:
            friends.append(User.query.filter(User.username == friend.name).first())

        return users_schema.jsonify(friends), 200
        

    if request.method == 'POST':
        data = request.get_json()

        new_friend = Friends(
            data['user_id'],
            data["name"]
            )

        db.session.add(new_friend)
        db.session.commit()

        return friend_schema.jsonify(new_friend), 200

@app.route("/chats/<string:username>", methods=['GET', 'POST'])
def handle_chats(username):
    user = User.query.filter(User.username == username).first()

    if request.method == 'GET':
        return chats_schema.jsonify(user.chats),200
    elif request.method == 'POST':
        data = request.get_json()

        new_chat = Chat(data["chat_name"], data["user_id"])

        db.session.add(new_chat)
        db.session.commit()

        return chat_schema.jsonify(new_chat), 200

@app.route("/messages/<int:chat_id>", methods=['GET', 'POST'])
def handle_messages(chat_id):
    chat = Chat.query.filter(User.id == chat_id).first()

    if request.method == 'GET':
        return messages_schema.jsonify(chat.messages), 200
    elif request.method == 'POST':
        data = request.get_json()

        new_message = Messages(data["message_body"], data["message_user"], chat_id)

        db.session.add(new_message)
        db.session.commit()

        return message_schema.jsonify(new_message), 200

@socketio.on("connect")
def handle_connect():
    print("Client connected!")


@socketio.on("user_join")
def handle_user_join(username):
    print(f"User {username} joined!")


@socketio.on("new_message")
def handle_new_message(message):
    print(f"New Message: {message}")
    emit("chat", {"message": message}, brodcast=True)

if __name__ == '__main__':
    socketio.run(app)