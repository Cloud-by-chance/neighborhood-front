import 'antd/dist/antd.min.css';
import React, { useState } from "react";
import { Form, Button, Input, Upload, Modal, notification } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "../../utils/Base64";
import { axiosInstance } from "../api";
import parseErrorMessages from "../../utils/forms"


import { useHistory } from "react-router-dom";
export default function PostNewForm() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});
  const [fileList, setFileList] = useState([]);
  const handelUploadChange = ({ fileList }) => {
    //파일 리스트를 받고 setFileList에 업데이트 ==>사진 미리보기 기능을 위해 사용
    setFileList(fileList);
  };
  const [previewPhoto, setPreviewPhoto] = useState({
    base64: null,
    visible: false,
  }); //프리뷰를 위한 상태값 base64이미지

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      //preview가 없고 url도 없다면 getBase64FromFile을 통해 가져온다
      file.preview = await getBase64FromFile(file.originFileObj);
    }
    //그렇게 가져온 url과 preview를 setPreviewPhoto에 지정해 준다.
    setPreviewPhoto({ visible: true, base64: file.url || file.preview });
  };

  const handleFinish = async (fieldValues) => {
    //종료시 수행할 함수 ==> subit 버튼을 누를시 실행되는 함수다.
    const {
      caption,
      location,
      photo: { fileList },
    } = fieldValues;
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);

    fileList.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });
    let config = {
      headers :{ "X-AUTH-TOKEN": localStorage.getItem("Access_token")}
      , //헤더를 보내는 방식 기억할 것.
    }; 
    console.log(config)
    axiosInstance.get("/v1/user",config) //get 요청을 보냄 
    .then((response)=>{ console.log(response.data)} )
    .catch((error) => 
        { 
          var path = "/v1/refreshtoken?token="+localStorage.getItem("Refresh_token");
          console.log(path)
          axiosInstance.post(path)
          .then((response) => {console.log("토큰 재발급 "+response.data.data)
                                localStorage.setItem("Access_token",response.data.data)})
          .catch((error) =>{ console.log("재발급 실패")})
      })
    // const headers = {
    //   Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
    // }; //인증 헤더에 JWT 올리기
    // try {
    //   const response = await axiosInstance.post("/api/post/", formData, {
    //     headers,
    //   });
    //   console.log("success response", response);
    //   history.push("/community"); //comunity로 다시 보낸다.
    // } catch (error) {
    //   if (error.response) {
    //     const { status, data: fieldsErrorMessages } = error.response;
    //     if (typeof fieldsErrorMessages === "string") {
    //       notification.open({
    //         message: "업로드 실패",
    //         description: `에러 ${status}를 받았습니다 에러를 확인해 주세요`,
    //         icon: <FrownOutlined style={{ color: "#ff3333" }} />,
    //       });
    //     } else {
    //       setFieldErrors(parseErrorMessages(fieldsErrorMessages));
    //     }
    //   }
    // }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleFinish}
      autoComplete={"false"}
    >
      
      <Form.Item
        label="글 제목"
        name="글 제목"
        rules={[
          //더 다양한 Rule은 antd의 Form에서 제공해주는 docs를 참고해라
          {
            required: true,
            message: "Location을 입력하세요",
          },
        ]}
        hasFeedback
        {...fieldErrors.location}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="내용"
        name="내용"
        rules={[
          //더 다양한 Rule은 antd의 Form에서 제공해주는 docs를 참고해라
          {
            required: true,
            message: "Caption을 입력하세요",
          },
        ]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      {/* 아래는 사진을 넣기 위한 영역 */}
      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 선택해 주세요" }]}
        hasFeedback
        {...fieldErrors.photo}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false; //submit을 누르기 전까지 자동 업로드를 false로 취한다.
          }}
          onChange={handelUploadChange}
          onPreview={handlePreview}
        >
          {/* {fileList.length > 0 ? null : ( */}
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div> 
           {/* )} // 파일이 1개 이상 있으면 업로드 버튼 삭제 인데 일단 비활성화 */}
        </Upload>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      
        <Button type="primary" htmlType="submit"> 
          Submit
        </Button>
      </Form.Item>
          {/* 여기서 htmlType은 Button의 타입을 지정 submit은 서버에 데이터를 제출하는데 사용된다. */}

      <Modal //Modal을 밖에 두는 이유==>preview를 닫으면 클릭 이벤트로 인식해업로드 창이 뜨기 때문이다.
        visible={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })} //vislble을 false로 바꿔줘야 사진 닫기 가능
      >
        <img
          src={previewPhoto.base64}
          style={{ width: "100%" }}
          alt="Preview"
        />
      </Modal>
    </Form>
  );
}