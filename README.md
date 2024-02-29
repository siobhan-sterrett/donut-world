# donut-world

There is a world, shaped like a torus. There is a sun -- a point light source -- which travels in a figure-8 around and through the center of the torus.

This is a tool which attempts to shed light (heh) on a very specific question: for a viewer at a given point on the world's surface, at which points in its orbit is the sun visible?

## Terminology

The following terminology is used in this app:

### Toroidal Aspect Ratio

A [torus|https://en.wikipedia.org/wiki/Torus] has two radii:

- The major radius _R_, being the distance from the center of the torus to the center of the "tube"
- The minor radius _r_, being the radius of the tube.

The _aspect ratio_ of the torus is the ratio of these two values, _R_ / _r_.

### Viewer azimuth

The _azimuth_ is the horizontal angle of the viewer, as measured counter-clockwise around the center of the torus, from the position of the sun at time t = 0.

### Viewer latitude

The _latitude_ is the vertical angle of the viewer, as measured from the outer rim of the torus.
