import clsx from 'clsx'
import Link from 'next/link'

type Props = {
    children: React.ReactNode
    label?: string
    href?: string
    className?: string
}

export const PageHeader = ({ children, className, label, href }: Props) => {
    return (
        <div className={clsx(className, 'flex flex-col items-start')}>
            {href && (
                <Link className="text-xs text-grey-600 transition-all flex items-center gap-4 group hover:text-primary" href={href}>
                    {'← '} {label}
                </Link>
            )}
            <h1 className="leading-tight text-md font-semibold">{children}</h1>
        </div>
    )
}
