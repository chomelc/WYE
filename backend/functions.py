import datetime
import locale

locale.setlocale(locale.LC_TIME, "fr_FR.UTF-8")

def getDateDay(date):
    day, month, year = (int(x) for x in date.split('-'))    
    ans = datetime.date(year, month, day)
    return ans.strftime('%A').capitalize()