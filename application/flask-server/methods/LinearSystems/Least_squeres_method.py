import numpy as np
import sympy as sp


def least_squeres(A, b):
    """
    Least squeres method


    Parameters
    ----------
    A : numpy.ndarray
        Matrix of coefficients
    b : numpy.ndarray
        Vector of free members  


    Returns
    -------
    numpy.ndarray
        Solution of the system
    """

    #check if the matrix determinant is zero if matrix is squere matrix
    if A.shape[0] == A.shape[1]:
        if np.linalg.det(A) == 0:
            return {"error" : "The determinant of the squere matrix is zero; no solution", "method" : "error"}

    iter = 0

    b = b.reshape(-1, 1)

    A_t = A.transpose()

    A_t_A = np.dot(A_t, A)
    A_t_b = np.dot(A_t, b)

    A_b = np.hstack([A_t_A, A_t_b])

    A_b = np.array(sp.Matrix(A_b).rref()[0])

    x = A_b[:, -1]

    return {"x_list" : x.astype(str).tolist(), "method" : "Least Squeres"}