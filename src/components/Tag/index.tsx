import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const style = cva('rounded text-center leading-tight font-medium text-grey-800 bg-current/10', {
    variants: {
        size: {
            default: 'px-8 py-3 text-xs',
            xs: 'px-4 py-2 text-xxs'
        }
    },
    defaultVariants: {
        size: 'default'
    }
})

type Props = {
    children: React.ReactNode
    className?: string
    size?: VariantProps<typeof style>['size']
}

export const Tag = ({ children, size, className }: Props) => {
    return <div className={clsx(style({ size }), className)}>{children}</div>
}
