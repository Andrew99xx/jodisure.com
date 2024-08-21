import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import './CustomUpload.css';

const CustomUpload = ({
  initialFileList = [],
  maxFiles = 5,
  actionUrl = 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onFileListChange,
  rotationSlider = true,
}) => {
  const [fileList, setFileList] = useState(initialFileList);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (onFileListChange) {
      onFileListChange(newFileList);
    }
  };

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="upload-container">
      {/* <ImgCrop rotationSlider={rotationSlider}> */}
        <Upload
          // action={actionUrl}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview}
          accept="image/*"  // Only accept image files
          className="horizontal-list"
        >
          {fileList.length < maxFiles && (
            <div className="upload-circle">
              + Upload
            </div>
          )}
        </Upload>
      {/* </ImgCrop> */}
    </div>
  );
};

export default CustomUpload;
