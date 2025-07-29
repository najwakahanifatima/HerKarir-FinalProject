export default function VideoPlayer({link, title} : {link: string, title: string}) {
    return (
        <div className="w-full aspect-video">
            <iframe
                className="w-full h-full rounded-lg"
                src={link}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            >
            </iframe>
        </div>
    )
}