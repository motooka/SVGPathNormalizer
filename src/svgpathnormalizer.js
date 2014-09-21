
var SVGPathNormalizer = {};

SVGPathNormalizer.normalize = function(pathSegList) {
	var newPathSegList = 
};



SVGPathNormalizer.normalizeSingleSeg = function(seg, curX, curY, startX, startY) {
	/*
		This method returns an array which looks like...
		{
			seg: (an instance of SVGPathSeg http://www.w3.org/TR/SVG/paths.html#InterfaceSVGPathSeg),
			newX: (decimal),
			newY: (decimal)
		}
		
		The argument startX and startY can be omitted.
		These arguments will be used if seg is an instance of SVGPathSegClosePath
	*/
	var newSeg = null;
	var newX = 0;
	var newY = 0;
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	
	switch(seg.pathSegType) {
		// z
		case PATHSEG_CLOSEPATH:
			newX = startX;
			newY = startY;
			newSeg = path.createSVGPathSegClosePath();
			break;
		case 
		
		// M
		case PATHSEG_MOVETO_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		// m
		case PATHSEG_MOVETO_REL:
			newX = curX + seg.x;
			newY = curY + seg.y;
			newSeg = path.createSVGPathSegMovetoAbs(newX, newY);
			break;
		
		case PATHSEG_LINETO_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_LINETO_REL:
			newX = curX + seg.x;
			newY = curY + seg.y;
			newSeg = path.createSVGPathSegLinetoAbs(newX, newY);
			break;
		
		case PATHSEG_CURVETO_CUBIC_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_CURVETO_CUBIC_REL:
			newX = curX + seg.x;
			newY = curY + seg.y;
			newSeg = path.createSVGPathSegCurvetoCubicAbs(newX, newY, (curX + seg.x1), (curY + seg.y1), (curX + seg.x2), (curY + seg.y2));
			break;
		
		case PATHSEG_CURVETO_QUADRATIC_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_CURVETO_QUADRATIC_REL:
			newX = curX + seg.x;
			newY = curY + seg.y;
			newSeg = path.createSVGPathSegCurvetoQuadraticAbs(newX, newY, (curX + seg.x1), (curY + seg.y1));
			break;
		
		case PATHSEG_ARC_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_ARC_REL:
			newX = curX + seg.x;
			newY = curY + seg.y;
			newSeg = path.createSVGPathSegArcAbs(newX, newY, seg.r1, seg.r2, seg.angle, seg.largeArgFlag, seg.sweepFlag);
			break;
		
		case PATHSEG_LINETO_HORIZONTAL_ABS:
			newX = seg.x;
			newY = curY;
			newSeg = seg;
			break;
		
		case PATHSEG_LINETO_HORIZONTAL_REL:
			newX = curX + seg.x;
			newY = curY;
			newSeg = path.createSVGPathSegLinetoHorizontalAbs(newX);
			break;
		
		case PATHSEG_LINETO_VERTICAL_ABS:
			newX = curX;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_LINETO_VERTICAL_REL:
		
		case PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
		case PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
			newX = seg.x;
			newY = seg.y;
			newSeg = seg;
			break;
		
		case PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
		default:
	}
	
	return {
		seg: newSeg,
		newX: curX,
		newY: curY
	};
};
