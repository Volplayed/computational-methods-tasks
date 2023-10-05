import numpy as np

def swap_first_nonzero(matrix, col, b):
    """
    Swaps the first nonzero element in a column with the first element in the column.

    Parameters
    ----------
    matrix : numpy.ndarray
        The matrix to swap the elements in.
    b : numpy.ndarray
        The vector to swap the elements in.
    col : int
        The column to swap the elements in.

    Returns
    -------
    numpy.ndarray
        The matrix with the elements swapped.
    """
    for i in range(col, len(matrix)):
        if matrix[i][col] != 0:
            matrix[[col, i]] = matrix[[i, col]]
            b[[col, i]] = b[[i, col]]
            return matrix, b

def forward(A, b):
    """
    Converts matrix A into an upper triangular matrix

    Parameters
    ----------
    A : numpy.ndarray
        A square matrix
    b : numpy.ndarray
        A vertical vector
    
    Returns
    -------
    A : numpy.ndarray
        Upper triangular matrix
    """

    A = A.astype(np.float64)
    b = b.astype(float)

    n = len(A)
    for i in range(n-1):
        A, b = swap_first_nonzero(A, i, b)
        for j in range(i+1, n):
            m = A[j][i]/A[i][i]
            A[j] = A[j] - m*A[i]
            b[j] = b[j] - m*b[i]
            
    return A, b


def backward(A_tri, b):
    """
    Solves a system of equations given an upper triangular matrix

    Parameters
    ----------
    A_tri : numpy.ndarray
        A square upper triangular matrix
    b : numpy.ndarray
        A vertical vector
    
    Returns
    -------
    x : numpy.ndarray
        The solution to the system of equations
    """

    n = len(A_tri)
    x = np.zeros(n)
    for i in range(n-1, -1, -1):
        x[i] = (b[i] - np.dot(A_tri[i][i+1:], x[i+1:])) / A_tri[i][i]
    return x

def gauss_method(A, b):
    """
    Solves a system of equations given a square matrix using the Gauss method

    Parameters
    ----------
    A : numpy.ndarray
        A square matrix
    b : numpy.ndarray
        A vertical vector
    
    Returns
    -------
    x : numpy.ndarray
        The solution to the system of equations
    """

    A_tri, b = forward(A, b)

    return {"x_list" : list(backward(A_tri, b)), "method": "Gauss", "b": list(b)}
