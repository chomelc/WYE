from flask_restx import abort
from models import Dish, Item, MealDish, Day


# aborting operation if the corresponding slug doesn't exist
def abort_if_dish_doesnt_exist(dish_slug):
    query = Dish.select(Dish.slug).dicts()
    if dish_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(dish_slug))

# aborting operation if the corresponding slug doesn't exist
def abort_if_item_doesnt_exist(item_slug):
    query = Item.select(Item.slug).dicts()
    if item_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(item_slug))

# aborting operation if the corresponding id doesn't exist
def abort_if_meal_doesnt_exist(meal_id):
    query = MealDish.select(MealDish.meal).dicts()
    if meal_id not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(meal_id))

# aborting operation if the corresponding slug doesn't exist
def abort_if_day_doesnt_exist(day_slug):
    query = Day.select(Day.slug).dicts()
    if day_slug not in [value for elem in query
                      for value in elem.values()]:
        abort(404, message="'{}' doesn't exist".format(day_slug))