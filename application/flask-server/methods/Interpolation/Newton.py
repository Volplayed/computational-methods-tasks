import numpy as np
import operator
import matplotlib.pyplot as plt
from flask import send_file

def newton_interpolation(x: np.ndarray, y: np.ndarray, x0):
    """
    Interpolates a function using the Newtons polinoimial method

    Parameters
    ----------
    x : numpy.ndarray
        A horizontal vector with the equidistant x values of the points
    y : numpy.ndarray
        A horizontal vector with the y values of the points
    x0 : float
        The value to evaluate the function

    Returns
    -------
    y0 : float
        The value of the function at x0
    """

    def divided_diff(x, j, k):
        if k == 0:
            return y[j]
        else:
            return (divided_diff(x, j + 1, k - 1) - divided_diff(x, j, k - 1)) / (x[j + k] - x[j])

    def newton_temp(x0):
        n = len(x)
        result = 0.0
        for k in range(n):
            term = divided_diff(x, 0, k)
            for j in range(k):
                term *= (x0 - x[j])
            result += term
        return result
    
    y0 = newton_temp(x0)
    x_list = np.linspace(np.min(x), np.max(x), 100)
    y_list = newton_temp(x_list)

    return {"x0":x0, "y0" : y0, "method" : "Newton Interpolation", "x_list" : x_list.tolist(), "y_list" : y_list.tolist()}

def plot_newton(x, y):
    fig = plt.figure()
    ax = fig.gca()
    ax.spines['left'].set_position('center')
    ax.spines['bottom'].set_position('center')

    # Eliminate upper and right axes
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')

    # Show ticks in the left and lower axes only
    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')
    m = max(abs(x[0]), abs(x[-1]))*2
    ax.set_ylim(ymin=-m, ymax=m)
    ax.set_xlim(xmin=-m, xmax=m)

    ax.plot(x, y)

    # Save the plot to a file (e.g., in SVG format)
    plt.savefig('plot.svg')

    return send_file('plot.svg', mimetype='image/svg+xml')
