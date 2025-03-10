import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const styles = cva('rounded', {
    variants: {
        intent: {
            info: 'bg-white border border-grey-400',
            success: 'bg-success-200',
            warning: 'bg-warning-200',
            error: 'bg-error-200'
        },
        size: {
            sm: 'p-8',
            default: 'p-12',
            xl: 'p-24'
        }
    },
    defaultVariants: {
        intent: 'info',
        size: 'default'
    }
})

type Variants = VariantProps<typeof styles>

type Props = {
    children: React.ReactNode
    className?: string
    intent?: Variants['intent']
    size?: Variants['size']
    title?: string
}

export const Box = ({ children, className, intent, size, title, ...props }: Props) => {
    return (
        <div className={clsx(styles({ intent, size }), className)} {...props}>
            {title && <span className="text-md font-bold mb-8 block">{title}</span>}
            {children}
        </div>
    )
}
