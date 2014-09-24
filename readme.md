# SVGPathNormalizer #

Most modern web browsers do not implement [SVGAnimatedPathData.normalizedPathSegList](http://www.w3.org/TR/SVG/paths.html#InterfaceSVGAnimatedPathData) probably because of its severe specification : for example, it is too difficult to express elliptical arcs by cubic bezier curves.

This normalizer expresses paths using the following commands only :

- SVG_PATHSEG_MOVETO_ABS (M),
- SVG_PATHSEG_LINETO_ABS (L),
- SVG_PATHSEG_CURVETO_CUBIC_ABS (C),
- SVG_PATHSEG_CURVETO_QUADRATIC_ABS (Q),
- SVG_PATHSEG_ARC_ABS (A) and
- SVG_PATHSEG_CLOSEPATH (z).

## License ##
MIT License. See `LICENSE` file for more details.

## Usage ##
1. Import the file `svgpathnormalizer.js` in your HTML or SVG document
1. Get reference to `<path>` element. For example, use `document.getElementById(idString)`
1. Get an instance of `SVGPathSegList` via `pathSegList` property of the `<path>` element
1. Call `SVGPathNormalizer.normalize` function with just one argument : the instance of `SVGPathSegList`
1. You will get another instance of `SVGPathSegList` which is normalized.

Please note that the original `<path>` will NOT be modified even if you modify the returned instance of `SVGPathSegList`.

## Requirement ##
Your runtime environment MUST support SVG 1.1. Most modern web browsers - including Internet Explorer 11 - match the requirement.

