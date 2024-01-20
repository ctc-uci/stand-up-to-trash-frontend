import React, { useEffect, useMemo, useState } from 'react';

import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    noKeyboard: true,
    accept: { 'image/jpeg': ['jpeg', 'jpg'], 'image/png': ['.png']},
    maxFiles: 1,
  });

  // const [uploaded, setUploaded] = useState(false);

  // useEffect(() => {
  //   if (acceptedFiles.length > 0) {
  //     setUploaded(true);
  //   }
  // }, [acceptedFiles]);

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
      </aside>
    </section>
  );
};

export default Dropzone;
