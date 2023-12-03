import numpy as np
import sympy as sp
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

def integral(method, f, a, b, n):
    f_string = f
    f = parse_expression(f, 'x')
    h = (b-a)/n
    res = 0
    if method == "rectangle":
        for i in range(n):
            res += f(a + i*h)*h
    
    elif method == "trapezoid":
        res += f(a) + f(b)
    
        for i in range(1,n):
            k = a + i*h
            res += 2 * f(k)
        res *= h/2
    
    elif method == "simpson":
        res += f(a)*h/3
        res+= f(b)*h/3
        for i in range(0, n):
            if i%2 == 0:
                res += f(a + i*h)*2*h/3
            else:
                res += f(a + i*h)*4*h/3
    else:
        return {"method" : "error", "error" : "Invalid method"}

    return {"result" : res, "method" : "Numerical integration", "a" : a, "b" : b, "n" : n, "function": f_string}
