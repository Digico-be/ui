import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const style = cva('w-full text-left', {
    variants: {
        intent: {
            default: ''
        }
    },
    defaultVariants: {
        intent: 'default'
    }
})

const styleHead = cva('', {
    variants: {
        intent: {
            default: 'font-semibold py-5 px-6 text-xxs text-grey-800'
        }
    },
    defaultVariants: {
        intent: 'default'
    }
})

const styleCol = cva('', {
    variants: {
        intent: {
            default: 'bg-white py-4 px-6 text-xs border-t border-t-grey-400 transition-all group-hover:bg-grey-200 group-hover:cursor-pointer'
        }
    },
    defaultVariants: {
        intent: 'default'
    }
})

interface Props {
    children: React.ReactNode
    items: any[]
    intent?: VariantProps<typeof style>['intent']
    className?: string
    onClick?: (item: any, event: React.MouseEvent<HTMLTableRowElement>) => void
}

interface HeadType {
    children?: React.ReactNode
    intent?: VariantProps<typeof styleHead>['intent']
    className?: string
}

interface ColType {
    children?: React.ReactNode | ((item: any, index?: number) => React.ReactNode)
    name?: string
    item?: Record<string, any>
    intent?: VariantProps<typeof styleCol>['intent']
    className?: string
}

const Head = ({ children, intent, className, ...props }: HeadType) => (
    <th {...props} className={clsx(styleHead({ intent }), className)}>
        {children}
    </th>
)

const Col = ({ children, name, item, intent, className, ...props }: ColType) => {
    const content =
        typeof children === 'function' && item ? children(item) : name && item ? name.split('.').reduce((acc, part) => acc && acc[part], item) : children

    return (
        <td {...props} className={clsx(styleCol({ intent }), className)}>
            {content}
        </td>
    )
}

const Table = ({ children, items, intent, className, onClick }: Props) => {
    if (!items || items.length === 0) {
        return (
            <>
                <table className={clsx(style({ intent }), className)}>
                    <thead>
                        <tr>{React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Head)}</tr>
                    </thead>
                </table>
                <p className="text-xs text-center p-4 bg-white text-grey-800 mt-4">Aucun élément dans le tableau !</p>
            </>
        )
    }

    return (
        <table className={clsx(style({ intent }), className)}>
            <thead>
                <tr>{React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Head)}</tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index} onClick={(e) => onClick?.(item, e)} className={onClick ? 'group' : ''}>
                        {React.Children.map(children, (child) => {
                            if (!React.isValidElement(child) || child.type !== Col) {
                                return null
                            }

                            return React.cloneElement(child as React.ReactElement<{ item: any }>, { item: item })
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

Table.Head = Head
Table.Col = Col

export { Table }
