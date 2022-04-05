// MapContainer.js
/* global kakao*/
import { Map } from "react-kakao-maps-sdk";
import { MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useEffect } from "react";

const SearchPlace= ({ searchPlace }) =>{
  const [info, setInfo] = useState()
  const [markers, setMarkers] = useState([])
  const [map, setMap] = useState()
  const locFromSession=JSON.parse(sessionStorage.getItem('Location'))  //세션 스토리지에 저장된 Item을 변수에 저장
  useEffect(() => { 
    if (!map) return
    
   
    const ps = new kakao.maps.services.Places(map)
    console.log(locFromSession) //현재 좌표값 반환
    ps.keywordSearch(searchPlace, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // var sw = new kakao.maps.LatLng(36.861468, 127.776238),
        //     ne = new kakao.maps.LatLng(36.861470, 127.776240)
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    }, {useMapCenter: true})
    
  }, [searchPlace])

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onMouseOver={() => setInfo(marker)}
          onMouseOut ={() => setInfo()}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  )
}
export default SearchPlace;