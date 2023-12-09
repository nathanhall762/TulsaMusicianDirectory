from setuptools import setup, find_packages

setup(
    name='cosine_sim',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        "numpy==1.24.3",
        "scikit-learn==1.3.0",
        "pandas==1.5.3",
        "flask==2.3.2",
        "flask_cors==3.0.10"
    ],
)
