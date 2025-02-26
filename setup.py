from setuptools import setup, find_packages

setup(
    name="ai_viz",
    version="0.1.0",
    description="A versatile visualization package with AI integration.",
    author="Akshay",
    packages=find_packages(),
    install_requires=[
        "pandas",
        "matplotlib",
        "Pillow",
        "PyPDF2",
        "requests"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
    ],
)
