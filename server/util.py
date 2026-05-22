import json
import pickle
import os
import numpy as np

__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bath, bhk):
    try:
        loc_index = [col.lower() for col in __data_columns].index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if loc_index >= 0:
        x[loc_index] = 1

    prediction = round(__model.predict([x])[0], 2)

    return abs(prediction)


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("Loading saved artifacts...start")

    global __data_columns
    global __locations
    global __model

    artifacts_path = os.path.join(os.path.dirname(__file__), "artifacts")

    with open(os.path.join(artifacts_path, "columns.json"), "r") as f:
        __data_columns = json.load(f)["data columns"]
        __locations = __data_columns[3:]

    with open(os.path.join(artifacts_path, "banglore_home_prices_model.pkl"), "rb") as f:
        __model = pickle.load(f)

    print("Loading saved artifacts...done")


if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price("1st Phase JP Nagar", 1000, 3, 3))
    print(get_estimated_price("1st Phase JP Nagar", 1000, 2, 2))
    print(get_estimated_price("Kalhalli", 1000, 2, 2))
    print(get_estimated_price("Ejipura", 1000, 2, 2))