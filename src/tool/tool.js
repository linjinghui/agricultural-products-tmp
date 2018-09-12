/**
 * 根据区域code返回区域级别
 * @param {}} pms 
 * @param {*} reutrn 0: 乡镇 1: 区县 2: 市 3：省
 */
export function getZoomLevel (zoomCode) {
  if (zoomCode) {
    if (zoomCode.length > 6) {
      zoomCode = 0;
    } else if (zoomCode.substr(zoomCode.length - 4, zoomCode.length) === '0000') {
      zoomCode = 3;
    } else if (zoomCode.substr(zoomCode.length - 2, zoomCode.length) === '00') {
      zoomCode = 2;
    } else {
      zoomCode = 1;
    }
  }  
  return zoomCode;
}