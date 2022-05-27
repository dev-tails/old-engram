type SendFileParams = {
    fileData: FormData;
    // room: string;
    // file;
}


export async function sendFile(params: SendFileParams) {
    console.log('api', params.fileData);
    await fetch(`/api/files`, {
        method: 'POST',
        body: params.fileData,
    })
}