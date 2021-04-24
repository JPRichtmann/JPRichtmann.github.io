from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from scraper import main_scraper
import json
import random

import atexit
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/country")
@cross_origin()
def get_emission_by_country():
    with open('final/result.json', encoding="UTF-8") as json_file:
        data = json.load(json_file)
    return jsonify(data)


@app.route('/country-api')
@cross_origin()
def get_country_api():
    with open('mid/result.json', encoding="UTF-8") as json_file:
        data = json.load(json_file)
    return jsonify(data)

@app.route('/')
@cross_origin()
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"


def scraper_interval():
    print("scraper run")
    try:
        main_scraper()
    except Exception as e:
        print(e)


sched = BackgroundScheduler(daemon=True)
sched.add_job(scraper_interval, 'interval', weeks=4)
sched.start()
atexit.register(lambda: sched.shutdown())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
