import { clsx } from 'clsx'

type Props = {
    children: React.ReactNode
    className?: string
    title?: string
}

export const Group = ({ children, className, title }: Props) => {
    return (
        <div className={clsx('flex flex-col gap-8', className)}>
            {title && <p className="font-semibold">{title}</p>}

            <div className={`flex flex-col gap-y-8`}>{children}</div>
        </div>
    )
}
