//funtion is fiding intersection of two lines
function isLinesIntersect(line1,line2) {
    var
        arr1 = line1, arr2 = line2,
        x1 = arr1[0].x, y1 = arr1[0].y, x2 = arr1[1].x, y2 = arr1[1].y,
        x3 = arr2[0].x, y3 = arr2[0].y, x4 = arr2[1].x, y4 = arr2[1].y,
        //equations direct
        A1 = y1-y2,
        B1 = x2-x1,
        C1 = x1*y2-x2*y1,
        A2 = y3-y4,
        B2 = x4-x3,
        C2 = x3*y4-x4*y3,

        //coordinates of the intersection of two lines:
        y = (-((-C1/A1*A2+C2)/(-B1/A1*A2 + B2))).toFixed(2),
        x = (-B1*y/A1 - C1/A1).toFixed(2);

    //condition whether the point is in these line sigments
    if (((x - x1)/(x2 - x1)).toFixed(2) == ((y - y1)/(y2 - y1)).toFixed(2)
       && ((x - x3)/(x4 - x3)).toFixed(2) == ((y - y3)/(y4 - y3)).toFixed(2)) {
        return true
    } else {
        return false
    }
}
//parallel ray of X-axis. if count%2 == 0 - point in polygon, else - no
function countIntersectionsOfPolygonSides(sideOfPolygon, apexOfPolygon) {
    var
        count = 0,
        side = [],
        arr = sideOfPolygon,
        point = apexOfPolygon,
        line = [point, {x:point.x, y:400}];

    for(var i = 0; i<arr.length;i++){
        if (i< arr.length - 1){
            side = [arr[i], arr[i+1]];
        } else {
            side = [arr[0], arr[arr.length-1]]
        }
        if (isLinesIntersect(side,line)){
            count++;
        }
    }
   return count;
}
