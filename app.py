from flask import Flask, render_template

app = Flask(__name__)   # ← This line is missing in your file

# ==============================
# MAIN WEBSITE ROUTES
# ==============================

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/gallery')
def gallery():
    return render_template('gallery.html')


@app.route('/recruitment')
def recruitment():
    return render_template('recruitment.html')


@app.route('/clients')
def clients():
    return render_template('clients.html')


@app.route('/current-openings')
def current_openings():
    return render_template('current-openings.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/apply')
def apply():
    return render_template('apply.html')

@app.route('/fillBiodata')
def fillBiodata():
    return render_template('fill-biodata.html')

if __name__ == "__main__":
    app.run(debug=True)