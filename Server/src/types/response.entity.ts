export class MyEmptyResponse  {

    messages: Message[] = []
    
    get isInFail() {
        return this.messages.find(x => x.type && x.type >= MessageType.validation)
    }


}

export class MyResponse<T> extends MyEmptyResponse {
    data: T | undefined = undefined
}
export enum MessageType {
    info,
    success,
    validation,
    error
}

export class Message {
    title?: string
    text?: string
    type?: MessageType


}