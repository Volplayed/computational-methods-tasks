import numpy as np
import matplotlib.pyplot as plt
import sympy as sp
import io

def parse_expression(expression_str, variable):
    """
    Parse an expression from a string to a Python function.

    Parameters
    ----------
    expression_str: str
        The mathematical expression as a string.
    variable: str
        The variable in the expression.

    Returns:
    - A Python function representing the parsed expression.
    """
    x = sp.symbols(variable)
    parsed_expr = sp.sympify(expression_str)
    func = sp.lambdify(x, parsed_expr, 'numpy')
    return func


def create_plot_iteration(f, df, x, a, b):
    """
    Visualize the function and the tangent line at the given point.

    Parameters
    ----------
    f: function
        The function to visualize.
    tangent: function
        The tangent line to visualize.
    x: float
        The point at which the tangent line is drawn.
    a: float
        The left boundary of the plot.
    b: float
        The right boundary of the plot.
    """
    #parse the function and its derivative
    f = parse_expression(f, 'x')
    df = parse_expression(df, 'x')

    tangent = lambda a: df(x[-1]) * (a - x[-1]) + f(x[-1])

    x_space = np.linspace(a-10, b+10, 1000)
    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)
    # Move left y-axis and bottom x-axis to centre, passing through (0,0)
    ax.spines['left'].set_position('center')
    ax.spines['bottom'].set_position('center')

    # Eliminate upper and right axes
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')

    # Show ticks in the left and lower axes only
    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')
    m = max(abs(a), abs(b))*2
    ax.set_ylim(ymin=-m, ymax=m)
    ax.set_xlim(xmin=-m, xmax=m)

    ax.plot(x_space, f(x_space), color='blue')

    # Plot tangent line
    ax.plot(x_space, tangent(x_space), color='red')

    # Plot tangent point (last point in the iteration)
    ax.scatter(x[-1], tangent(x[-1]), color='red')

    # Plot every approximation point
    ax.scatter(x, np.zeros(len(x)), color='green')

    #plot vertical -- line
    ax.axvline(x=a, color='k', linestyle='--', alpha=0.5)
    ax.axvline(x=b, color='k', linestyle='--', alpha=0.5)

    plt.tight_layout()

    # Annotate the approximation points
    for i in range(len(x)):
        ax.annotate(f'$x_{i+1}$', (x[i], 0), xytext=(x[i] + 0.1, 0.1))

    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    return bytes_image
