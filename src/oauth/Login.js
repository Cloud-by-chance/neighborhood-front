import React, {useState} from 'react'
import KakaoLogin from 'react-kakao-login'
import styled from 'styled-components'
import KAKAO_KEY from '../oauth/KAKAO_KEY'

const Login = () => {
    const [id, setId] = useState("") 
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [provider, setProvider] = useState('kakao')

    const responseKakao=(res)=>{
        setAccessToken(res.response.access_token)
        const {
            profile: {
                id: id
            },
            response:{
                access_token: accessToken,
                refresh_token: refreshToken
            }
        } = res       

        // 서버에게 token넘겨주기
    }

    const responseFail = (err) => {
        console.log(err)
    }

    return(
        <div>
            <KakaoBtn
                jsKey={KAKAO_KEY}
                onSuccess={responseKakao}
                onFailure={responseFail}
                getProfile="true"
                buttonText="Login with Kakao"
            />
        </div>
    );
}

export default Login;

const KakaoBtn = styled(KakaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }`;