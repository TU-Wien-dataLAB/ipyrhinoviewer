
# ipyrhinoviewer

[![PYPI](https://img.shields.io/pypi/v/ipyrhinoviewer?color=%23)](https://pypi.org/project/ipyrhinoviewer/)
[![NPM](https://img.shields.io/npm/v/ipyrhinoviewer?color=%23)](https://www.npmjs.com/package/ipyrhinoviewer)
[![Build](https://img.shields.io/github/workflow/status/TU-Wien-dataLAB/ipyrhinoviewer/Build)](https://github.com/TU-Wien-dataLAB/ipyrhinoviewer/actions/workflows/build.yml)

A Custom Jupyter Rhino 3dm Viewer
## Usage
```python
from ipyrhinoviewer import RhinoViewer

v = RhinoViewer(path='../examples/rhino.3dm',
            width=1000,
            height=700,
            ambient_light={"color": "rgb(255,255,255)", "intensity": 1},
            background_color="rgb(200,200,200)",
            camera_pos=[15,15,15],
            look_at=[0,0,0],
            show_axes=True,
            grid={"size": 10, "divisions": 10})
```
**Required parameters**
* `path`: path to 3dm file

**Optional parameters**
* `width`: width of the viewer in px, should be between 100 and 3000
* `height`: height of the viewer in px, should be between 100 and 3000
* `ambient_light`: adds ambient light to the scene
* `background_color`: changes background color
* `camera_pos`: sets the camera position
* `look_at`: sets the point where the camera orbits around
* `show_axes`: adds an axes helper to the scene
* `grid`: adds a grid helper to the scene

## Installation

You can install using `pip`:

```bash
pip install ipyrhinoviewer
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] ipyrhinoviewer
```

## Development Installation

Create a dev environment:
```bash
conda create -n ipyrhinoviewer-dev -c conda-forge nodejs yarn python jupyterlab
conda activate ipyrhinoviewer-dev
```

Install the python. This will also build the TS package.
```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
yarn run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py ipyrhinoviewer
jupyter nbextension enable --sys-prefix --py ipyrhinoviewer
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes
#### Typescript:
If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.
