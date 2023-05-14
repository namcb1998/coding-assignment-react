class RequestService {
    protected async sendGet(url: string) {
        const data = await fetch(url).catch((e)=>{
            console.log(e);
        });
        return await this.handleResponse(data);
    }
    protected async sendPost(url: string, body: any) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const data = await fetch(url, requestOptions).catch((e)=>{
            console.log(e);
        });
        return await this.handleResponse(data);
    }

    protected async sendPut(url: string, body: any) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const data = await fetch(url, requestOptions).catch((e)=>{
            console.log(e);
        });
        return await this.handleResponse(data);
    }

    protected async sendDelete(url: string, body: any) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        const data = await fetch(url, requestOptions).catch((e)=>{
            console.log(e);
        });
        return await this.handleResponse(data);
    }

    private async handleResponse(data: any) {
        return new Promise<any>( async (resolve, reject) => {
            if (data.status >= 200 && data.status < 300) {
                if (data.status === 204) {
                    resolve("");
                } else {
                    resolve(await data.json());
                }
            } else {
                reject({statusCode: data.status, message: "Error: " + data.status});
            }
        });

    }
}

export default RequestService;
