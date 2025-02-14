import { cva, VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const styles = cva('font-medium text-xs', {
    variants: {
        required: {
            false: '',
            true: "after:content-['*'] after:text-error after:ml-1"
        }
    },
    defaultVariants: {
        required: false
    }
})

export type LabelType = {
    children: React.ReactNode
    className?: string
    htmlFor?: string

    required?: boolean
}

export const Label = ({ children, className, required, ...props }: LabelType) => {
    if (!children) return null

    return (
        <label className={clsx(styles({ required }), className)} aria-required={required} {...props}>
            {children}
        </label>
    )
}
