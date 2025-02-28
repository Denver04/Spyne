export type TVideo = {
    url: string,
    caption: string,
    startTime: string,
    endTime: string
}

export type VideoProps = {
    list: TVideo[]
}