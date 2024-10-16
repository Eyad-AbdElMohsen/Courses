class ApiError extends Error {
    status: number
    data?: object
    constructor(message: string, status: number, data?: object){
        super(message)
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

export default ApiError