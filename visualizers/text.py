import matplotlib.pyplot as plt

def plot_text(data, **kwargs):
    """
    Render text data in a Matplotlib figure.
    """
    figsize = kwargs.get("figsize", (10, 4))
    fig, ax = plt.subplots(figsize=figsize)
    if isinstance(data, list):
        text_str = "\n".join(data)
    else:
        text_str = str(data)
    ax.text(0.5, 0.5, text_str, fontsize=12, ha="center", va="center", wrap=True)
    ax.axis("off")
    plt.tight_layout()
    return fig
