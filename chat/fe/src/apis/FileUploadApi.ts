type SendFileParams = {
    fileData: FormData;
    room: string;
}


export async function sendFile(params: SendFileParams) {
    console.log('api', params.fileData);
    await fetch(`/api/rooms/${params.room}/files`, {
        method: 'POST',
        body: params.fileData,
    })
}