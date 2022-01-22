import datetime
import locale

from unidecode import unidecode

locale.setlocale(locale.LC_TIME, "fr_FR.UTF-8")

# get the day corresponding to a date, in french
def getDateDay(date):
    day, month, year = (int(x) for x in date.split('-'))    
    ans = datetime.date(year, month, day)
    return ans.strftime('%A').capitalize()

def getUserInitials(first_name, last_name):
    return first_name[0]+last_name[0]

def getUserSlug(first_name, last_name):
    return unidecode(first_name).lower()+"_"+unidecode(last_name).lower()

def getDishSlug(name):
    return unidecode(name).lower()