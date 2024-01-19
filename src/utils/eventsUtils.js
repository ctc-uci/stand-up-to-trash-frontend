import Backend from './utils';

const getEvents = async () => {
    // const response = [
    //     {
    //         id: '5',
    //         imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //         description: "this is the event",
    //         name: "test",
    //         location: "local"
    //     },
    //     {
    //         id: '6',
    //         imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //         description: "this is the event",
    //         name: "test",
    //         location: "local"
    //     },
    //     {
    //         id: '7',
    //         imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //         description: "this is the event",
    //         name: "test",
    //         location: "local"
    //     },
    //     {
    //         id: '7',
    //         imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wisegeek.com%2Fgarbage-on-street.jpg&f=1&nofb=1&ipt=30675b4607e50b234522eb5ba4aae99c3a38df060ff9bab3ca5a9a794f97909b&ipo=images",
    //         description: "this is the event",
    //         name: "test",
    //         location: "local"
    //     },
    //     {
    //         id: '7',
    //         imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //         description: "this is the event",
    //         name: "test",
    //         location: "local"
    //     },
    //     {
    //         id: '7',
    //         imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //         description: "this is the event",
    //         name: "test",
    //         location: "local"
    //     }
    // ];
    // return response;
    const response = await Backend.get('/events');
    return response.data;
};



export { getEvents };