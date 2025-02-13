import { cva, VariantProps } from 'class-variance-authority'

const styles = cva('rounded', {
    variants: {
        intent: {
            info: 'bg-white border border-grey-400',
            success: 'bg-success-200',
            warking: 'bg-warning-200',
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
    intent: Variants['intent']
    size: Variants['size']
}

export const Box = ({ children, className = '', intent = 'info', size = 'default', ...props }: Props) => {
    return (
        <div className={styles({ intent, size, className })} {...props}>
            {children}
        </div>
    )
}
