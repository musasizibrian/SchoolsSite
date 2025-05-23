from flask import Blueprint, render_template

portal_bp = Blueprint('portal', __name__)

@portal_bp.route("/login")
def login():
    return render_template("portal/login.html")  # Optional login page