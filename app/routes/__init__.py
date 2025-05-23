from .admin import admin_bp
from .portal import portal_bp
from .public import public_bp

__all__ = ['public_bp', 'portal_bp', 'admin_bp']  # optional but clean

# Optional: keep central registration for larger apps
def register_routes(app):
    app.register_blueprint(public_bp)
    app.register_blueprint(portal_bp, url_prefix='/portal')
    app.register_blueprint(admin_bp, url_prefix='/admin')
