from flask import Flask
from flask_cors import CORS 
from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
#Init app
app = Flask(__name__)
socketio = SocketIO(app)
#Add Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'
app.config['SQLALCHEMY_TRACK-MODIFICATIONS'] = False
#Init database
db = SQLAlchemy(app)
#Init Marshmallow
ma = Marshmallow(app)
#Init migrate
migrate = Migrate(app, db)
#Init Cors
CORS(app)
#Init Bcrypt
bcrypt = Bcrypt(app)