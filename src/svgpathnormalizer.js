
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
			newSeg = path.createSVGPathSegClosePath();
			newX = startX;
			newY = startY;
			break;
		case 
		
		// M
		case PATHSEG_MOVETO_ABS:
			newSeg = seg;
			newX = seg.x;
			newY = seg.y;
			break;
		
		// m
		case PATHSEG_MOVETO_REL:
			newX = curX + seg.x;
			newY = curY + seg.y;
			newSeg = path.createSVGPathSegMovetoAbs(newX, newY);
			break;
		
		case PATHSEG_LINETO_ABS:
		case PATHSEG_LINETO_REL:
		case PATHSEG_CURVETO_CUBIC_ABS:
		case PATHSEG_CURVETO_CUBIC_REL:
		case PATHSEG_CURVETO_QUADRATIC_ABS:
		case PATHSEG_CURVETO_QUADRATIC_REL:
		case PATHSEG_ARC_ABS:
		case PATHSEG_ARC_REL:
		case PATHSEG_LINETO_HORIZONTAL_ABS:
		case PATHSEG_LINETO_HORIZONTAL_REL:
		case PATHSEG_LINETO_VERTICAL_ABS:
		case PATHSEG_LINETO_VERTICAL_REL:
		case PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
		case PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
		case PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
		case PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
		default:
	}
	
	return {
		seg: newSeg,
		newX: curX,
		newY: curY
	};
};
