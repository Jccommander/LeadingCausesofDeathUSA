# LeadingCausesofDeathUSA

Repository for project 2 on visualization

Heroku Instructions

#### Part 1: Configuration Files

* Created a new conda environment just for this app (named it "

```sh
conda create -n leading_causes_env python=3.6
```
```sh
source activate leading_causes_env
```

Install dependencies

```
pip install gunicorn
pip install psycopg2
pip install flask
pip install flask-sqlalchemy
pip install pandas
```

? Initialize the db

```sh
initdb.py
```

* test the app:

```sh
flask run
```

*  `pip freeze > requirements.txt`. Heroku will use this file to install all of the app's dependencies.
* The final configuration file that we need is `Procfile`. This file is used by Heroku to run the app.
```
touch Procfile
```

* Open Procfile in vscode and add the following line:
```
web: gunicorn app:app
```

#### Part 2: Creating the Heroku App

* On Heroku, go to the `Deploy` section of your app's homepage, and follow the steps to deploy the app.

#### Part 3: OPTIONAL FOR POSTGRES: 
Preparing the Database

* After creating a new app on Heroku, navigate to `Resources`:
* Under `Add-ons`, add `Heroku Postgres`. Make sure to use the free version.
* Click on the add on, then navigate to settings and click on `Reveal Config Variables`.
* The connection string to the database should now be available:
* Heroku will automatically assign this URI string to the `DATABASE_URL` environment variable that is used within `app.py`. The code that is already in `app.py` will be able to use that environment variable to connect to the Heroku database.

  ```python
  # DATABASE_URL will contain the database connection string:
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
  # Connects to the database using the app config
  db = SQLAlchemy(app)
  ```
* Your database is now initialized, and you can open the application using `heroku open` from the terminal.
