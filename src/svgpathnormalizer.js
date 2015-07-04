/**
 * SVGPathNormalizer
 * https://github.com/motooka/SVGPathNormalizer
 * 
 * Copyright (c) Tadahisa Motooka
 * Licensed under the MIT license
 * See the file "LICENSE" for more detail.
 * 
 */
var SVGPathNormalizer = {};

SVGPathNormalizer.normalize = function(pathSegList) {
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	var newPathSegList = path.pathSegList;
	var seg = null;
	var newSeg = null;
	var curX = 0;
	var curY = 0;
	var newX = 0;
	var newY = 0;
	var startX = null;
	var startY = null;
	var lastCommandIsCubicBezier = false;
	var lastCommandIsQuadraticBezier = false;
	var lastControlX = null;
	var lastControlY = null;
	var thisCommandIsCubicBezier = false;
	var thisCommandIsQuadraticBezier = false;
	
	
	for(var i=0; i<pathSegList.numberOfItems; i++) {
		seg = pathSegList.getItem(i);
		thisCommandIsCubicBezier = false;
		thisCommandIsQuadraticBezier = false;
		switch(seg.pathSegType) {
			// z
			case SVGPathSeg.PATHSEG_CLOSEPATH:
				newX = startX;
				newY = startY;
				newSeg = path.createSVGPathSegClosePath();
				startX = null;
				startY = null;
				break;
			
			// M
			case SVGPathSeg.PATHSEG_MOVETO_ABS:
				newX = seg.x;
				newY = seg.y;
				newSeg = path.createSVGPathSegMovetoAbs(newX, newY);
				break;
			
			// m
			case SVGPathSeg.PATHSEG_MOVETO_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				newSeg = path.createSVGPathSegMovetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_LINETO_ABS:
				newX = seg.x;
				newY = seg.y;
				newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_LINETO_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
				newX = seg.x;
				newY = seg.y;
				lastControlX = seg.x2;
				lastControlY = seg.y2;
				newSeg = path.createSVGPathSegCurvetoCubicAbs(newX, newY, seg.x1, seg.y1, seg.x2, seg.y2);
				thisCommandIsCubicBezier = true;
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				lastControlX = curX + seg.x2;
				lastControlY = curY + seg.y2;
				newSeg = path.createSVGPathSegCurvetoCubicAbs(newX, newY, (curX + seg.x1), (curY + seg.y1), (curX + seg.x2), (curY + seg.y2));
				thisCommandIsCubicBezier = true;
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
				newX = seg.x;
				newY = seg.y;
				lastControlX = seg.x1;
				lastControlY = seg.y1;
				newSeg = path.createSVGPathSegCurvetoQuadraticAbs(newX, newY, seg.x1, seg.y1);
				thisCommandIsQuadraticBezier = true;
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				lastControlX = curX + seg.x1;
				lastControlY = curY + seg.y1;
				newSeg = path.createSVGPathSegCurvetoQuadraticAbs(newX, newY, (curX + seg.x1), (curY + seg.y1));
				thisCommandIsQuadraticBezier = true;
				break;
			
			case SVGPathSeg.PATHSEG_ARC_ABS:
				newX = seg.x;
				newY = seg.y;
				newSeg = path.createSVGPathSegArcAbs(newX, newY, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag);
				break;
			
			case SVGPathSeg.PATHSEG_ARC_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				newSeg = path.createSVGPathSegArcAbs(newX, newY, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag);
				break;
			
			case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
				newX = seg.x;
				newY = curY;
				newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
				newX = curX + seg.x;
				newY = curY;
				newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
				newX = curX;
				newY = seg.y;
				newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
				newX = curX;
				newY = curY + seg.y;
				newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
				newX = seg.x;
				newY = seg.y;
				var firstControlX = curX;
				var firstControlY = curY;
				if(lastCommandIsCubicBezier) {
					var refl = SVGPathNormalizer.getReflectionPoint(lastControlX, lastControlY, curX, curY);
					firstControlX = refl.x;
					firstControlY = refl.y;
				}
				lastControlX = seg.x2;
				lastControlY = seg.y2;
				newSeg = path.createSVGPathSegCurvetoCubicAbs(newX, newY, firstControlX, firstControlY, lastControlX, lastControlY);
				thisCommandIsCubicBezier = true;
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				var firstControlX = curX;
				var firstControlY = curY;
				if(lastCommandIsCubicBezier) {
					var refl = SVGPathNormalizer.getReflectionPoint(lastControlX, lastControlY, curX, curY);
					firstControlX = refl.x;
					firstControlY = refl.y;
				}
				lastControlX = (curX + seg.x2);
				lastControlY = (curY + seg.y2);
				newSeg = path.createSVGPathSegCurvetoCubicAbs(newX, newY, firstControlX, firstControlY, lastControlX, lastControlY);
				thisCommandIsCubicBezier = true;
				break;
				
			case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
				newX = seg.x;
				newY = seg.y;
				var firstControlX = curX;
				var firstControlY = curY;
				if(lastCommandIsQuadraticBezier) {
					var refl = SVGPathNormalizer.getReflectionPoint(lastControlX, lastControlY, curX, curY);
					firstControlX = refl.x;
					firstControlY = refl.y;
				}
				newSeg = path.createSVGPathSegCurvetoQuadraticAbs(newX, newY, firstControlX, firstControlY);
				lastControlX = firstControlX;
				lastControlY = firstControlY;
				thisCommandIsQuadraticBezier = true;
				break;
			
			case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
				newX = curX + seg.x;
				newY = curY + seg.y;
				var firstControlX = curX;
				var firstControlY = curY;
				if(lastCommandIsQuadraticBezier) {
					var refl = SVGPathNormalizer.getReflectionPoint(lastControlX, lastControlY, curX, curY);
					firstControlX = refl.x;
					firstControlY = refl.y;
				}
				newSeg = path.createSVGPathSegCurvetoQuadraticAbs(newX, newY, firstControlX, firstControlY);
				lastControlX = firstControlX;
				lastControlY = firstControlY;
				thisCommandIsQuadraticBezier = true;
				break;
				
			default:
				newSeg = seg;
				break;
		}
		newPathSegList.appendItem(newSeg);
		curX = newX;
		curY = newY;
		if(startX === null && startY === null) {
			startX = curX;
			startY = curY;
		}
		
		if(thisCommandIsCubicBezier || thisCommandIsQuadraticBezier) {
			// do nothing
		}
		else {
			// clear last controll point
			lastControlX = null;
			lastControlY = null;
		}
		lastCommandIsCubicBezier = thisCommandIsCubicBezier;
		lastCommandIsQuadraticBezier = thisCommandIsQuadraticBezier;
	}
	
	return newPathSegList;
};

SVGPathNormalizer.getReflectionPoint = function(lastControlX, lastControlY, curX, curY) {
	return {
		x: curX + (curX - lastControlX),
		y: curY + (curY - lastControlY)
	};
};
