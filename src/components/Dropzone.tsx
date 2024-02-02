import axios from 'axios';
import React, { useMemo } from 'react';
import Backend from '../utils/utils';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
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
    // get S3 upload url from server
    const { data: uploadUrl } = await Backend.get('/s3Upload');

    // upload image directly to S3 bucket
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageUrl = uploadUrl.split('?')[0];
    console.log(imageUrl);

    return imageUrl;
  };

  const dropzoneBox = useMemo(() => {
    let base = 'dropzone-zone';
    base += isDragAccept ? ' dropzone-accept' : '';
    base += isDragReject ? ' dropzone-reject' : '';
    return base;
  }, [isDragReject, isDragAccept]);

  console.log(acceptedFiles);

  return (
    <section className="container">
      <div className={dropzoneBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <aside>
        <h4>Files</h4>
        {acceptedFiles.map((file, index) => (
          <li key={file.name + index}>
            {file.name} - {file.size} bytes
          </li>
        ))}

        <button
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
        </button>
      </aside>
    </section>
  );
};

export default Dropzone;
