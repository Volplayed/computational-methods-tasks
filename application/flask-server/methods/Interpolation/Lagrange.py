import numpy as np
import operator
import matplotlib.pyplot as plt
from flask import send_file

def lagrange(x: np.ndarray, y: np.ndarray, x0):
    """
    Interpolates a function using the Lagrange method

    Parameters
    ----------
    x : numpy.ndarray
        A horizontal vector with the x values of the points
    y : numpy.ndarray
        A horizontal vector with the y values of the points
    x0 : float
        The value to evaluate the function

    Returns
    -------
    y0 : float
        The value of the function at x0
    """

    
    def lag_temp(xi):
        n = len(x)
        result = 0.0
        for i in range(n):
    
            # Compute individual terms of above formula
            term = y[i]
            for j in range(n):
                if j != i:
                    term = term * (xi - x[j]) / (x[i] - x[j])
    
            # Add current term to result
            result += term
    
        return result
    
    y0 = lag_temp(x0)
    x_list = np.linspace(np.min(x), np.max(x), 100)
    y_list = lag_temp(x_list)

    return {"x0":x0, "y0" : y0, "method" : "Lagrange", "x_list" : x_list.tolist(), "y_list" : y_list.tolist()}



def plot_lagrange(x, y):

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

