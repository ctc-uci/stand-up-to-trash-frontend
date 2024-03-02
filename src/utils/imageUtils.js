import Backend from './utils';

export const postImage = async (name, s3_url) => {
    const response = await Backend.post('/data/image/', {
        s3_url: s3_url,
        name: name
    });
    console.log("name", name)

    return response.data;
  };

export const getImageID = async (s3_url) => {
    const response = await Backend.get(`/data/image/url/${encodeURIComponent(s3_url)}`);
    return response.data.rows[0];
};

export const putListImageByID = async (id, eventImageKey) => {
    const response = await Backend.put(`/data/image/list/${id}/${eventImageKey}`);
    return response.data;
    };

export const deleteImageByID = async (id) => {
    const response = await Backend.delete(`/data/image/${id}`);
    return response.data;
    };

export const deleteListImageByID = async (id, eventImageKey) => {
    const response = await Backend.delete(`/data/image/list/${id}/${eventImageKey}`);
    return response.data;
    };

export const getImagesByEventID = async (id) => {
    const response = await Backend.get(`/data/image/${id}`);
    console.log(`OMG! ${JSON.stringify(response.data)}`)
    return response.data;
    };

