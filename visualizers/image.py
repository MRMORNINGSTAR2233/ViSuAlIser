import matplotlib.pyplot as plt
from PIL import Image

def plot_image(data, **kwargs):
    """
    Display an image using Matplotlib.
    Data can be a PIL Image or a numpy array representing an image.
    """
    figsize = kwargs.get("figsize", (8, 8))
    fig, ax = plt.subplots(figsize=figsize)
    if isinstance(data, Image.Image):
        ax.imshow(data)
    else:
        ax.imshow(data)
    ax.axis("off")
    plt.tight_layout()
    return fig
