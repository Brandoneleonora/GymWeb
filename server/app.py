from flask import request, jsonify, session
from config import app, db, bcrypt
from models import User, Post, UserSchema, PostSchema

app.secret_key = b'\xd5e\xc5M\x9fS\x81~U\xa8x\xc2\xec@r\x84'

#Masrshmallow Schemmas
user_schema = UserSchema()
users_schema = UserSchema(many=True)

post_schema = PostSchema()
posts_schema = PostSchema(many=True)


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
            bcrypt.generate_password_hash(data['password'])
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

@app.route("/checksession", methods=['GET'])
def check_session():
    if request.method == 'GET':
        if "user" in session:
            user = User.query.filter(User.username == session["user"]).first()
            return user_schema.jsonify(user), 200
        else:
            return jsonify("need to sign in"), 400
        
@app.route('/', methods=['GET'])
def home():
    if request.method == 'GET':
       users = User.query.all()
       return jsonify(users_schema.dump(users)), 200


@app.route('/posts/<string:postFilter>', methods = ['POST', 'GET'])
def allPosts(postFilter):

    if request.method == 'GET' and postFilter.lower() == 'all':
        posts = Post.query.all()
        return jsonify(posts_schema.dump(posts)), 200
    elif request.method =='GET' and postFilter.lower() == 'powerlifter':
        posts = Post.query.filter_by(post_type = postFilter.lower()).all()
        return jsonify(posts_schema.dump(posts)), 200
    elif request.method =='GET' and postFilter.lower() == 'powerbuilder':
        posts = Post.query.filter_by(post_type = postFilter.lower()).all()
        return jsonify(posts_schema.dump(posts)), 200
    elif request.method =='GET' and postFilter.lower() == 'bodybuilder':
        posts = Post.query.filter_by(post_type = postFilter.lower()).all()
        return jsonify(posts_schema.dump(posts)), 200
    elif request.method =='GET' and postFilter.lower() == 'crossfit':
        posts = Post.query.filter_by(post_type = postFilter.lower()).all()
        return jsonify(posts_schema.dump(posts)), 200
    elif request.method =='GET' and postFilter.lower() == 'workingout':
        posts = Post.query.filter_by(post_type = postFilter.lower()).all()
        return jsonify(posts_schema.dump(posts)), 200

    elif request.method == 'POST':
        data = request.get_json()

        new_post = Post(
            data['post_type'].lower(),
            data['body'],
            data['user'],
            data['post_username'],
            data['image']
        )

        db.session.add(new_post)
        db.session.commit()

        return post_schema.jsonify(new_post), 200

@app.route('/profile/<string:username>', methods=['GET', 'PATCH'])
def user_profile(username):
    user = User.query.filter(User.username == username).first()
    
    if request.method == 'GET':
        return user_schema.jsonify(user), 200

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

        db.session.commit()
        return user_schema.jsonify(user)

if __name__ == '__main__':
    app.run(debug=True)