from flask import Flask
from .routes import register_routes  # import the central function

def create_app():
    app = Flask(__name__)
    app.secret_key = 'your_secret_key'

    register_routes(app)  # single entry point for all routes

    return app
