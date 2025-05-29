# app/routes/public.py

from flask import Blueprint, render_template
from datetime import datetime
public_bp = Blueprint('public', __name__)

# --- Core Pages ---




@public_bp.context_processor
def inject_current_year():
    return {'current_year': datetime.now().year} 

@public_bp.route('/')
def index():
    return render_template('index.html')

@public_bp.route('/about')
def about():
    return render_template('about.html')

@public_bp.route('/contact')
def contact():
    return render_template('contact.html')

@public_bp.route('/gallery')
def gallery():
    # Assuming gallery.html is at the root of templates, or adjust if it's in gallery/index.html
    return render_template('gallery.html')

@public_bp.route('/testimonials')
def testimonials():
    # Assuming testimonials.html is at the root of templates
    return render_template('testimonials.html')

# --- Academics Section ---
@public_bp.route('/academics/') # Main academics/programs page
@public_bp.route('/academics/programs')
def academics_programs():
    # Provide only the required pagination object for template compatibility
    class DummyPagination:
        pages = 1
        page = 1
        has_prev = False
        has_next = False
        prev_num = 1
        next_num = 1
        def iter_pages(self, left_edge=1, right_edge=1, left_current=2, right_current=2):
            return [1]
    pagination = DummyPagination()
    return render_template('academics/programs.html', pagination=pagination)

@public_bp.route('/academics/faculties')
def academics_faculties():
    return render_template('academics/faculties.html')

@public_bp.route('/academics/departments')
def academics_departments():
    return render_template('academics/departments.html')

@public_bp.route('/academics/research')
def academics_research():
    # Provide empty/dummy context to avoid template errors
    research = {
        "title": "Research Project Title",
        "funding_type": "",
        "status": "",
        "year": "",
        "team": [],
        "overview": "",
        "methodology": "",
        "findings": "",
        "funding_amount": "",
        "duration": "",
        "collaborators": "",
        "doi": "",
        "publications": [],
        "download_link": "#"
    }
    related_research = []
    return render_template('academics/research.html', research=research, related_research=related_research)
# --- Admissions Section ---

@public_bp.route('/admissions/')
def admissions_index():
    # This is the main /admissions/ page
    return render_template('admissions/index.html', 
                           page_title="Admissions Overview") # Example context

@public_bp.route('/admissions/apply/')
def admissions_apply():
    return render_template('admissions/apply.html', 
                           page_title="How to Apply")

@public_bp.route('/admissions/requirements/')
def admissions_requirements():
    return render_template('admissions/requirements.html', 
                           page_title="Admission Requirements")

# You might also want a route for programs if it's under admissions
@public_bp.route('/admissions/programs/')
def admissions_programs():
    # You might reuse an existing programs template or create a new one
    return render_template('admissions/programs.html', # or 'programs/index.html'
                           page_title="Programs Offered")

# --- News Section ---
@public_bp.route('/news/') # Main news listing page
def news_index():
    # Dummy data for demonstration; replace with real query logic as needed
    news_items = []  # List of news items, e.g., from a database
    error = None

    # Dummy pagination object for template compatibility
    class DummyPagination:
        pages = 1
        page = 1
        has_prev = False
        has_next = False
        prev_num = 1
        next_num = 1
        def iter_pages(self, left_edge=1, right_edge=1, left_current=2, right_current=2):
            return [1]

    pagination = DummyPagination()

    return render_template(
        'news/index.html',
        news_items=news_items,
        pagination=pagination,
        error=error
    )

@public_bp.route('/news/<slug>') # Using slug for more SEO friendly URLs
def news_detail(slug):
    # Here, you would typically fetch the news item from a database using the slug
    # For now, just rendering a template and passing the slug
    return render_template('news/detail.html', news_slug=slug) # Assuming detail template is news/detail.html or news/[slug].html

# --- Events Section ---
@public_bp.route('/events/') # Main events listing page
def events_index(): # Changed function name
    return render_template('events/index.html')

@public_bp.route('/events/<slug>') # Using slug
def event_detail(slug):
    # Fetch event by slug
    return render_template('events/detail.html', event_slug=slug) # Assuming detail template is events/detail.html


# --- Student Life Section ---
@public_bp.route('/student-life/') # Main student life page
def student_life_index(): # Changed function name
    return render_template('student-life/index.html') # Note: template folder has hyphen

@public_bp.route('/student-life/housing')
def student_life_housing():
    return render_template('student-life/housing.html')

@public_bp.route('/student-life/clubs')
def student_life_clubs():
    return render_template('student-life/clubs.html')

@public_bp.route('/student-life/sports')
def student_life_sports():
    return render_template('student-life/sports.html')


# --- Legal Pages ---
@public_bp.route('/legal/privacy')
def legal_privacy():
    return render_template('legal/privacy.html')

@public_bp.route('/legal/terms')
def legal_terms():
    return render_template('legal/terms.html')

@public_bp.route('/legal/sitemap')
def legal_sitemap():
    # Assuming sitemap.html is for users, not an XML sitemap for search engines
    return render_template('legal/sitemap.html')


# --- Support Pages ---
@public_bp.route('/support/donate')
def support_donate():
    return render_template('support/donate.html')

@public_bp.route('/support/careers')
def support_careers():
    return render_template('support/careers.html')


# --- General Research (if different from academics/research) ---
# If you have a top-level research section separate from academics/research
@public_bp.route('/research/')
def research_index():
    # This assumes a templates/research/index.html or templates/research.html
    # If it's the same as academics/research, you might redirect or choose one canonical URL
    return render_template('research.html') # Or 'research/index.html'

@public_bp.route('/research/<research_id>') # Or <slug>
def research_detail_page(research_id): # Renamed to avoid conflict
    return render_template('research_detail.html', research_id=research_id) # Or 'research/detail.html'


# --- Services (if applicable, was in original, not in new template structure) ---
# If you still have a services section:
# @public_bp.route('/services')
# def services():
#     return render_template('services.html') # or services/index.html

# @public_bp.route('/services/<service_id>')
# def service_detail(service_id):
#     return render_template('service_detail.html', service_id=service_id) # or services/detail.html


# --- Error Handlers (better placed in app/__init__.py or a dedicated error handling file) ---
# However, keeping them here if they are simple.
# For these to work as actual error handlers for HTTP errors,
# they should be registered with @app.errorhandler(404) in create_app() context
# or @public_bp.app_errorhandler(404)
# The routes below are for directly navigating to see the error page templates.

@public_bp.route('/show/404') # Route to view the 404 page template
def show_404():
    return render_template('errors/404.html'), 404

@public_bp.route('/show/500') # Route to view the 500 page template
def show_500():
    return render_template('errors/500.html'), 500

# It's better to register actual error handlers in your app factory (app/__init__.py)
# like this:
#
# def create_app():
#     app = Flask(__name__)
#     # ...
#
#     @app.errorhandler(404)
#     def page_not_found_error(error):
#         return render_template('errors/404.html'), 404
#
#     @app.errorhandler(500)
#     def internal_server_error_handler(error):
#         return render_template('errors/500.html'), 500
#
#     register_routes(app)
#     return app