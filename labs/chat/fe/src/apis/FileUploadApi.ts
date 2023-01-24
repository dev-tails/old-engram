type SendFileParams = {
    fileData: FormData;
    room: string;
}


export async function sendFile(params: SendFileParams) {
    await fetch(`/api/rooms/${params.room}/messages/file`, {
        method: 'POST',
        body: params.fileData,
    })
}