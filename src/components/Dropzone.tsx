/* eslint-disable camelcase */
import axios from 'axios';
import React, { useMemo } from 'react';
import Backend from '../utils/utils';
import { useDropzone } from 'react-dropzone';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { AttachmentIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FileUploadIcon } from './Icons/EventsModalIcons';
import { useEffect } from 'react';

// import {FileUploadIcon} from "./Icons/EventsModalIcons.jsx"

const Dropzone = ({ setData, data, setIsLoading }) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    noKeyboard: true,
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
    maxFiles: 1,
  });

  // const [uploaded, setUploaded] = useState(false);

  // useEffect(() => {
  //   if (acceptedFiles.length > 0) {
  //     setUploaded(true);
  //   }
  // }, [acceptedFiles]);

  const uploadImage = async (file: File) => {
    setIsLoading(true);

    // get S3 upload url from server
    const { data: uploadUrl } = await Backend.get('/s3Upload');

    // upload image directly to S3 bucket
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageUrl = uploadUrl.split('?')[0];
    setData({ ...data, imageUrl: imageUrl });
    setIsLoading(false);

    return imageUrl;
  };

  const dropzoneBox = useMemo(() => {
    let base = 'dropzone-zone';
    base += isDragAccept ? ' dropzone-accept' : '';
    base += isDragReject ? ' dropzone-reject' : '';
    return base;
  }, [isDragReject, isDragAccept]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      uploadImage(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Flex className="container">
      <Flex
        flexDir={'column'}
        className={dropzoneBox}
        {...getRootProps()}
        backgroundColor="#D9D9D9"
        minW={'37vw'}
        height={'30vh'}
        justify={'center'}
        align={'center'}
        borderRadius={'30px'}
        backgroundImage={data?.imageUrl}
      >
        <input {...getInputProps()} />
        <IconButton
          icon={<FileUploadIcon height={'37px'} width={'37px'} />}
          bgColor={'gray'}
          height={'62px'}
          width={'62px'}
          borderRadius={100}
          size={'lg'}
          aria-label={''}
          opacity={0.9}
        />
        <Text>Drag and drop an image</Text>
      </Flex>

      {/* <aside>
        <h4>Files</h4>
        {acceptedFiles.map((file, index) => (
          <li key={file.name + index}>
            {file.name} - {file.size} bytes
          </li>
        ))} */}

      {/* <button
          onClick={() => {
            uploadImage(acceptedFiles[0]);
          }}
          disabled={!acceptedFiles}
          style={{
            background: 'blue',
            color: 'white',
            padding: '4px',
            borderRadius: '5px',
            margin: '4px',
          }}
        >
          UPLOAD BUTTON
        </button> */}
      {/* </aside> */}
    </Flex>
  );
};

export default Dropzone;
