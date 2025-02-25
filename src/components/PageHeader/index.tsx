import Link from 'next/link'

type Props = {
    children: React.ReactNode
    label?: string
    href?: string
}

export const PageHeader = ({ children, label, href }: Props) => {
    return (
        <div>
            {href && (
                <Link className="text-xs text-grey-600 transition-all flex items-center gap-4 group hover:text-primary" href={href}>
                    <span className="bg-main rounded-full flex items-center justify-center size-9 text-xs text-white group-hover:bg-primary transition-all">
                        ←
                    </span>{' '}
                    {label}
                </Link>
            )}
            <h1 className="leading-tight text-xl font-semibold">{children}</h1>
        </div>
    )
}
