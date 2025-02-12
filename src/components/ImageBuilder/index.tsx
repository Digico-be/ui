type Props = {
    src: string
    alt?: string
    className?: string
    loading?: 'lazy' | 'eager' | undefined
}

export const ImageBuilder = ({ alt = 'image', loading = 'lazy', ...props }: Props) => {
    return <img {...props} alt={alt} loading={loading} />
}
