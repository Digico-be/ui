import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuProps = {
    children: React.ReactNode
}

type ItemProps = {
    children: React.ReactNode
    href: string
}

const Menu = ({ children }: MenuProps) => {
    return <ul className="w-full flex overflow-x-auto">{children}</ul>
}

const Item = ({ children, href, ...props }: ItemProps) => {
    const pathname = usePathname()

    return (
        <li key={href} {...props} className="flex">
            <Link
                href={href}
                className={`whitespace-nowrap leading-tight text-xs px-8 py-4 transition-all hover:text-primary hover:border-b-primary border-b-2 ${pathname === href ? 'border-main text-main font-semibold' : 'text-grey-800 border-b-grey-400'}`}>
                {children}
            </Link>
        </li>
    )
}

Menu.Item = Item

export { Menu }
