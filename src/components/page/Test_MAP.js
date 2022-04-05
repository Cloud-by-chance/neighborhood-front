/* global kakao*/
import { Form, Button, Space, Input } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import MapContainer from "pages/MapContainer";
import SearchPlace from "pages/SearchPlace";

const Test_MAP = () => {
    const [select,setSelect]=useState(""); //버튼
    const [place, setPlace] = useState(""); // 지정 장소 선택
    const [locPosition, setLocPosition] = useState("");
    const [map, setMap] = useState()
    const { Search } = Input;

    const clickHandler = (name) =>{
        setPlace(name)
    }
    const onSearch = value => {
        setPlace(value)
    }
    const setLocal = local => {
        setLocPosition(local);
    }

    /*
    function checkGeo() { 
        if (!map) return
        // 현재 위치 가져오기
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        var lat, lon;
        
        if (navigator.geolocation) {      
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                lat = position.coords.latitude; // 위도
                lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다;    
        
                console.log("현재 위치는 ", lat,", ", lon, " 입니다.");
                console.log(locPosition);
        
                setLocPosition(locPosition);
            });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            console.log("위치를 사용할 수 없습니다.");
        }
    }
    */

    useLayoutEffect(() => {
        // 현재 위치 가져오기
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        var lat, lon;
        
        if (navigator.geolocation) {      
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                lat = position.coords.latitude; // 위도
                lon = position.coords.longitude; // 경도

                console.log(locPosition)
                setLocPosition("1234")
                console.log(locPosition)
                setLocPosition(new kakao.maps.LatLng(lat, lon)) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다;    
                console.log(locPosition)
                
                console.log("현재 위치는 ", lat,", ", lon, " 입니다.");
                // setMap(map.setCenter(locPosition));
            });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            console.log("위치를 사용할 수 없습니다.");
        }
        // console.log(locPosition);
    }, [])

    return(
        <>
        
        <Form>
            <Space size={5}>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <Button type="primary" onClick={() => {clickHandler("화장실")}} >화장실</Button>
            
            <Button type="primary" onClick={() => {clickHandler("편의점")}}>편의점</Button>
            
            <Button type="primary" onClick={() => {clickHandler("세차장")}} >세차장</Button>
            
            <Button type="primary" onClick={() => {clickHandler("음식점")}} >음식점</Button>
            
            <Button type="primary" onClick={() => {clickHandler("지하철")}} >지하철</Button>
            </Space>
            
            {/* <MapContainer searchPlace={place} />  */}
            <SearchPlace searchPlace={place, locPosition} />
        </ Form>
        
        
        </>
    );
}

export default Test_MAP