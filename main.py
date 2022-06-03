import numpy as np
import eel

@eel.expose
def solve_lg(odds, equals):
    print(odds)
    print(equals)
    try:
        solution = np.linalg.solve(odds, equals)
        return solution.tolist()
    except Exception as err:
        print(err)
        pass

@eel.expose
def solve_check(odds, equals):
    try:
        solution = np.linalg.solve(odds, equals)
        return True
    except:
        return False

eel.init('web')
eel.start('linalg.html', mode="chrome", size=(900, 780))