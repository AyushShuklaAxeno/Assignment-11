export default function Badge({text,variant}){
    return(
        <>
            <span className={variant} dangerouslySetInnerHTML={{ __html: text }} />

        </>
    )
}