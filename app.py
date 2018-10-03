#################################################
# Database Setup
#################################################
import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

#################################################
# Initialize Flask
#################################################

app = Flask(__name__)

# initialize db here
# drop 
# create from initdb.py

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///db/deaths.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to each table
deaths = Base.classes.cause_o_death

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/data")
def data():
    session = Session(engine)
    results = session.query(deaths).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

# #********************
# # TESTING
# #********************

#@app.route("/data/<year>", defaults={"cause":None})
@app.route("/data/<year>+<cause>")
# CHOROPLETH: all states, single year, and cause of death
def year(year, cause):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year == year).filter(deaths.cause == cause).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

@app.route("/data/<year>")
# CHOROPLETH: all states, single year, and cause of death
def year(year, cause):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year == year).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

# USER TABE: year, state, cause

if __name__ == "__main__":
    app.run()
