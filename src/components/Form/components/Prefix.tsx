type Props = {
    children?: string
}

export const Prefix = ({ children }: Props) => {
    if (!children) {
        return null
    }
    return (
        <div className="flex-shrink-0 h-full min-w-16 px-2 flex items-center justify-center bg-grey-200 text-xs font-medium border border-grey-400 border-r-0 rounded-l">
            {children}
        </div>
    )
}
