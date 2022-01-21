from flask import Flask
from apiv1 import blueprint as apiv1
from models import create_tables, populate_tables, drop_tables
import click
from peewee import *
from flask_cors import CORS

# ----------- APP SETUP ----------- #

app = Flask(__name__)
cors = CORS(app, resources={r"/wye/*": {"origins": "*"}})
app.register_blueprint(apiv1)
app.config.SWAGGER_UI_DOC_EXPANSION = 'list'

# ----------- CLI COMMANDS ----------- #

@app.cli.command()
def initdb():
    # creating the database
    create_tables()
    click.echo('Initialized the database.')

@app.cli.command()
def populatedb():
    # creating the database
    populate_tables()
    click.echo('Populated the database.')

@app.cli.command()
def dropdb():
    # dropping the database tables
    drop_tables()
    click.echo('Dropped tables from database.')

# ----------- RUNNING THE APP ----------- #

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)