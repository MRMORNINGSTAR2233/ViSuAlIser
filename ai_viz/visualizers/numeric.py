import matplotlib.pyplot as plt
import pandas as pd

def plot_tabular(data, **kwargs):
    """
    Create a basic plot for numeric/tabular data.
    """
    figsize = kwargs.get("figsize", (10, 6))
    fig, ax = plt.subplots(figsize=figsize)
    # If the data has a plot method (like a DataFrame), use it.
    if hasattr(data, "plot"):
        data.plot(ax=ax)
    else:
        pd.DataFrame(data).plot(ax=ax)
    plt.tight_layout()
    return fig
