import { clsx } from 'clsx'

type Props = {
    children: React.ReactNode
    className?: string
}

export const Row = ({ children, className }: Props) => {
    return <div className={clsx('grid grid-cols-2 gap-8 tablet-min:grid-cols-1', className)}>{children}</div>
}
