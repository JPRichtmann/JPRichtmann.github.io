# -*- coding: utf-8 -*-
import json
import re
import requests

def get_api():
    response = requests.get(url='https://www.climatewatchdata.org/api/v1/data/historical_emissions?source_ids[]=106&gas_ids[]=317&sector_ids[]=1242&&sort_dir=DESC')
    response = response.json()
    with open("static/historical_emissions.json", "w", encoding="UTF-8") as jsonFile:
        json.dump(response, jsonFile)
#with open("static/historical_emissions.json", "r") as jsonFile:
#data = json.load(jsonFile)

def parse_emission_by_country():
    with open('static/historical_emissions.json', encoding="UTF-8") as json_file:
        data = json.load(json_file)
        new_emission_list = []
    
        for value in data['data']:
            print(value) #if add if function to form dictionary
            country = value['country']
            print(country)
            iso_code3 = value['iso_code3']
            print(iso_code3)
            for item in value['emissions']:
                print(item)
                year = item['year']
                emission = item['value']
                new_emission_list.append({'ISO_A3':iso_code3,'country': country, 'year': year, 'emission': emission})
    print(new_emission_list)
#        for country_stat in value['country']:
#           print (country_stat)
    with open('static/result.json', 'w', encoding="UTF-8") as result_json:
        json.dump(new_emission_list, result_json)

def main_scraper():
    get_api()
    parse_emission_by_country()

#boilerplate code that protects users from accidentally invoking the script
if __name__ == '__main__':
    main_scraper()